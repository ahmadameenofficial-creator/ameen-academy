// ============ رفع فيديو للـ Bunny عبر بروتوكول TUS (من المتصفح مباشرة) ============
// المفتاح (API key) مبيوصلش للمتصفح أبداً — بنستخدم توقيع SHA256 مؤقت بييجي من السيرفر.
//
// بيدعم:
// - رفع ملفات كبيرة (حتى 10+ جيجا) عبر chunks
// - استئناف الرفع لو الاتصال اتقطع (TUS resume)
// - تتبّع نسبة التقدّم بدقة

export interface TusUploadCredentials {
  endpoint: string;
  videoId: string;
  libraryId: string;
  signature: string;
  expirationTime: number;
}

// حجم كل chunk: 10 ميجا — متوازن بين السرعة والاستقرار
const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB

// عدد المحاولات لو chunk فشل
const MAX_RETRIES = 5;

// الانتظار بين المحاولات (بالملي ثانية) — بيزيد مع كل محاولة
const RETRY_BASE_DELAY = 2000;

/**
 * تحويل نص لـ Base64 بشكل آمن — بيشتغل مع العربي واليونيكود
 * المتصفح الـ btoa بتاعه بيقع لو النص فيه حروف مش Latin1
 */
function safeBase64(str: string): string {
  try {
    // الطريقة الصح: TextEncoder → bytes → base64
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch {
    // fallback — لو حصل أي مشكلة نرجع اسم بسيط
    return btoa("video");
  }
}

export async function uploadVideoViaTus(
  creds: TusUploadCredentials,
  file: File,
  onProgress?: (percent: number) => void,
): Promise<void> {
  // (1) إنشاء جلسة الرفع — هيدرز التوقيع + مواصفات TUS
  // مهم: btoa بيقع لو اسم الملف فيه حروف عربية — لازم نحوّل لـ UTF-8 base64
  const metadata = `filetype ${safeBase64(file.type || "video/mp4")},title ${safeBase64(file.name || "video")}`;
  const createRes = await fetch(creds.endpoint, {
    method: "POST",
    headers: {
      "Tus-Resumable": "1.0.0",
      "Upload-Length": String(file.size),
      "Upload-Metadata": metadata,
      AuthorizationSignature: creds.signature,
      AuthorizationExpire: String(creds.expirationTime),
      VideoId: creds.videoId,
      LibraryId: creds.libraryId,
    },
  });

  console.log(`[TUS] POST ${creds.endpoint} → status ${createRes.status}`);

  if (createRes.status !== 201) {
    const text = await createRes.text().catch(() => "");
    throw new Error(`فشل إنشاء جلسة الرفع (${createRes.status}): ${text}`);
  }

  const location = createRes.headers.get("Location");
  console.log(`[TUS] Location: ${location}`);
  if (!location) {
    throw new Error("الخادم لم يُرجع رابط الرفع (Location)");
  }

  // (2) رفع الملف بنظام chunks مع دعم الاستئناف
  let offset = 0;
  const totalSize = file.size;

  while (offset < totalSize) {
    const chunkEnd = Math.min(offset + CHUNK_SIZE, totalSize);
    const chunk = file.slice(offset, chunkEnd);

    // محاولة رفع الـ chunk مع retry
    offset = await uploadChunkWithRetry(location, chunk, offset, totalSize, onProgress);
  }

  // تأكيد الانتهاء من الرفع
  onProgress?.(98);

  // (3) تأكيد إن Bunny استلم الفيديو فعلاً — بنسأل السيرفر يشيّك
  await verifyUploadComplete(creds.videoId);

  onProgress?.(100);
}

/**
 * رفع chunk واحد مع إعادة المحاولة والاستئناف
 */
async function uploadChunkWithRetry(
  location: string,
  chunk: Blob,
  offset: number,
  totalSize: number,
  onProgress?: (percent: number) => void,
): Promise<number> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // لو مش أول محاولة — شيّك الـ offset الفعلي من السيرفر (TUS resume)
      if (attempt > 0) {
        const actualOffset = await getServerOffset(location);
        if (actualOffset !== null && actualOffset !== offset) {
          // السيرفر استلم جزء من الـ chunk — نكمّل من عنده
          offset = actualOffset;
          // نعيد قص الـ chunk من الموضع الصح
          const newChunkEnd = Math.min(offset + CHUNK_SIZE, totalSize);
          chunk = new Blob([]); // placeholder — هنقطع من الملف الأصلي
          // مش هنقدر نقطع من file.slice هنا لأن محتاجين الملف الأصلي
          // بس الـ offset هيكون صح والـ loop الخارجي هيعمل slice صح
          return offset; // نرجع للـ loop الخارجي يعيد القص
        }
        // استنى شوية قبل المحاولة
        await sleep(RETRY_BASE_DELAY * Math.pow(2, attempt - 1));
      }

      const newOffset = await uploadSingleChunk(location, chunk, offset, totalSize, onProgress);
      return newOffset;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`[Upload] Chunk failed (attempt ${attempt + 1}/${MAX_RETRIES}):`, lastError.message);
    }
  }

  throw new Error(`فشل رفع جزء من الفيديو بعد ${MAX_RETRIES} محاولات: ${lastError?.message}`);
}

