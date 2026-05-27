function qs(params?: Record<string, string | number | undefined>): string {
  if (!params) return "";
  const entries = Object.entries(params).filter(([, v]) => v !== undefined);
  return entries.length ? "?" + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString() : "";
}

export const API = {
  auth: {
    register: "/api/register",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password",
  },
  upload: "/api/upload",
  posts: {
    list: (params?: { courseId?: string; page?: number }) =>
      `/api/posts${qs(params)}`,
    create: "/api/posts",
    update: (postId: string) => `/api/posts/${postId}`,
    delete: (postId: string) => `/api/posts/${postId}`,
    react: (postId: string) => `/api/posts/${postId}/reactions`,
    like: (postId: string) => `/api/posts/${postId}/like`,
    comments: (postId: string) => `/api/posts/${postId}/comments`,
  },
  comments: {
    update: (commentId: string) => `/api/comments/${commentId}`,
    delete: (commentId: string) => `/api/comments/${commentId}`,
  },
  notifications: {
    list: "/api/notifications",
    markRead: "/api/notifications",
  },
  progress: {
    track: "/api/progress",
  },
  enrollments: {
    free: "/api/enrollments/free",
  },
  leads: "/api/leads",
  messages: {
    list: "/api/messages",
    send: "/api/messages",
    unread: "/api/messages/unread",
    conversation: (id: string) => `/api/messages/${id}`,
  },
  profile: {
    update: "/api/profile",
    password: "/api/profile/password",
  },
  courses: {
    detail: (slug: string) => `/api/courses/${slug}`,
  },
  coupons: {
    validate: (params: { code: string; courseId: string }) =>
      `/api/coupons${qs(params)}`,
  },
  payments: {
    create: "/api/payments",
  },
  videos: {
    get: (videoId: string) => `/api/videos/${videoId}`,
  },
  blog: {
    like: (slug: string) => `/api/blog/${slug}/like`,
    comments: (slug: string) => `/api/blog/${slug}/comments`,
  },
  certificates: {
    create: "/api/certificates",
    get: (code: string) => `/api/certificates/${code}`,
  },
  admin: {
    courses: {
      create: "/api/admin/courses",
      update: (id: string) => `/api/admin/courses/${id}`,
      delete: (id: string) => `/api/admin/courses/${id}`,
      modules: (courseId: string) => `/api/admin/courses/${courseId}/modules`,
      module: (courseId: string, moduleId: string) =>
        `/api/admin/courses/${courseId}/modules/${moduleId}`,
      lessons: (courseId: string, moduleId: string) =>
        `/api/admin/courses/${courseId}/modules/${moduleId}/lessons`,
    },
    lessons: {
      update: (lessonId: string) => `/api/admin/lessons/${lessonId}`,
      delete: (lessonId: string) => `/api/admin/lessons/${lessonId}`,
    },
    students: {
      update: (id: string) => `/api/admin/students/${id}`,
      delete: (id: string) => `/api/admin/students/${id}`,
    },
    payments: {
      update: (id: string) => `/api/admin/payments/${id}`,
    },
    commissions: {
      pay: (id: string) => `/api/admin/commissions/${id}`,
    },
    blog: {
      list: "/api/admin/blog",
      create: "/api/admin/blog",
      update: (id: string) => `/api/admin/blog/${id}`,
      delete: (id: string) => `/api/admin/blog/${id}`,
    },
    coupons: {
      list: "/api/admin/coupons",
      create: "/api/admin/coupons",
      delete: "/api/admin/coupons",
    },
    team: {
      list: "/api/admin/team",
      add: "/api/admin/team",
      update: (id: string) => `/api/admin/team/${id}`,
      remove: (id: string) => `/api/admin/team/${id}`,
    },
    videos: {
      list: "/api/admin/videos",
      create: "/api/admin/videos",
      get: (videoId: string) => `/api/admin/videos/${videoId}`,
      upload: (videoId: string) => `/api/admin/videos/${videoId}/upload`,
    },
  },
} as const;
