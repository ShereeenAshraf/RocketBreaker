/**
 * ثوابت اللعب — عشان نعدّل المقاسات من مكان واحد.
 */
export const ROCKET_WIDTH = 120;
export const ROCKET_HEIGHT = 150;
/** مسافة الصاروخ من أسفل الـ arena */
export const ROCKET_BOTTOM = 24;
/** هامش أمان من حواف الشاشة */
export const ROCKET_SIDE_PADDING = 2;

/** طلقة النيون (شعاع قصير متقطع) */
export const NEON_SHOT_WIDTH = 5;
export const NEON_SHOT_HEIGHT = 26;
/** سرعة الطلقة لفوق (بكسل تقريبًا لكل فريم ~16ms) */
export const NEON_SHOT_SPEED = 14;
/** كل قد إيه نطلع طلقة وإحنا لامسيني الشاشة */
export const NEON_SHOT_FIRE_INTERVAL_MS = 260;
/** أقصى عدد طلقات ظاهرة في نفس الوقت */
export const MAX_NEON_SHOTS = 12;
