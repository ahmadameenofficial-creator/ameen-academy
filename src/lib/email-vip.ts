import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.EMAIL_FROM || "Ameen Academy <noreply@ameen.academy>";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ameen.academy";

// أرقام الدفع
const PAYMENT_METHODS = {
  vodafone: "01090912747",
  instapay: "01090912747",
};

// ============ template أساسي للـ VIP (Dark Premium) ============
function vipShell({ title, body }: { title: string; body: string }): string {
  return `
    <div dir="rtl" style="font-family: 'IBM Plex Sans Arabic', -apple-system, Arial, sans-serif; background: #0a0a0a; padding: 40px 20px; min-height: 100vh;">
      <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a0033 0%, #0a0a0a 100%); border-radius: 24px; padding: 48px 32px; border: 1px solid rgba(160,2,255,0.2); box-shadow: 0 20px 60px rgba(160,2,255,0.15);">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #A002FF, #6D01B0); padding: 6px 14px; border-radius: 999px; font-size: 11px; color: white; font-weight: 700; letter-spacing: 2px; margin-bottom: 16px;">VIP COMMUNITY</div>
          <h1 style="background: linear-gradient(135deg, #DBB8FF, #A002FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 32px; margin: 0; font-weight: 900; line-height: 1.2;">${title}</h1>
        </div>
        ${body}
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 32px 0 16px;" />
        <p style="color: rgba(255,255,255,0.3); font-size: 11px; text-align: center; margin: 0;">
          أكاديمية أمين · VIP Inner Circle
        </p>
      </div>
    </div>
  `;
}

