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

// الهيدرز المطلوبة مع كل request لـ Bunny TUS
interface TusAuthHeaders {
  AuthorizationSignature: string;
  AuthorizationExpire: string;
  VideoId: string;
  LibraryId: string;
}

/**
 * تحويل نص لـ Base64 بشكل آمن — بيشتغل مع العربي واليونيكود
 * المتصفح الـ btoa بتاعه بيقع لو النص فيه حروف مش Latin1
 */
function safeBase64(str: string): string {
  try {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch {
    return btoa("video");
  }
}

export async function uploadVideoViaTus(
  creds: TusUploadCredentials,
  file: File,
  onProgress?: (percent: number) => void,
): Promise<void> {
  // هيدرز التوقيع — لازم تتبعت مع كل request (POST + PATCH + HEAD)
  const authHeaders: TusAuthHeaders = {
    AuthorizationSignature: creds.signature,
    AuthorizationExpire: String(creds.expirationTime),
    VideoId: creds.videoId,
    LibraryId: creds.libraryId,
  };

  // (1) إنشاء جلسة الرفع
  const metadata = `filetype ${safeBase64(file.type || "video/mp4")},title ${safeBase64(file.name || "video")}`;
  const createRes = await fetch(creds.endpoint, {
    method: "POST",
    headers: {
      "Tus-Resumable": "1.0.0",
      "Upload-Length": String(file.size),
      "Upload-Metadata": metadata,
      ...authHeaders,
    },
  });

  console.log(`[TUS] POST → ${createRes.status}`);

  if (createRes.status !== 201) {
    const text = await createRes.text().catch(() => "");
    throw new Error(`فشل إنشاء جلسة الرفع (${createRes.status}): ${text}`);
  }

  const rawLocation = createRes.headers.get("Location");
  if (!rawLocation) {
    throw new Error("الخادم لم يُرجع رابط الرفع (Location)");
  }

  // مهم جداً: Bunny بيرجّع الـ Location كـ relative path (مثلاً /tusupload/xxx)
  // الـ XHR في المتصفح بيفسّره relative لـ الصفحة الحالية — وده غلط!
  // لازم نحوّله لـ absolute URL على Bunny
  const location = rawLocation.startsWith("http")
    ? rawLocation
    : `https://video.bunnycdn.com${rawLocation}`;
  console.log(`[TUS] Upload URL: ${location}`);

  // (2) رفع الملف بنظام chunks مع دعم الاستئناف
  let offset = 0;
  const totalSize = file.size;

  while (offset < totalSize) {
    const chunkEnd = Math.min(offset + CHUNK_SIZE, totalSize);
    const chunk = file.slice(offset, chunkEnd);

    offset = await uploadChunkWithRetry(location, authHeaders, chunk, offset, totalSize, onProgress);
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
  authHeaders: TusAuthHeaders,
  chunk: Blob,
  offset: number,
  totalSize: number,
  onProgress?: (percent: number) => void,
): Promise<number> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const actualOffset = await getServerOffset(location, authHeaders);
        if (actualOffset !== null && actualOffset !== offset) {
          offset = actualOffset;
          return offset; // نرجع للـ loop الخارجي يعيد القص
        }
        await sleep(RETRY_BASE_DELAY * Math.pow(2, attempt - 1));
      }

      const newOffset = await uploadSingleChunk(location, authHeaders, chunk, offset, totalSize, onProgress);
      return newOffset;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`[Upload] Chunk failed (attempt ${attempt + 1}/${MAX_RETRIES}):`, lastError.message);
    }
  }

  throw new Error(`فشل رفع جزء من الفيديو بعد ${MAX_RETRIES} محاولات: ${lastError?.message}`);
}

/**
 * رفع chunk واحد فعلاً — بيبعت الـ data + هيدرز التوقيع
 */
function uploadSingleChunk(
  location: string,
  authHeaders: TusAuthHeaders,
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
    // هيدرز التوقيع — بدونها Bunny بيرفض الـ PATCH (400)
    xhr.setRequestHeader("AuthorizationSignature", authHeaders.AuthorizationSignature);
    xhr.setRequestHeader("AuthorizationExpire", authHeaders.AuthorizationExpire);
    xhr.setRequestHeader("VideoId", authHeaders.VideoId);
    xhr.setRequestHeader("LibraryId", authHeaders.LibraryId);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const chunkProgress = e.loaded;
        const totalProgress = ((offset + chunkProgress) / totalSize) * 100;
        onProgress(Math.min(Math.round(totalProgress), 99));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
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
async function getServerOffset(location: string, authHeaders: TusAuthHeaders): Promise<number | null> {
  try {
    const res = await fetch(location, {
      method: "HEAD",
      headers: {
        "Tus-Resumable": "1.0.0",
        ...authHeaders,
      },
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

const VERIFY_POLL_INTERVAL = 3000;
const VERIFY_MAX_ATTEMPTS = 20;

async function verifyUploadComplete(videoId: string): Promise<void> {
  for (let attempt = 0; attempt < VERIFY_MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`/api/admin/videos/${videoId}`);
      if (!res.ok) {
        console.warn(`[Upload] فشل التحقق من حالة الفيديو (${res.status})`);
        await sleep(VERIFY_POLL_INTERVAL);
        continue;
      }

      const video = await res.json();
      const status = video.status ?? video.Status ?? -1;

      console.log(`[Upload] حالة الفيديو: ${status} (محاولة ${attempt + 1}/${VERIFY_MAX_ATTEMPTS})`);

      if (status >= 1 && status <= 4) {
        return;
      }

      if (status === 5) {
        throw new Error("Bunny رفض الفيديو — في خطأ في المعالجة");
      }
      if (status === 6) {
        throw new Error("Bunny قال إن الرفع فشل — الملف ممكن يكون تالف أو مش مدعوم");
      }
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("Bunny")) {
        throw err;
      }
      console.warn(`[Upload] خطأ أثناء التحقق:`, err);
    }

    await sleep(VERIFY_POLL_INTERVAL);
  }

  throw new Error("الفيديو لم يُتأكد استلامه من Bunny بعد وقت الانتظار — جرّب ترفع تاني");
}
