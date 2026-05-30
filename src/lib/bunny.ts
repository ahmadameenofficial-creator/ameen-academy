import crypto from "crypto";

// ============ الإعدادات ============

const LIBRARY_ID = process.env.BUNNY_STREAM_LIBRARY_ID!;
const API_KEY = process.env.BUNNY_STREAM_API_KEY!;
const CDN_HOSTNAME = process.env.BUNNY_STREAM_CDN_HOSTNAME!;
const TOKEN_KEY = process.env.BUNNY_STREAM_TOKEN_KEY!;

const BUNNY_API_BASE = `https://video.bunnycdn.com/library/${LIBRARY_ID}`;

// ============ Helper: API call ============

async function bunnyFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BUNNY_API_BASE}${path}`, {
    ...options,
    headers: {
      AccessKey: API_KEY,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bunny API Error (${res.status}): ${text}`);
  }

  return res.json();
}

// ============ إنشاء فيديو جديد (الخطوة الأولى قبل الرفع) ============

export async function createVideo(title: string) {
  return bunnyFetch("/videos", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

// ============ رفع فيديو (بعد إنشائه) ============

export async function uploadVideo(videoId: string, fileBuffer: ArrayBuffer) {
  const res = await fetch(`${BUNNY_API_BASE}/videos/${videoId}`, {
    method: "PUT",
    headers: {
      AccessKey: API_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: fileBuffer,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bunny Upload Error (${res.status}): ${text}`);
  }

  return res.json();
}

// ============ جلب بيانات فيديو ============

export async function getVideo(videoId: string) {
  return bunnyFetch(`/videos/${videoId}`);
}

// ============ حذف فيديو ============

export async function deleteVideo(videoId: string) {
  return bunnyFetch(`/videos/${videoId}`, { method: "DELETE" });
}

// ============ جلب كل الفيديوهات ============

export async function listVideos(page = 1, perPage = 100) {
  return bunnyFetch(`/videos?page=${page}&itemsPerPage=${perPage}`);
}

// ============ بيانات رفع TUS موقّعة — الأدمن يرفع مباشرة للـ Bunny ============
// مهم: الـ API_KEY مبيخرجش للمتصفح أبداً. بنوقّع توقيع SHA256 مؤقت بدلاً منه.
// التوقيع = sha256(libraryId + apiKey + expiration + videoId) — والـ apiKey
// بيفضل على السيرفر بس، اللي بيوصل للمتصفح هو التوقيع الجاهز فقط.

// مهم: الـ expiration بـ 6 ساعات عشان الفيديوهات الكبيرة (1GB+) متعدّيش الميعاد
export function getTusUploadCredentials(videoId: string, expiresInSeconds = 21600) {
  const expirationTime = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const signature = crypto
    .createHash("sha256")
    .update(LIBRARY_ID + API_KEY + expirationTime + videoId)
    .digest("hex");

  return {
    endpoint: "https://video.bunnycdn.com/tusupload",
    videoId,
    libraryId: LIBRARY_ID,
    signature,
    expirationTime,
  };
}

export type TusUploadCredentials = ReturnType<typeof getTusUploadCredentials>;

// ============ Signed URL — رابط محمي بتوقيع ووقت محدد ============

export function getSignedVideoUrl(
  videoId: string,
  options?: {
    expiresInSeconds?: number;
    watermarkText?: string;
  }
) {
  const expiresIn = options?.expiresInSeconds || 7200; // ساعتين افتراضي
  const expires = Math.floor(Date.now() / 1000) + expiresIn;

  // رابط الفيديو الأساسي
  const baseUrl = `https://${CDN_HOSTNAME}/${videoId}/playlist.m3u8`;

  // توليد التوقيع
  const hashableBase = TOKEN_KEY + videoId + String(expires);
  const token = crypto
    .createHash("sha256")
    .update(hashableBase)
    .digest("hex");

  let url = `${baseUrl}?token=${token}&expires=${expires}`;

  return url;
}

// ============ رابط الـ Embed iframe ============

export function getEmbedUrl(videoId: string) {
  return `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}`;
}

// ============ رابط الـ Embed المحمي بتوقيع ============

export function getSignedEmbedUrl(
  videoId: string,
  options?: {
    expiresInSeconds?: number;
    watermarkText?: string;
  }
) {
  const expiresIn = options?.expiresInSeconds || 7200;
  const expires = Math.floor(Date.now() / 1000) + expiresIn;

  const baseUrl = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}`;

  // التوقيع بنفس طريقة Bunny
  const hashableBase = TOKEN_KEY + videoId + String(expires);
  const token = crypto
    .createHash("sha256")
    .update(hashableBase)
    .digest("hex");

  let url = `${baseUrl}?token=${token}&expires=${expires}`;

  // Watermark — اسم الطالب بيظهر على الفيديو (حتى في fullscreen)
  if (options?.watermarkText) {
    url += `&token_hdnea_watermark=${encodeURIComponent(options.watermarkText)}`;
  }

  return url;
}

// ============ Thumbnail ============

export function getThumbnailUrl(videoId: string) {
  return `https://${CDN_HOSTNAME}/${videoId}/thumbnail.jpg`;
}

// ============ حالة الفيديو ============

export type VideoStatus =
  | 0  // Created
  | 1  // Uploaded
  | 2  // Processing
  | 3  // Transcoding
  | 4  // Finished
  | 5  // Error
  | 6; // UploadFailed

export function getStatusLabel(status: number): string {
  const labels: Record<number, string> = {
    0: "تم الإنشاء",
    1: "تم الرفع",
    2: "جاري المعالجة",
    3: "جاري التحويل",
    4: "جاهز",
    5: "خطأ",
    6: "فشل الرفع",
  };
  return labels[status] || "غير معروف";
}
