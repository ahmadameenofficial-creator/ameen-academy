import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "مش موجود") {
    super(404, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "لازم تسجّل دخول") {
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "مش مسموحلك") {
    super(403, message);
  }
}

export class ValidationError extends AppError {
  constructor(message = "البيانات مش صحيحة") {
    super(400, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "البيانات موجودة بالفعل") {
    super(409, message);
  }
}

export class RateLimitError extends AppError {
  constructor(message = "استنى شوية قبل ما تحاول تاني") {
    super(429, message);
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  }
  console.error("Unexpected error:", error);
  return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
}
