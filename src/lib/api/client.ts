export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(endpoint, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "حصل مشكلة" }));
    throw new ApiError(res.status, data.error || "حصل مشكلة");
  }

  return res.json();
}

export function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  return apiClient<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function apiPut<T>(endpoint: string, body: unknown): Promise<T> {
  return apiClient<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function apiDelete<T>(endpoint: string): Promise<T> {
  return apiClient<T>(endpoint, { method: "DELETE" });
}