// ============ 1) للأدمن — في طلب جديد ============
export async function notifyAdminNewApplication(application: {
  name: string;
  email: string;
  phone: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  const adminEmail = process.env.ADMIN_EMAIL || "amrameen@ameen.academy";

  await resend.emails.send({
    from,
    to: adminEmail,
    subject: `[VIP] طلب جديد من ${application.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial; padding: 20px;">
        <h2>طلب VIP جديد</h2>
        <p><strong>${application.name}</strong></p>
        <p>📧 ${application.email}</p>
        <p>📱 ${application.phone}</p>
        <p><a href="${appUrl}/admin/vip/applications">راجع الطلب من Admin</a></p>
      </div>
    `,
  }).catch((e) => console.error("[VIP Email] فشل إيميل الأدمن:", e));
}

// ============ 2) للمتقدم — تأكيد استلام الطلب ============
export async function sendApplicationReceivedEmail(email: string, name: string) {
  if (!process.env.RESEND_API_KEY) return;

  const body = `
    <p style="color: rgba(255,255,255,0.85); font-size: 17px; line-height: 1.8; margin-bottom: 16px;">
      أهلاً <strong style="color: white;">${name.split(" ")[0]}</strong>،
    </p>
    <p style="color: rgba(255,255,255,0.75); font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
      وصلني طلبك للانضمام للـ VIP Community. هاراجعه شخصياً وهارد عليك خلال <strong style="color: #DBB8FF;">48 ساعة</strong>.
    </p>
    <div style="background: rgba(160,2,255,0.1); border: 1px solid rgba(160,2,255,0.3); border-radius: 16px; padding: 20px; margin: 24px 0;">
      <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 8px; font-weight: 600;">إيه اللي هيحصل بعد كده:</p>
      <ul style="color: rgba(255,255,255,0.7); font-size: 14px; padding-right: 20px; margin: 0;">
        <li style="margin-bottom: 6px;">هاراجع إجاباتك بدقة</li>
        <li style="margin-bottom: 6px;">لو الـ VIP مناسب ليك دلوقتي، هابعتلك لينك الدفع</li>
        <li>لو لا، هابعتلك ملاحظات وخطوات تالية</li>
      </ul>
    </div>
    <p style="color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.7; margin-top: 24px;">
      ما تردش على الإيميل ده — لو محتاج تتواصل، كلمني على الواتساب.
    </p>
  `;

  await resend.emails.send({
    from,
    to: email,
    subject: "وصلني طلبك للـ VIP — أكاديمية أمين",
    html: vipShell({ title: "طلبك وصلني", body }),
  }).catch((e) => console.error("[VIP Email] فشل إيميل التأكيد:", e));
}

// ============ 3) للمتقدم — اتقبل طلبك، ادفع ============
export async function sendApplicationApprovedEmail(
  email: string,
  name: string,
  options?: { adminWhatsapp?: string },
) {
  if (!process.env.RESEND_API_KEY) return;

  const whatsapp = options?.adminWhatsapp || PAYMENT_METHODS.vodafone;

  const body = `
    <p style="color: rgba(255,255,255,0.9); font-size: 18px; line-height: 1.8; margin-bottom: 16px; text-align: center;">
      <strong style="color: white;">مبروك ${name.split(" ")[0]}!</strong>
    </p>
    <p style="color: rgba(255,255,255,0.75); font-size: 16px; line-height: 1.8; margin-bottom: 32px; text-align: center;">
      طلبك اتقبل. مكانك في الـ VIP محجوز لمدة 48 ساعة لحد ما تدفع.
    </p>

    <div style="background: linear-gradient(135deg, rgba(160,2,255,0.15), rgba(109,1,176,0.15)); border: 2px solid #A002FF; border-radius: 20px; padding: 28px; margin: 24px 0;">
      <h3 style="color: white; font-size: 18px; margin: 0 0 20px; text-align: center;">طرق الدفع</h3>

      <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
        <p style="color: #DBB8FF; font-size: 13px; font-weight: 700; margin: 0 0 6px;">شهري — 199 ج <span style="color: rgba(255,255,255,0.3); text-decoration: line-through; font-weight: 400;">349 ج</span></p>
        <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">Early Bird للراوند الأول · يجدد على 349 ج</p>
      </div>

      <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
        <p style="color: #DBB8FF; font-size: 13px; font-weight: 700; margin: 0 0 6px;">ربع سنوي — 499 ج <span style="color: rgba(255,255,255,0.3); text-decoration: line-through; font-weight: 400;">899 ج</span></p>
        <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">توفّر 400 ج عن السعر العادي</p>
      </div>

      <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px;">
        <p style="color: #DBB8FF; font-size: 13px; font-weight: 700; margin: 0 0 6px;">سنوي — 1,799 ج <span style="color: rgba(255,255,255,0.3); text-decoration: line-through; font-weight: 400;">2,999 ج</span> · موصى به</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">توفّر 1,200 ج + Priority Hot Seat + 1-on-1 ربع سنوية</p>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />

      <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 12px; font-weight: 600;">حوّل على واحد من الأرقام دي:</p>
      <p style="color: rgba(255,255,255,0.85); font-size: 14px; margin: 0 0 6px;">
        <strong>فودافون كاش / إنستاباي:</strong> ${PAYMENT_METHODS.vodafone}
      </p>
      <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 12px 0 0;">
        بعد التحويل، ابعتلي screenshot على الواتساب: ${whatsapp}
      </p>
    </div>

    <div style="text-align: center; margin: 32px 0 16px;">
      <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("أهلاً، طلب الـ VIP بتاعي اتقبل وعايز أدفع.")}" style="display: inline-block; background: linear-gradient(135deg, #25D366, #128C7E); color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 15px; font-weight: 700;">
        ابعتلي على الواتساب
      </a>
    </div>

    <p style="color: rgba(255,255,255,0.4); font-size: 12px; text-align: center; line-height: 1.6;">
      مكانك محجوز 48 ساعة. بعد كده هيتفتح للناس اللي ورا على القائمة.
    </p>
  `;

  await resend.emails.send({
    from,
    to: email,
    subject: "طلبك اتقبل — ادفع واحجز مكانك في VIP",
    html: vipShell({ title: "أنت داخل!", body }),
  }).catch((e) => console.error("[VIP Email] فشل إيميل القبول:", e));
}

// ============ 4) للمتقدم — اتمت العضوية ============
export async function sendMembershipActivatedEmail(
  email: string,
  name: string,
  plan: "MONTHLY" | "QUARTERLY" | "ANNUAL",
  expiresAt: Date,
) {
  if (!process.env.RESEND_API_KEY) return;

  const planLabel = plan === "ANNUAL" ? "السنوية" : plan === "QUARTERLY" ? "الربع سنوية" : "الشهرية";

  const body = `
    <p style="color: rgba(255,255,255,0.9); font-size: 18px; line-height: 1.8; margin-bottom: 16px; text-align: center;">
      <strong style="color: white;">عضويتك اتفعّلت ${name.split(" ")[0]}!</strong>
    </p>
    <p style="color: rgba(255,255,255,0.75); font-size: 16px; line-height: 1.8; margin-bottom: 32px; text-align: center;">
      دلوقتي عندك access كامل لكل حاجة في الـ VIP.
    </p>

    <div style="background: rgba(160,2,255,0.1); border: 1px solid rgba(160,2,255,0.3); border-radius: 16px; padding: 20px; margin: 24px 0;">
      <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 4px;">العضوية ${planLabel}</p>
      <p style="color: white; font-size: 16px; font-weight: 700; margin: 0;">تجدد في ${new Intl.DateTimeFormat("ar-EG", { dateStyle: "long" }).format(expiresAt)}</p>
    </div>

    <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; margin: 24px 0;">
      <p style="color: white; font-size: 15px; font-weight: 700; margin: 0 0 16px;">أول حاجة تعملها:</p>
      <ol style="color: rgba(255,255,255,0.8); font-size: 14px; padding-right: 20px; margin: 0; line-height: 2;">
        <li>افتح الـ Dashboard وعرف اللايف الجاي إمتى</li>
        <li>اعمل join على جروب الواتساب + سيرفر Discord</li>
        <li>ابعتلي بورتفوليو/شغلك دلوقتي عشان أعمل أول review</li>
      </ol>
    </div>

    <div style="text-align: center; margin: 32px 0 16px;">
      <a href="${appUrl}/dashboard/vip" style="display: inline-block; background: linear-gradient(135deg, #A002FF, #6D01B0); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 700; box-shadow: 0 8px 24px rgba(160,2,255,0.4);">
        ادخل الـ VIP Dashboard
      </a>
    </div>
  `;

  await resend.emails.send({
    from,
    to: email,
    subject: "أهلاً بيك في الـ VIP Community 🟣",
    html: vipShell({ title: "أنت داخل الـ Inner Circle", body }),
  }).catch((e) => console.error("[VIP Email] فشل إيميل التفعيل:", e));
}

// ============ 5) للمتقدم — اتفض طلبك ============
export async function sendApplicationRejectedEmail(
  email: string,
  name: string,
  reason: string,
) {
  if (!process.env.RESEND_API_KEY) return;

  const body = `
    <p style="color: rgba(255,255,255,0.9); font-size: 17px; line-height: 1.8; margin-bottom: 16px;">
      أهلاً <strong style="color: white;">${name.split(" ")[0]}</strong>،
    </p>
    <p style="color: rgba(255,255,255,0.75); font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
      شكراً إنك قدّمت للـ VIP. للأسف الـ Community ده مش الخطوة الصح ليك في الوقت الحالي.
    </p>

    <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; margin: 24px 0;">
      <p style="color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">السبب</p>
      <p style="color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${reason}</p>
    </div>

    <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
      ده مش معناه إن طريقك انتهى. ده معناه إنك محتاج تبني أساسيات أقوى الأول.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${appUrl}/courses" style="display: inline-block; background: rgba(160,2,255,0.2); color: #DBB8FF; padding: 12px 28px; border-radius: 12px; text-decoration: none; font-size: 14px; font-weight: 600; border: 1px solid rgba(160,2,255,0.3);">
        شوف الكورسات المتاحة
      </a>
    </div>

    <p style="color: rgba(255,255,255,0.4); font-size: 12px; text-align: center;">
      تقدر تقدّم تاني بعد 3-6 شهور.
    </p>
  `;

  await resend.emails.send({
    from,
    to: email,
    subject: "بخصوص طلبك للـ VIP",
    html: vipShell({ title: "شكراً لتطبيقك", body }),
  }).catch((e) => console.error("[VIP Email] فشل إيميل الرفض:", e));
}
