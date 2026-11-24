import { useEffect, useState } from 'react';
import { SharedValue } from 'react-native-reanimated';

import {
  MAX_NEON_SHOTS,
  NEON_SHOT_FIRE_INTERVAL_MS,
  NEON_SHOT_HEIGHT,
  NEON_SHOT_SPEED,
  NEON_SHOT_WIDTH,
  ROCKET_HEIGHT,
} from '@/constants/game';

export type RocketShot = {
  id: string;
  x: number;
  y: number;
};

type UseRocketShotsOptions = {
  rocketX: SharedValue<number>;
  rocketBottom: number;
  arenaWidth: number;
  arenaHeight: number;
  /** الإطلاق يشتغل بس وإحنا لامسيني الشاشة */
  isTouching: boolean;
};

/**
 * useRocketShots
 *
 * مسؤول عن طلقات الصاروخ:
 * - بتطلع فقط لو isTouching = true (في إصبع على الشاشة)
 * - مكان الإطلاق = مكان الصاروخ الحالي
 * - بتتحرك لفوق وتتشال لما تخرج من الشاشة
 */
export function useRocketShots({
  rocketX,
  rocketBottom,
  arenaWidth,
  arenaHeight,
  isTouching,
}: UseRocketShotsOptions) {
  const [shots, setShots] = useState<RocketShot[]>([]);

  // --- إطلاق متقطع أثناء اللمس فقط ---
  useEffect(() => {
    if (!isTouching || arenaWidth <= 0 || arenaHeight <= 0) {
      return;
    }

    const fire = () => {
      const x = arenaWidth / 2 + rocketX.value - NEON_SHOT_WIDTH / 2;
      const y = arenaHeight - rocketBottom - ROCKET_HEIGHT + 18;

      setShots((current) => {
        const next = [
          ...current,
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            x,
            y,
          },
        ];
        return next.length > MAX_NEON_SHOTS
          ? next.slice(next.length - MAX_NEON_SHOTS)
          : next;
      });
    };

    fire();
    const intervalId = setInterval(fire, NEON_SHOT_FIRE_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [isTouching, arenaWidth, arenaHeight, rocketBottom, rocketX]);

  // --- تحريك الطلقات لفوق (حتى بعد ما تشيلي إيدك، الطلقات اللي طلعت تكمل طريقها) ---
  useEffect(() => {
    if (arenaHeight <= 0) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(32, now - lastTime);
      lastTime = now;
      const step = NEON_SHOT_SPEED * (delta / 16.67);

      setShots((current) => {
        if (current.length === 0) {
          return current;
        }
        return current
          .map((shot) => ({ ...shot, y: shot.y - step }))
          .filter((shot) => shot.y + NEON_SHOT_HEIGHT > 0);
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [arenaHeight]);

  return { shots };
}
