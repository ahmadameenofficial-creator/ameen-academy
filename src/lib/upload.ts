// ============ رفع فيديو للـ Bunny عبر TUS — باستخدام المكتبة الرسمية ============
// tus-js-client هي المكتبة الرسمية لبروتوكول TUS، ومتستخدمة من Bunny نفسها
// في docs بتاعتهم: https://docs.bunny.net/reference/tus-resumable-uploads
//
// المكتبة دي بتتعامل مع:
// - CORS edge cases بشكل صحيح (دي كانت المشكلة الأساسية)
// - تفاوض حجم الـ chunks مع السيرفر
// - retry + resume + exponential backoff
// - استئناف الرفع لو الاتصال اتقطع

import * as tus from "tus-js-client";

export interface TusUploadCredentials {
  endpoint: string;
  videoId: string;
  libraryId: string;
  signature: string;
  expirationTime: number;
}

export async function uploadVideoViaTus(
  creds: TusUploadCredentials,
  file: File,
  onProgress?: (percent: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!file || file.size === 0) {
      reject(new Error("الملف فاضي أو مش صالح"));
      return;
    }

    console.log(`[TUS] بدء رفع: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
    console.log(`[TUS] videoId: ${creds.videoId}`);

    const upload = new tus.Upload(file, {
      endpoint: creds.endpoint,

      // فترات إعادة المحاولة — لو اتصال اتقطع المكتبة هتعيد لوحدها
      retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],

      // هيدرز التوقيع — Bunny بتشيّك عليهم في كل request
      headers: {
        AuthorizationSignature: creds.signature,
        AuthorizationExpire: String(creds.expirationTime),
        VideoId: creds.videoId,
        LibraryId: creds.libraryId,
      },

      // metadata — المكتبة بتعمل base64 encoding لوحدها (بشكل صحيح للعربي)
      metadata: {
        filetype: file.type || "video/mp4",
        title: file.name || "video",
      },

      // حجم الـ chunk — 50MB متوازن بين السرعة وعدد الـ requests
      // مهم: لازم يبقى divisible by 256KB (متطلب Bunny)
      chunkSize: 50 * 1024 * 1024,

      // لو الـ upload فشل، المكتبة بتاخد رابط من السيرفر وبتعيد
      removeFingerprintOnSuccess: true,

      onError(error) {
        console.error("[TUS] فشل الرفع:", error);
        const msg = error instanceof Error ? error.message : String(error);
        reject(new Error(`فشل رفع الفيديو: ${msg}`));
      },

      onProgress(bytesUploaded, bytesTotal) {
        const percent = (bytesUploaded / bytesTotal) * 100;
        console.log(`[TUS] ${bytesUploaded}/${bytesTotal} (${percent.toFixed(1)}%)`);
        // نخصّص آخر 2% للـ verification
        onProgress?.(Math.min(Math.round(percent * 0.97), 97));
      },

      async onSuccess() {
        console.log("[TUS] ✅ كل الـ chunks اترفعت — بنتأكد من Bunny...");
        onProgress?.(98);
        try {
          await verifyUploadComplete(creds.videoId);
          onProgress?.(100);
          console.log("[TUS] ✅ الرفع تم بنجاح!");
          resolve();
        } catch (err) {
          reject(err);
        }
      },

      onShouldRetry(error, retryAttempt, options) {
        const status = (error as { originalResponse?: { getStatus?: () => number } })
          ?.originalResponse?.getStatus?.();
        console.warn(`[TUS] محاولة ${retryAttempt + 1} — status: ${status}`);

        // متعيدش لو 4xx (غير 423/Locked) — دي أخطاء client مش هتتصلح بـ retry
        if (status && status >= 400 && status < 500 && status !== 423) {
          console.error(`[TUS] خطأ client (${status}) — مش هنعيد المحاولة`);
          return false;
        }
        return retryAttempt < (options.retryDelays?.length ?? 0);
      },
    });

    upload.start();
  });
}

// ============ التأكد إن Bunny استلم الفيديو فعلاً ============

const VERIFY_POLL_INTERVAL = 3000;
const VERIFY_MAX_ATTEMPTS = 20;

async function verifyUploadComplete(videoId: string): Promise<void> {
  for (let attempt = 0; attempt < VERIFY_MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`/api/admin/videos/${videoId}`);
      if (!res.ok) {
        console.warn(`[Verify] فشل التحقق (${res.status})`);
        await sleep(VERIFY_POLL_INTERVAL);
        continue;
      }

      const video = await res.json();
      const status = video.status ?? video.Status ?? -1;

      console.log(`[Verify] حالة الفيديو: ${status} (محاولة ${attempt + 1}/${VERIFY_MAX_ATTEMPTS})`);

      // status 1-4 = الفيديو اتستلم وبيتعالج أو خلص
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
      console.warn(`[Verify] خطأ:`, err);
    }

    await sleep(VERIFY_POLL_INTERVAL);
  }

  throw new Error("الفيديو لم يُتأكد استلامه من Bunny — جرّب ترفع تاني");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
