import { NextResponse } from "next/server";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { usersDb } from "@/lib/db";
import { changePasswordSchema } from "@/lib/validations/profile";
import { handleApiError, UnauthorizedError, ValidationError } from "@/lib/errors";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) throw new UnauthorizedError();

    const body = await req.json();
    const result = changePasswordSchema.safeParse(body);
    if (!result.success) throw new ValidationError(result.error.errors[0].message);

    const user = await usersDb.findUserById(session.user.id);
    if (!user?.password) throw new ValidationError("مش ممكن تغيّر الباسورد");

    const isValid = await bcrypt.compare(result.data.currentPassword, user.password);
    if (!isValid) throw new ValidationError("الباسورد الحالي غلط");

    const hashedPassword = await bcrypt.hash(result.data.newPassword, 12);
    await usersDb.updateUser(session.user.id, { password: hashedPassword });

    return NextResponse.json({ message: "الباسورد اتغيّر" });
  } catch (error) {
    return handleApiError(error);
  }
}
