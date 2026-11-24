import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

import { ROCKET_SIDE_PADDING, ROCKET_WIDTH } from '@/constants/game';

/**
 * useRocketMovement
 *
 * مسؤول عن:
 * - حركة الصاروخ يمين/شمال
 * - معرفة هل في لمس على الشاشة دلوقتي (isTouching)
 *   ← دي اللي بتخلّي الطلقات تطلع وقت اللمس بس
 */
export function useRocketMovement() {
  const arenaWidth = useSharedValue(0);
  const rocketX = useSharedValue(0);
  const dragStartX = useSharedValue(0);
  const [isTouching, setIsTouching] = useState(false);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      dragStartX.value = rocketX.value;
      runOnJS(setIsTouching)(true);
    })
    .onUpdate((event) => {
      const nextX = dragStartX.value + event.translationX;

      const halfArena = arenaWidth.value / 2;
      const halfRocket = ROCKET_WIDTH / 2;
      const minX = -halfArena + halfRocket + ROCKET_SIDE_PADDING;
      const maxX = halfArena - halfRocket - ROCKET_SIDE_PADDING;

      rocketX.value = Math.min(maxX, Math.max(minX, nextX));
    })
    .onFinalize(() => {
      // سواء الحركة خلصت أو الإصبع اتشال
      runOnJS(setIsTouching)(false);
    });

  const onArenaLayout = useCallback(
    (event: LayoutChangeEvent) => {
      arenaWidth.value = event.nativeEvent.layout.width;
    },
    [arenaWidth],
  );

  return {
    rocketX,
    panGesture,
    onArenaLayout,
    isTouching,
  };
}
