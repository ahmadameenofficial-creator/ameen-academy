// ============ رفع فيديو للـ Bunny عبر بروتوكول TUS (من المتصفح مباشرة) ============
// المفتاح (API key) مبيوصلش للمتصفح أبداً — بنستخدم توقيع SHA256 مؤقت بييجي من السيرفر.
// الخطوات: (1) POST لإنشاء جلسة الرفع وأخذ رابط Location، (2) PATCH لرفع الملف مع تتبّع التقدّم.

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
  // (1) إنشاء جلسة الرفع — هيدرز التوقيع + مواصفات TUS
  const metadata = `filetype ${btoa(file.type || "video/mp4")}`;
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

  if (createRes.status !== 201) {
    throw new Error(`فشل إنشاء جلسة الرفع (${createRes.status})`);
  }

  const location = createRes.headers.get("Location");
  if (!location) {
    throw new Error("الخادم لم يُرجع رابط الرفع (Location)");
  }

  // (2) رفع الملف نفسه مع تتبّع التقدّم عبر XHR
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", location);
    xhr.setRequestHeader("Tus-Resumable", "1.0.0");
    xhr.setRequestHeader("Upload-Offset", "0");
    xhr.setRequestHeader("Content-Type", "application/offset+octet-stream");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`فشل رفع الفيديو (${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("فشل الاتصال أثناء الرفع"));
    xhr.send(file);
  });
}
