'use client';
import Link from 'next/link';
import { useHistory } from '@/lib/history-store';
import { useReading } from '@/lib/reading-store';
import { readingDay } from '@/lib/progress';
import { progressPercent } from '@/lib/daily-progress';
import { number } from '@/lib/text';
export function DailyProgress() {
  const { records, ready } = useHistory();
  const { state } = useReading();
  const today = state.day || readingDay();
  return <section className="daily-ward-progress" aria-label="تقدم ورد اليوم">
    <h2>وردك اليوم، خطوة بخطوة</h2>
    <div className="daily-ward-grid">{(['morning', 'evening'] as const).map(ward => {
      const row = records.find(row => row.day === today && row.categoryId === ward);
      const progress = (row ? row.progress ?? 1 : 0) * 100;
      const title = ward === 'morning' ? 'الصباح' : 'المساء';
      return <Link key={ward} href={'/azkar/' + ward} className="daily-ward-card">
        <span>أذكار {title}</span><strong>{ready ? number(progressPercent(progress / 100)) + '%' : '…'}</strong>
        <div role="progressbar" aria-label={'تقدم أذكار ' + title} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent(progress / 100)} className="session-progress-track"><span style={{ width: progress + '%' }} /></div>
        <small>{progress >= 100 ? 'أتممت ورد اليوم' : progress > 0 ? 'استكمل من حيث توقفت' : 'ابدأ على مهل'}</small>
      </Link>;
    })}</div>
    <p>كل قراءة تُحتسب، حتى قبل إتمام الورد.</p>
  </section>;
}
