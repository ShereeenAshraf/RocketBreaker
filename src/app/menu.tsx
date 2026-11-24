import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * Main Menu — Midnight Galaxy V1
 *
 * الطريقة (للتعلّم ومطابقة الديزاين):
 * 1) صورة الديزاين كاملة كخلفية (title + صاروخ + أزرار مرسومة)
 * 2) فوقها Pressable شفاف فوق أماكن الأزرار عشان الضغط يشتغل
 *
 * مهم: الصورة بتتعرض بـ `cover` ومثبتة من تحت، فمقاس الصورة على الشاشة
 * بيتغير حسب الجهاز. عشان كده نحسب مكان كل زر من نسب الصورة نفسها
 * (مش من padding ثابت)، فمنطقة الضغط تقع دايمًا فوق الزر المرسوم.
 */

// أبعاد صورة الخلفية (نسبة 9:16)
const IMAGE_WIDTH = 720;
const IMAGE_HEIGHT = 1280;

// مكان كل زر داخل الصورة كنسب (0..1) من عرض/ارتفاع الصورة
type Hotspot = { left: number; top: number; width: number; height: number };

const PLAY_HOTSPOT: Hotspot = { left: 0.187, top: 0.677, width: 0.63, height: 0.112 };
const HOW_TO_PLAY_HOTSPOT: Hotspot = { left: 0.1, top: 0.81, width: 0.395, height: 0.088 };
const BEST_SCORE_HOTSPOT: Hotspot = { left: 0.514, top: 0.81, width: 0.386, height: 0.088 };

export default function MenuScreen() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  // نفس حساب contentFit="cover" + contentPosition="bottom"
  const scale = Math.max(size.width / IMAGE_WIDTH, size.height / IMAGE_HEIGHT);
  const imageW = IMAGE_WIDTH * scale;
  const imageH = IMAGE_HEIGHT * scale;
  const offsetX = (size.width - imageW) / 2;
  const offsetY = size.height - imageH;

  const hitStyle = (spot: Hotspot) => ({
    position: 'absolute' as const,
    left: offsetX + spot.left * imageW,
    top: offsetY + spot.top * imageH,
    width: spot.width * imageW,
    height: spot.height * imageH,
  });

  return (
    <View style={styles.root} onLayout={onLayout}>
      <Image
        source={require('@/assets/images/menu-bg.jpg')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        // نثبّت أسفل الصورة عشان منطقة الـ navigation bar تاخد نفس لون المشهد
        contentPosition="bottom"
        accessibilityIgnoresInvertColors
      />

      {size.width > 0 && (
        <>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Play"
            onPress={() => router.push('/game')}
            style={({ pressed }) => [hitStyle(PLAY_HOTSPOT), styles.playHit, pressed && styles.pressed]}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="How to Play"
            onPress={() => router.push('/how-to-play')}
            style={({ pressed }) => [
              hitStyle(HOW_TO_PLAY_HOTSPOT),
              styles.secondaryHit,
              pressed && styles.pressed,
            ]}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Best Score"
            onPress={() => router.push('/best-score')}
            style={({ pressed }) => [
              hitStyle(BEST_SCORE_HOTSPOT),
              styles.secondaryHit,
              pressed && styles.pressed,
            ]}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  playHit: {
    borderRadius: 999,
  },
  secondaryHit: {
    borderRadius: 14,
  },
  // تأثير ضغط خفيف فوق الزر المرسوم (الـ Pressable نفسه شفاف)
  pressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});
