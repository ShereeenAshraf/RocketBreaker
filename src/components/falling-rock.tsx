import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

/**
 * أشكال الحجارة المتاحة (كلها من غير وجوه، بألوان ثيم Midnight Galaxy).
 * a = دايري تقريبًا | b = طويل | c = مدبّب
 */
export type RockVariant = 'a' | 'b' | 'c';

const ROCK_SOURCES = {
  a: require('@/assets/images/rock-a.png'),
  b: require('@/assets/images/rock-b.png'),
  c: require('@/assets/images/rock-c.png'),
} as const;

type FallingRockProps = {
  x: number;
  y: number;
  /** عرض/ارتفاع الحجر (مربع) */
  size: number;
  variant: RockVariant;
};

/**
 * FallingRock = حجر واحد بينزل من فوق.
 * شكل بس: المكان والحجم بييجوا من بره (من hook الحجارة بعدين).
 */
export function FallingRock({ x, y, size, variant }: FallingRockProps) {
  return (
    <View
      pointerEvents="none"
      style={[styles.wrap, { left: x, top: y, width: size, height: size }]}>
      <Image
        source={ROCK_SOURCES[variant]}
        style={styles.image}
        contentFit="contain"
        accessibilityLabel="Falling rock"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
