import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { ROCKET_HEIGHT, ROCKET_WIDTH } from '@/constants/game';

type PlayerRocketProps = {
  /** إزاحة أفقية من منتصف الشاشة (من useRocketMovement) */
  translateX: SharedValue<number>;
  bottom: number;
};

/**
 * شكل الصاروخ فقط (PNG بخلفية شفافة).
 * الحركة جاية من الـ hook عن طريق translateX.
 */
export function PlayerRocket({ translateX, bottom }: PlayerRocketProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.wrap, { bottom }, animatedStyle]}>
      <Image
        source={require('@/assets/images/rocket.png')}
        style={styles.image}
        contentFit="contain"
        accessibilityLabel="Player rocket"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: '50%',
    marginLeft: -ROCKET_WIDTH / 2,
    width: ROCKET_WIDTH,
    height: ROCKET_HEIGHT,
  },
  image: {
    width: ROCKET_WIDTH,
    height: ROCKET_HEIGHT,
  },
});
