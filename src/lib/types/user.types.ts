import type { Role } from "@prisma/client";

export interface UserSummary {
  id: string;
  name: string;
  image: string | null;
  role: Role;
}

export interface UserProfile extends UserSummary {
  email: string;
  phone: string | null;
  bio: string | null;
  createdAt: Date;
  lastLoginAt: Date | null;
}
