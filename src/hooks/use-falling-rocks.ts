import { useCallback, useEffect, useRef, useState } from 'react';
import {
  cancelAnimation,
  Easing,
  makeMutable,
  ReduceMotion,
  runOnJS,
  SharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {
  MAX_ROCKS,
  ROCK_MAX_SIZE,
  ROCK_MAX_SPEED,
  ROCK_MIN_SIZE,
  ROCK_MIN_SPEED,
  ROCK_SPAWN_INTERVAL_MS,
} from '@/constants/game';

export type Rock = {
  id: string;
  /** الحافة الشمال للحجر (ثابتة) */
  x: number;
  size: number;
  /**
   * مكان الحجر الرأسي — SharedValue بتتحرك على UI thread.
   * (هنقراها بعدين في الاصطدام: rock.y.value)
   */
  y: SharedValue<number>;
  /** زاوية دوران الحجر بالدرجات (للشكل بس) */
  rotation: SharedValue<number>;
};

type UseFallingRocksOptions = {
  arenaWidth: number;
  arenaHeight: number;
};

/** مدة الفريم الواحد تقريبًا */
const FRAME_MS = 16.67;

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * useFallingRocks
 *
 * - كل ROCK_SPAWN_INTERVAL_MS يطلع حجر جديد فوق الشاشة في x عشوائي
 * - الحجر بينزل ويلف بأنيميشن بتشتغل على UI thread (ناعمة حتى لو الـ JS مشغول)
 * - لما يوصل لأسفل الشاشة يتشال ويختفي
 *
 * ليه مش setState في كل فريم؟ لأن ده بيعمل re-render لكل الشاشة 60 مرة في الثانية
 * فالحركة بتهنّج. هنا الـ state بيتغير بس لما حجر يظهر أو يختفي.
 */
export function useFallingRocks({ arenaWidth, arenaHeight }: UseFallingRocksOptions) {
  const [rocks, setRocks] = useState<Rock[]>([]);
  // نسخة من القايمة نقدر نقراها فورًا (من غير ما نستنى re-render)
  const rocksRef = useRef<Rock[]>([]);

  const removeRock = useCallback((id: string) => {
    rocksRef.current = rocksRef.current.filter((rock) => rock.id !== id);
    setRocks(rocksRef.current);
  }, []);

  useEffect(() => {
    if (arenaWidth <= 0 || arenaHeight <= 0) {
      return;
    }

    const spawn = () => {
      if (rocksRef.current.length >= MAX_ROCKS) {
        return;
      }

      const size = randomBetween(ROCK_MIN_SIZE, ROCK_MAX_SIZE);
      const speed = randomBetween(ROCK_MIN_SPEED, ROCK_MAX_SPEED);
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      // يبدأ فوق الشاشة بالكامل، فيدخل تدريجيًا
      const y = makeMutable(-size);
      const rotation = makeMutable(0);

      // مهم: ReduceMotion.Never عشان لو الجهاز عامل "Remove animations"
      // الحجر ميقفزش لآخر الطريق فورًا.
      const fallDuration = ((arenaHeight + size) / speed) * FRAME_MS;
      y.value = withTiming(
        arenaHeight,
        { duration: fallDuration, easing: Easing.linear, reduceMotion: ReduceMotion.Never },
        (finished) => {
          if (finished) {
            runOnJS(removeRock)(id);
          }
        },
      );

      // لفّة بطيئة مستمرة، اتجاه وسرعة مختلفين لكل حجر
      const direction = Math.random() < 0.5 ? -1 : 1;
      rotation.value = withRepeat(
        withTiming(360 * direction, {
          duration: randomBetween(4000, 9000),
          easing: Easing.linear,
          reduceMotion: ReduceMotion.Never,
        }),
        -1,
        false,
        undefined,
        ReduceMotion.Never,
      );

      const rock: Rock = {
        id,
        // الحجر لازم يفضل جوه الشاشة أفقيًا
        x: randomBetween(0, arenaWidth - size),
        size,
        y,
        rotation,
      };

      rocksRef.current = [...rocksRef.current, rock];
      setRocks(rocksRef.current);
    };

    spawn();
    const intervalId = setInterval(spawn, ROCK_SPAWN_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [arenaWidth, arenaHeight, removeRock]);

  // لما نسيب الشاشة نوقف كل الأنيميشن الشغالة
  useEffect(() => {
    return () => {
      rocksRef.current.forEach((rock) => {
        cancelAnimation(rock.y);
        cancelAnimation(rock.rotation);
      });
      rocksRef.current = [];
    };
  }, []);

  return { rocks };
}
