"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconLoader2,
  IconCheck,
  IconCamera,
  IconCalendar,
  IconBook,
  IconMessage,
  IconLock,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  image: string | null;
  createdAt: Date;
  _count: {
    enrollments: number;
    posts: number;
  };
}

export function ProfileForm({ user }: { user: ProfileUser }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");
  const [bio, setBio] = useState(user.bio || "");
  const [image, setImage] = useState(user.image || "");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // تغيير الباسورد
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      setError("لازم يكون صورة");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("الصورة لازم تكون أقل من 2 ميجا");
      return;
    }

    setUploadingImage(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImage(data.url);
      } else {
        setError("مشكلة في رفع الصورة");
      }
    } catch {
      setError("مشكلة في رفع الصورة");
    }
    setUploadingImage(false);
  }

  async function handleSave() {
    if (!name.trim()) {
      setError("الاسم مطلوب");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), bio: bio.trim(), image }),
      });

      if (res.ok) {
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "حصل مشكلة");
      }
    } catch {
      setError("حصل مشكلة");
    }
    setSaving(false);
  }

  async function handlePasswordChange() {
    if (!currentPassword || !newPassword) {
      setPasswordError("كل الخانات مطلوبة");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("الباسورد الجديد لازم 8 حروف على الأقل");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("الباسورد الجديد مش متطابق");
      return;
    }

    setPasswordSaving(true);
    setPasswordError("");
    setPasswordSuccess(false);

    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        const data = await res.json();
        setPasswordError(data.error || "حصل مشكلة");
      }
    } catch {
      setPasswordError("حصل مشكلة");
    }
    setPasswordSaving(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* القسم الأيسر - الصورة والإحصائيات */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            {/* صورة البروفايل */}
            <div className="relative group">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full object-cover border-4 border-brand-100"
                />
              ) : (
                <div className="h-28 w-28 rounded-full bg-brand-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-brand-100">
                  {name.charAt(0)}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="absolute bottom-0 left-0 h-9 w-9 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg hover:bg-brand-600 transition-colors"
              >
                {uploadingImage ? (
                  <IconLoader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <IconCamera className="h-4 w-4" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <h2 className="mt-4 text-lg font-bold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground" dir="ltr">{user.email}</p>

            {/* إحصائيات */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border w-full justify-center">
              <div className="text-center">
                <div className="flex items-center gap-1 text-brand-500">
                  <IconBook className="h-4 w-4" />
                  <span className="font-bold text-foreground">{user._count.enrollments}</span>
                </div>
                <span className="text-xs text-muted-foreground">كورس</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-brand-500">
                  <IconMessage className="h-4 w-4" />
                  <span className="font-bold text-foreground">{user._count.posts}</span>
                </div>
                <span className="text-xs text-muted-foreground">منشور</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-brand-500">
                  <IconCalendar className="h-4 w-4" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* القسم الأيمن - البيانات */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardContent className="p-6 space-y-5">
            <h3 className="text-lg font-bold text-foreground">البيانات الشخصية</h3>

            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700 text-center flex items-center justify-center gap-2">
                <IconCheck className="h-4 w-4" />
                البيانات اتحفظت بنجاح
              </div>
            )}

            {/* الاسم */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الاسم</label>
              <div className="relative">
                <IconUser className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pr-10"
                  placeholder="اسمك الكامل"
                />
              </div>
            </div>

            {/* الإيميل (للقراءة فقط) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الإيميل</label>
              <div className="relative">
                <IconMail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={user.email}
                  disabled
                  className="pr-10 opacity-60"
                  dir="ltr"
                />
              </div>
              <p className="text-xs text-muted-foreground">الإيميل مش ممكن يتغيّر</p>
            </div>

            {/* رقم الموبايل */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">رقم الموبايل</label>
              <div className="relative">
                <IconPhone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pr-10"
                  dir="ltr"
                  placeholder="01xxxxxxxxx"
                />
              </div>
            </div>

            {/* البايو */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">نبذة عنك</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="اكتب حاجة عن نفسك..."
                rows={3}
                maxLength={500}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-none"
              />
              <p className="text-xs text-muted-foreground text-left" dir="ltr">
                {bio.length}/500
              </p>
            </div>

            <Button onClick={handleSave} disabled={saving} variant="gradient" className="w-full sm:w-auto">
              {saving ? (
                <IconLoader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <IconCheck className="h-4 w-4" />
                  حفظ التعديلات
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* تغيير الباسورد */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">تغيير الباسورد</h3>
              {!showPassword && (
                <Button variant="outline" size="sm" onClick={() => setShowPassword(true)}>
                  <IconLock className="h-4 w-4" />
                  غيّر الباسورد
                </Button>
              )}
            </div>

            {passwordSuccess && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700 text-center flex items-center justify-center gap-2">
                <IconCheck className="h-4 w-4" />
                الباسورد اتغيّر بنجاح
              </div>
            )}

            {showPassword && (
              <>
                {passwordError && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
                    {passwordError}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">الباسورد الحالي</label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="الباسورد الحالي"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">الباسورد الجديد</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="8 حروف على الأقل"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">تأكيد الباسورد الجديد</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="اكتب الباسورد تاني"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={handlePasswordChange} disabled={passwordSaving}>
                    {passwordSaving ? (
                      <IconLoader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "تأكيد"
                    )}
                  </Button>
                  <Button variant="ghost" onClick={() => { setShowPassword(false); setPasswordError(""); }}>
                    إلغاء
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
