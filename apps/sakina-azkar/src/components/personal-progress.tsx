'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ChartNoAxesColumn } from 'lucide-react';
import { useHistory, clearHistory } from '@/lib/history-store';
import { historyStreak, shiftDay } from '@/lib/reading-history';
import { readingDay, prayers } from '@/lib/progress';
import { getCategory } from '@/lib/catalog';
import { number } from '@/lib/text';
import { useReading } from '@/lib/reading-store';
export function PersonalProgress() {
  const { records, ready } = useHistory();
  const { state } = useReading();
  const today = state.day || readingDay();
  const [confirm, setConfirm] = useState(false);
  const days = Array.from({ length: 7 }, (_, index) => shiftDay(today, index - 6));
  const totalDays = new Set(records.map((row) => row.day)).size;
  return (
    <div className="personal-progress container">
      <span className="eyebrow">على مهل، يومًا بعد يوم</span>
      <h1>متابعتك الأسبوعية</h1>
      <p className="page-description">
        سجل محفوظ على جهازك للأقسام التي أتممت بطاقاتها ذات العدد المحدد.
      </p>
      {!ready ? (
        <p role="status">جارٍ استعادة السجل…</p>
      ) : (
        <>
          <div className="personal-metrics">
            <section>
              <ChartNoAxesColumn size={24} />
              <strong>{number(historyStreak(records, today))}</strong>
              <h2>أيام متتالية</h2>
              <p>تشمل اليوم، أو تنتهي بالأمس إلى أن تكمل يومك.</p>
            </section>
            <section>
              <Check size={24} />
              <strong>{number(totalDays)}</strong>
              <h2>أيام فيها إتمام</h2>
              <p>من السجل المحفوظ خلال آخر سنة.</p>
            </section>
            <section>
              <Check size={24} />
              <strong>{number(records.length)}</strong>
              <h2>أقسام أتممت عدّاداتها</h2>
              <p>كل قسم أو صلاة تُسجّل مرة واحدة في اليوم.</p>
            </section>
          </div>
          <section className="weekly-progress">
            <h2>آخر 7 أيام</h2>
            <div className="week-grid">
              {days.map((day) => {
                const count = records.filter((row) => row.day === day).length;
                return (
                  <div
                    key={day}
                    className={count ? 'week-day has-completions' : 'week-day'}
                    aria-label={day + ': ' + number(count) + ' أقسام مكتملة'}
                  >
                    <span>
                      {new Intl.DateTimeFormat('ar-EG', {
                        weekday: 'short',
                        timeZone: 'UTC',
                      }).format(new Date(day + 'T12:00:00Z'))}
                    </span>
                    <b>{count ? <Check size={23} /> : '—'}</b>
                    <small>{number(count)}</small>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="history-list">
            <h2>آخر ما أتممت</h2>
            {records.length ? (
              <ul>
                {[...records]
                  .reverse()
                  .slice(0, 12)
                  .map((record) => (
                    <li key={record.day + record.categoryId + (record.scope ?? '')}>
                      <Link href={'/azkar/' + record.categoryId}>
                        {getCategory(record.categoryId)?.title ?? 'قسم أذكار'}
                        {record.scope && (
                          <span>
                            {' '}
                            · {prayers.find((prayer) => prayer.id === record.scope)?.title}
                          </span>
                        )}
                      </Link>
                      <time dateTime={record.day}>{record.day}</time>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="personal-empty">
                <p>تبدأ المتابعة عندما تكمل عدّادات قسم ذي أعداد محددة.</p>
                <Link className="button button-primary" href="/azkar/morning">
                  ابدأ بأذكار الصباح
                </Link>
              </div>
            )}
          </section>
          <p className="history-note">
            العدادات الحرة والتعليمات لا تُنشئ هدف إتمام. لا يُرسل هذا السجل للداشبورد أو لأي جهة،
            ومسح بيانات المتصفح يمسحه.
          </p>
          {confirm ? (
            <div className="reset-confirm">
              <span>مسح سجل المتابعة من هذا الجهاز؟</span>
              <button
                className="button button-danger"
                onClick={() => {
                  clearHistory();
                  setConfirm(false);
                }}
              >
                نعم، مسح السجل
              </button>
              <button className="button button-secondary" onClick={() => setConfirm(false)}>
                إلغاء
              </button>
            </div>
          ) : (
            <button className="text-link" onClick={() => setConfirm(true)}>
              مسح سجل المتابعة
            </button>
          )}
        </>
      )}
    </div>
  );
}
