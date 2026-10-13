export type Ward = 'morning' | 'evening';
export type WardStatus = 'not-started' | 'started' | 'completed';
export const notificationHadiths = [
  {
    id: 'sadaqa',
    excerpt: 'إن بكل تسبيحة صدقة',
    text: 'إن بكل تسبيحة صدقة، وكل تكبيرة صدقة، وكل تحميدة صدقة، وكل تهليلة صدقة.',
    source: 'مسلم 1006',
    url: 'https://sunnah.com/muslim:1006',
  },
  {
    id: 'two-words',
    excerpt: 'كلمتان خفيفتان على اللسان، ثقيلتان في الميزان',
    text: 'كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله العظيم، سبحان الله وبحمده.',
    source: 'البخاري 6406',
    url: 'https://sunnah.com/bukhari:6406',
  },
  {
    id: 'hundred',
    excerpt: 'من قال سبحان الله وبحمده في يوم مائة مرة حطت خطاياه',
    text: 'من قال سبحان الله وبحمده في يوم مائة مرة حطت خطاياه، وإن كانت مثل زبد البحر.',
    source: 'البخاري 6405',
    url: 'https://sunnah.com/bukhari:6405',
  },
  {
    id: 'daily-hundred',
    excerpt: 'من قال حين يصبح وحين يمسي سبحان الله وبحمده مائة مرة',
    text: 'من قال حين يصبح وحين يمسي سبحان الله وبحمده مائة مرة، لم يأت أحد يوم القيامة بأفضل مما جاء به إلا أحد قال مثل ما قال أو زاد عليه.',
    source: 'مسلم 2692',
    url: 'https://sunnah.com/muslim:2692',
  },
  {
    id: 'four-words',
    excerpt: 'أحب الكلام إلى الله أربع',
    text: 'أحب الكلام إلى الله أربع: سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر. لا يضرك بأيهن بدأت.',
    source: 'مسلم 2137',
    url: 'https://sunnah.com/muslim:2137a',
  },
  {
    id: 'sun',
    excerpt:
      'لأن أقول سبحان الله والحمد لله ولا إله إلا الله والله أكبر أحب إلي مما طلعت عليه الشمس',
    text: 'لأن أقول سبحان الله والحمد لله ولا إله إلا الله والله أكبر أحب إلي مما طلعت عليه الشمس.',
    source: 'مسلم 2695',
    url: 'https://sunnah.com/muslim:2695',
  },
] as const;

export function notificationMessage(
  ward: Ward,
  status: WardStatus,
  sequence: number,
  deliveryId: string,
) {
  const hadith =
    notificationHadiths[Math.abs(Math.trunc(sequence) || 0) % notificationHadiths.length];
  const name = ward === 'morning' ? 'الصباح' : 'المساء';
  return {
    version: 1,
    id: deliveryId,
    ward,
    hadith: hadith.id,
    title:
      status === 'started'
        ? 'كمّل أذكار ' + name + ' على مهل | سكينة'
        : 'ابدأ أذكار ' + name + ' | سكينة',
    body: 'قال ﷺ (' + hadith.source + '): «' + hadith.text + '»',
    action: status === 'started' ? 'استكمال الورد' : 'ابدأ الورد',
  };
}
