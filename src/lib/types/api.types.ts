export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pages: number;
  page: number;
}

export interface RouteContext<T extends Record<string, string> = Record<string, string>> {
  params: Promise<T>;
}
