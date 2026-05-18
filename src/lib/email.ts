import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("[Email] RESEND_API_KEY مش موجود — الإيميلات مش هتتبعت");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.EMAIL_FROM || "Ameen Academy <noreply@ameen.academy>";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function sendPasswordResetEmail(
  email: string,
  name: string,
  token: string
) {
  const resetUrl = `${appUrl}/reset-password?token=${token}`;

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "استعادة كلمة المرور — أكاديمية أمين",
    html: `
      <div dir="rtl" style="font-family: 'IBM Plex Sans Arabic', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #faf9ff;">
        <div style="background: white; border-radius: 16px; padding: 40px 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #A002FF; font-size: 24px; margin: 0;">أكاديمية أمين</h1>
          </div>
          <h2 style="color: #1a1a2e; font-size: 20px; margin-bottom: 16px;">أهلا ${name}</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
            طلبت استعادة كلمة المرور. اضغط على الزرار ده عشان تعمل باسورد جديد:
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #A002FF, #6D01B0); color: white; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">
              استعادة كلمة المرور
            </a>
          </div>
          <p style="color: #888; font-size: 14px; line-height: 1.8;">
            اللينك ده صالح لمدة ساعة واحدة بس. لو مطلبتش استعادة الباسورد، تجاهل الرسالة دي.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #aaa; font-size: 12px; text-align: center;">
            أكاديمية أمين — اتعلم المهارات اللي هتجيبلك فلوس
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[Email] فشل إرسال إيميل استعادة الباسورد:", error);
    throw new Error(error.message);
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "أهلا بيك في أكاديمية أمين! 🎓",
    html: `
      <div dir="rtl" style="font-family: 'IBM Plex Sans Arabic', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #faf9ff;">
        <div style="background: white; border-radius: 16px; padding: 40px 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #A002FF; font-size: 24px; margin: 0;">أكاديمية أمين</h1>
          </div>
          <h2 style="color: #1a1a2e; font-size: 20px; margin-bottom: 16px;">أهلا ${name}!</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.8; margin-bottom: 16px;">
            حسابك اتعمل بنجاح. دلوقتي تقدر تتصفح الكورسات وتبدأ رحلة التعلم.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
            في أكاديمية أمين، بنركز على المهارات العملية اللي فعلا بتجيب فلوس — مش مجرد كلام نظري.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${appUrl}/courses" style="background: linear-gradient(135deg, #A002FF, #6D01B0); color: white; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">
              شوف الكورسات
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #aaa; font-size: 12px; text-align: center;">
            أكاديمية أمين — اتعلم المهارات اللي هتجيبلك فلوس
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[Email] فشل إرسال إيميل الترحيب:", error);
    throw new Error(error.message);
  }
}

export async function sendPaymentConfirmationEmail(
  email: string,
  name: string,
  courseName: string
) {
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: `تم تفعيل كورس "${courseName}" — أكاديمية أمين`,
    html: `
      <div dir="rtl" style="font-family: 'IBM Plex Sans Arabic', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #faf9ff;">
        <div style="background: white; border-radius: 16px; padding: 40px 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #A002FF; font-size: 24px; margin: 0;">أكاديمية أمين</h1>
          </div>
          <h2 style="color: #1a1a2e; font-size: 20px; margin-bottom: 16px;">مبروك ${name}!</h2>
          <div style="background: #f0e6ff; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #6D01B0; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">
              تم تفعيل الكورس بنجاح
            </p>
            <p style="color: #555; font-size: 16px; margin: 0;">
              ${courseName}
            </p>
          </div>
          <p style="color: #555; font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
            تقدر تبدأ تتعلم دلوقتي. ادخل على الداشبورد وابدأ أول درس.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${appUrl}/dashboard" style="background: linear-gradient(135deg, #A002FF, #6D01B0); color: white; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">
              ابدأ التعلم
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #aaa; font-size: 12px; text-align: center;">
            أكاديمية أمين — اتعلم المهارات اللي هتجيبلك فلوس
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[Email] فشل إرسال إيميل تأكيد الدفع:", error);
    throw new Error(error.message);
  }
}
