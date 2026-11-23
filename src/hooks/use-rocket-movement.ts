import { useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import { ROCKET_SIDE_PADDING, ROCKET_WIDTH } from '@/constants/game';

/**
 * useRocketMovement
 *
 * Hook مسؤول عن الصاروخ + حركته فقط:
 * - rocketX: مكان الصاروخ أفقيًا (0 = منتصف الشاشة)
 * - panGesture: سحب الإصبع يمين/شمال
 * - onArenaLayout: يعرف عرض الحلبة عشان الحدود
 *
 * ليه Hook؟ عشان شاشة اللعب تفضل بسيطة، ومنطق الحركة يبقى في مكان واحد سهل تتعلميه وتعدّليه.
 */
export function useRocketMovement() {
  const arenaWidth = useSharedValue(0);
  const rocketX = useSharedValue(0);
  const dragStartX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      dragStartX.value = rocketX.value;
    })
    .onUpdate((event) => {
      const nextX = dragStartX.value + event.translationX;

      const halfArena = arenaWidth.value / 2;
      const halfRocket = ROCKET_WIDTH / 2;
      const minX = -halfArena + halfRocket + ROCKET_SIDE_PADDING;
      const maxX = halfArena - halfRocket - ROCKET_SIDE_PADDING;

      rocketX.value = Math.min(maxX, Math.max(minX, nextX));
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
  };
}
