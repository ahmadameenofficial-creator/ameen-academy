'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ChartNoAxesColumn } from 'lucide-react';
import { useHistory, clearHistory } from '@/lib/history-store';
import { historyStreak, shiftDay } from '@/lib/reading-history';
import { readingDay, prayers } from '@/lib/progress';
import { getCategory } from '@/lib/catalog';
import { number } from '@/lib/text';
import { progressPercent } from '@/lib/daily-progress';
import { DailyProgress } from './daily-progress';
import { AccountProfileForm } from './account-profile';
import { AccountControls } from './account-sync';
import { useReading } from '@/lib/reading-store';
export function PersonalProgress() {
  const { records: allRecords, ready } = useHistory();
  const records = allRecords.filter(row => (row.progress ?? 1) > 0);
  const completedRecords = records.filter(row => (row.progress ?? 1) >= 1);
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
        كل جزء من عدّادات الصباح والمساء يُحتسب ويحفظ يوميًا، حتى قبل إتمام الورد.
      </p>
      <DailyProgress /><AccountControls /><AccountProfileForm />
      {!ready ? (
        <p role="status">جارٍ استعادة السجل…</p>
      ) : (
        <>
          <div className="personal-metrics">
            <section>
              <ChartNoAxesColumn size={24} />
              <strong>{number(historyStreak(completedRecords, today))}</strong>
              <h2>أيام متتالية</h2>
              <p>تشمل اليوم، أو تنتهي بالأمس إلى أن تكمل يومك.</p>
            </section>
            <section>
              <Check size={24} />
              <strong>{number(totalDays)}</strong>
              <h2>أيام فيها قراءة</h2>
              <p>من السجل المحفوظ خلال آخر سنة.</p>
            </section>
            <section>
              <Check size={24} />
              <strong>{number(completedRecords.length)}</strong>
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
                    aria-label={day + ': ' + number(count) + ' أقسام فيها قراءة'}
                  >
                    <span>
                      {new Intl.DateTimeFormat('ar-EG', {
                        weekday: 'short',
                        timeZone: 'UTC',
                      }).format(new Date(day + 'T12:00:00Z'))}
                    </span>
                    <b>{count ? <Check size={23} /> : '—'}</b>
                    <small>{['morning', 'evening'].map(ward => { const row = records.find(r => r.day === day && r.categoryId === ward); return <span key={ward}>{ward === 'morning' ? 'ص' : 'م'} {number(progressPercent(row ? row.progress ?? 1 : 0))}% </span>; })}</small>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="history-list">
            <h2>آخر تقدمك</h2>
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
                      <span>{number(progressPercent(record.progress ?? 1))}%</span><time dateTime={record.day}>{record.day}</time>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="personal-empty">
                <p>ابدأ أي عدّاد للصباح أو المساء؛ سيظهر تقدمك حتى لو لم تكمل الورد.</p>
                <Link className="button button-primary" href="/azkar/morning">
                  ابدأ بأذكار الصباح
                </Link>
              </div>
            )}
          </section>
          <p className="history-note">
            العدادات الحرة والتعليمات لا تُنشئ هدف إتمام. لا يُرسل السجل للداشبورد. عند ربط Google اختياريًا تُحفظ المتابعة في حسابك؛ بدون حساب تبقى على جهازك.
          </p>
          {confirm ? (
            <div className="reset-confirm">
              <span>مسح سجل المتابعة الحالي؟ إذا كنت مرتبطًا بحساب فسيتزامن المسح معه.</span>
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
