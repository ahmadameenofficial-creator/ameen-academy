import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { usersDb } from "@/lib/db";
import { updateProfileSchema } from "@/lib/validations/profile";
import { handleApiError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) throw new UnauthorizedError();

    const body = await req.json();
    const result = updateProfileSchema.safeParse(body);
    if (!result.success) throw new ValidationError(result.error.errors[0].message);

    const { name, phone, bio, image } = result.data;
    await usersDb.updateUser(session.user.id, {
      name,
      phone: phone || null,
      bio: bio || null,
      image: image || null,
    });

    return NextResponse.json({ message: "البيانات اتحدثت" });
  } catch (error) {
    return handleApiError(error);
  }
}