/**
 * رفع chunk واحد فعلاً
 */
function uploadSingleChunk(
  location: string,
  chunk: Blob,
  offset: number,
  totalSize: number,
  onProgress?: (percent: number) => void,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", location);
    xhr.setRequestHeader("Tus-Resumable", "1.0.0");
    xhr.setRequestHeader("Upload-Offset", String(offset));
    xhr.setRequestHeader("Content-Type", "application/offset+octet-stream");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const chunkProgress = e.loaded;
        const totalProgress = ((offset + chunkProgress) / totalSize) * 100;
        onProgress(Math.min(Math.round(totalProgress), 99));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // نقرأ الـ offset الجديد من هيدر الرد
        const serverOffset = xhr.getResponseHeader("Upload-Offset");
        const newOffset = serverOffset ? parseInt(serverOffset, 10) : offset + chunk.size;
        resolve(newOffset);
      } else {
        reject(new Error(`فشل رفع جزء من الفيديو (${xhr.status})`));
      }
    };

    xhr.onerror = () => reject(new Error("فشل الاتصال أثناء الرفع — تحقق من الإنترنت"));
    xhr.ontimeout = () => reject(new Error("انتهى وقت الانتظار — الاتصال بطيء"));
    xhr.timeout = 120000; // دقيقتين لكل chunk

    xhr.send(chunk);
  });
}

/**
 * شيّك الـ offset الفعلي من السيرفر — عشان الاستئناف
 */
async function getServerOffset(location: string): Promise<number | null> {
  try {
    const res = await fetch(location, {
      method: "HEAD",
      headers: { "Tus-Resumable": "1.0.0" },
    });
    if (res.ok) {
      const offsetHeader = res.headers.get("Upload-Offset");
      return offsetHeader ? parseInt(offsetHeader, 10) : null;
    }
    return null;
  } catch {
    return null;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============ التأكد إن Bunny استلم الفيديو فعلاً ============
// بعد ما الـ TUS upload يخلص، بنسأل السيرفر يشيّك مع Bunny:
//   status 0 = Created (لسه مستناه)
//   status 1 = Uploaded ✓
//   status 2 = Processing ✓
//   status 3 = Transcoding ✓
//   status 4 = Finished ✓
//   status 5 = Error ✗
//   status 6 = UploadFailed ✗

const VERIFY_POLL_INTERVAL = 3000; // 3 ثواني بين كل سؤال
const VERIFY_MAX_ATTEMPTS = 20; // 20 محاولة = دقيقة كاملة كحد أقصى

async function verifyUploadComplete(videoId: string): Promise<void> {
  for (let attempt = 0; attempt < VERIFY_MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`/api/admin/videos/${videoId}`);
      if (!res.ok) {
        console.warn(`[Upload] فشل التحقق من حالة الفيديو (${res.status})`);
        // نستنى ونحاول تاني
        await sleep(VERIFY_POLL_INTERVAL);
        continue;
      }

      const video = await res.json();
      const status = video.status ?? video.Status ?? -1;

      console.log(`[Upload] حالة الفيديو: ${status} (محاولة ${attempt + 1}/${VERIFY_MAX_ATTEMPTS})`);

      // حالات النجاح — الفيديو اتقبل
      if (status >= 1 && status <= 4) {
        return; // تمام ✓
      }

      // حالات الفشل — Bunny رفض الفيديو
      if (status === 5) {
        throw new Error("Bunny رفض الفيديو — في خطأ في المعالجة");
      }
      if (status === 6) {
        throw new Error("Bunny قال إن الرفع فشل — الملف ممكن يكون تالف أو مش مدعوم");
      }

      // status === 0 (Created) — لسه بيستنى الملف يوصل
      // نستنى ونسأل تاني
    } catch (err) {
      // لو الخطأ من throw أعلاه — نرميه فوراً
      if (err instanceof Error && err.message.startsWith("Bunny")) {
        throw err;
      }
      console.warn(`[Upload] خطأ أثناء التحقق:`, err);
    }

    await sleep(VERIFY_POLL_INTERVAL);
  }

  // لو وصلنا هنا — الفيديو لسه status 0 بعد دقيقة
  throw new Error("الفيديو لم يُتأكد استلامه من Bunny بعد وقت الانتظار — جرّب ترفع تاني");
}
