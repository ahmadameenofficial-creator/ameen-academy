import {
  IconUser,
  IconBuildingStore,
  IconTargetArrow,
  IconPalette,
  IconWallet,
  IconClock,
  IconBan,
  IconChecklist,
  IconMessage2,
  IconBulb,
  IconTypography,
  IconSparkles,
  IconCheck,
  IconX,
  IconListCheck,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRIEF_TYPE_LABELS, BRIEF_LEVEL_LABELS } from "@/lib/brief/constants";
import type { GeneratedBrief } from "@/lib/brief/engine";

export function BriefDisplay({ brief }: { brief: GeneratedBrief }) {
  const d = brief.details;
  return (
    <Card id="brief-printable" className="overflow-hidden">
      <div className="bg-gradient-to-l from-brand-700 to-brand-500 p-6 text-white">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            {BRIEF_TYPE_LABELS[brief.type]}
          </Badge>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            {BRIEF_LEVEL_LABELS[brief.level]}
          </Badge>
          {brief.source === "AI" && (
            <Badge className="bg-white/20 text-white hover:bg-white/30">AI</Badge>
          )}
        </div>
        <h2 className="text-xl font-bold sm:text-2xl">{brief.title}</h2>
      </div>

      <CardContent className="space-y-6 p-6">
        {/* رسالة العميل */}
        <div className="rounded-xl bg-brand-50 p-4 dark:bg-brand-900/20">
          <div className="mb-2 flex items-center gap-2 text-brand-700 dark:text-brand-300">
            <IconMessage2 size={18} />
            <span className="text-sm font-semibold">رسالة العميل</span>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-foreground/90">
            {brief.scenario}
          </p>
        </div>

        {/* الهدف من التصميم */}
        {d?.goal && (
          <Section icon={<IconTargetArrow size={18} />} title="الهدف من التصميم">
            <p className="text-sm leading-relaxed text-foreground/90">{d.goal}</p>
          </Section>
        )}

        {/* الرسالة الأساسية */}
        {d?.keyMessage && (
          <Section icon={<IconBulb size={18} />} title="الرسالة اللي لازم توصل">
            <p className="text-sm font-medium leading-relaxed text-foreground/90">{d.keyMessage}</p>
          </Section>
        )}

        {/* النصوص الجاهزة (TOV) */}
        {d?.copy && (
          <div className="rounded-xl border-2 border-dashed border-brand-200 bg-brand-50/50 p-4 dark:border-brand-800 dark:bg-brand-900/10">
            <div className="mb-3 flex items-center gap-2 font-semibold text-brand-700 dark:text-brand-300">
              <IconTypography size={18} />
              النصوص اللي تتحط على التصميم (Text on Visuals)
            </div>
            <div className="space-y-2 text-sm">
              <CopyRow label="العنوان الرئيسي" value={d.copy.headline} big />
              <CopyRow label="السطر الداعم" value={d.copy.subline} />
              <CopyRow label="الدعوة للفعل (CTA)" value={d.copy.cta} />
              <CopyRow label="الهاشتاج" value={d.copy.hashtag} />
            </div>
          </div>
        )}

        {/* تفاصيل */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Detail icon={<IconUser size={18} />} label="العميل" value={brief.clientName} />
          <Detail icon={<IconBuildingStore size={18} />} label="النشاط" value={brief.clientBusiness} />
          <Detail icon={<IconTargetArrow size={18} />} label="الجمهور المستهدف" value={brief.audience} />
          <Detail icon={<IconPalette size={18} />} label="نبرة البراند" value={brief.brandTone} />
          <Detail icon={<IconWallet size={18} />} label="الميزانية" value={brief.constraints.budget} />
          <Detail icon={<IconClock size={18} />} label="التسليم خلال" value={brief.constraints.deadline} />
          {brief.constraints.forbiddenColor && (
            <Detail
              icon={<IconBan size={18} />}
              label="ممنوع"
              value={`بلاش ${brief.constraints.forbiddenColor}`}
            />
          )}
        </div>

        {/* الاتجاه البصري */}
        {d?.moodKeywords && d.moodKeywords.length > 0 && (
          <Section icon={<IconSparkles size={18} />} title="الاتجاه البصري (Mood)">
            <div className="flex flex-wrap gap-2">
              {d.moodKeywords.map((m, i) => (
                <Badge key={i} variant="soft">
                  {m}
                </Badge>
              ))}
            </div>
          </Section>
        )}

        {/* عناصر لازم تظهر */}
        {d?.mustInclude && d.mustInclude.length > 0 && (
          <Section icon={<IconListCheck size={18} />} title="عناصر لازم تظهر في التصميم">
            <ul className="space-y-2">
              {d.mustInclude.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <IconCheck size={16} className="mt-0.5 shrink-0 text-brand-500" />
                  <span className="text-foreground/90">{m}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* المطلوب تسليمه */}
        <div>
          <div className="mb-3 flex items-center gap-2 font-semibold text-foreground">
            <IconChecklist size={18} className="text-brand-500" />
            المطلوب تسليمه
          </div>
          <ul className="space-y-2">
            {brief.deliverables.map((d, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm"
              >
                <span className="font-medium">{d.name}</span>
                <span className="shrink-0 text-muted-foreground">
                  {d.format} · {d.size}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* افعل / لا تفعل */}
        {((d?.dos && d.dos.length > 0) || (d?.donts && d.donts.length > 0)) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {d?.dos && d.dos.length > 0 && (
              <div className="rounded-xl border border-green-200 bg-green-50/60 p-4 dark:border-green-900 dark:bg-green-900/10">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
                  <IconCheck size={16} />
                  افعل
                </div>
                <ul className="space-y-1.5">
                  {d.dos.map((item, i) => (
                    <li key={i} className="text-sm leading-snug text-foreground/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {d?.donts && d.donts.length > 0 && (
              <div className="rounded-xl border border-red-200 bg-red-50/60 p-4 dark:border-red-900 dark:bg-red-900/10">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
                  <IconX size={16} />
                  لا تفعل
                </div>
                <ul className="space-y-1.5">
                  {d.donts.map((item, i) => (
                    <li key={i} className="text-sm leading-snug text-foreground/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
        <span className="text-brand-500">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function CopyRow({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="rounded-lg bg-background px-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={big ? "text-base font-bold text-foreground" : "font-medium text-foreground/90"}>
        {value}
      </div>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-brand-500">{icon}</span>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium leading-snug">{value}</div>
      </div>
    </div>
  );
}
