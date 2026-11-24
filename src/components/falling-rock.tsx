import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type FallingRockProps = {
  /** الحافة الشمال */
  x: number;
  /** مكان الحجر الرأسي (بيتحرك على UI thread) */
  y: SharedValue<number>;
  /** الدوران بالدرجات */
  rotation: SharedValue<number>;
  /** عرض/ارتفاع الحجر (مربع) */
  size: number;
};

/**
 * FallingRock = الصخرة البنفسجية المتوهجة وهي بتنزل من فوق وتلف.
 * الحركة بالـ transform (مش top) عشان تبقى ناعمة، والقيم جاية من الـ hook.
 */
export function FallingRock({ x, y, rotation, size }: FallingRockProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.wrap, { left: x, width: size, height: size }, animatedStyle]}>
      <Image
        source={require('@/assets/images/rock.png')}
        style={styles.image}
        contentFit="contain"
        accessibilityLabel="Falling rock"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
