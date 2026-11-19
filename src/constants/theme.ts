/**
 * Midnight Galaxy V1 — ألوان وثيم اللعبة
 *
 * الفكرة: فضاء ليلي عميق + لمسات نيون (مش دارك رمادي).
 * هتستخدمي الألوان دي في كل الشاشات عشان الشكل يبقى موحّد.
 */

export const Colors = {
  /** خلفية الفضاء */
  background: '#0b1020',
  /** طبقة أفتح شوية للبوكسات */
  panel: '#151a2e',
  /** نص أساسي */
  text: '#f2eefc',
  /** نص ثانوي */
  muted: '#9aa3c7',
  /** بنفسجي نيون (أزرار / تأكيد) */
  accent: '#a78bfa',
  /** سيان نيون (لمسات / حدود) */
  accentCyan: '#38bdf8',
  /** وردي/ماجنتا للعنوان */
  accentPink: '#f472b6',
  /** خط فاصل */
  line: '#2a3358',
  /** ذهبي للـ Best Score */
  gold: '#fbbf24',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;
