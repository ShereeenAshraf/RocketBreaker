import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';

/**
 * Main Menu — Midnight Galaxy V1
 *
 * الطريقة دلوقتي (للتعلّم ومطابقة الديزاين):
 * 1) صورة الديزاين كاملة كخلفية (title + صاروخ + أزرار مرسومة)
 * 2) فوقها Pressable شفاف فوق أماكن الأزرار عشان الضغط يشتغل
 *
 * بعدين لما نفصل الأصول (صاروخ لوحده، أزرار لوحدها) هنبدّل الطريقة دي.
 */
export default function MenuScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <Image
        source={require('@/assets/images/menu-bg.jpg')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition="center"
        accessibilityIgnoresInvertColors
      />

      {/* طبقة الأزرار الشفافة فوق الرسم في الصورة */}
      <View
        style={[
          styles.actions,
          {
            paddingBottom: Math.max(insets.bottom, Spacing.three) + Spacing.two,
          },
        ]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Play"
          onPress={() => router.push('/game')}
          style={({ pressed }) => [styles.playHit, pressed && styles.pressed]}
        />

        <View style={styles.row}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="How to Play"
            onPress={() => router.push('/how-to-play')}
            style={({ pressed }) => [styles.secondaryHit, pressed && styles.pressed]}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Best Score"
            onPress={() => router.push('/best-score')}
            style={({ pressed }) => [styles.secondaryHit, pressed && styles.pressed]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  actions: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '7%',
    // الأزرار المرسومة في الصورة تقريبًا في أسفل الشاشة
    gap: Spacing.three,
  },
  playHit: {
    width: '100%',
    // ارتفاع زر PLAY الكبير في الموكاب
    height: 58,
    borderRadius: 999,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  secondaryHit: {
    flex: 1,
    height: 48,
    minHeight: 44,
    borderRadius: 14,
  },
  pressed: {
    opacity: 0.7,
  },
});
