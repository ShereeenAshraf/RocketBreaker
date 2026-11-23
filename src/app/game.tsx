import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';

/**
 * الخطوة 1 من اللعب: Arena + Score + خلفية المجرة
 *
 * الطبقات من تحت لفوق:
 * 1) صورة المجرة (خلفية ثابتة)
 * 2) Arena فاضية (هنا هنحط الصاروخ/الحجارة بعدين)
 * 3) HUD السكور فوق الكل
 */
export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const [score] = useState(0);

  return (
    <View style={styles.root}>
      {/* طبقة الخلفية: المجرة */}
      <Image
        source={require('@/assets/images/game-bg.jpg')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition="center"
        accessibilityIgnoresInvertColors
      />

      {/* HUD فوق */}
      <View style={[styles.hud, { paddingTop: insets.top + Spacing.two }]}>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{String(score).padStart(4, '0')}</Text>
        </View>
      </View>

      {/* Arena فاضية فوق الخلفية — جاهزة للعناصر الجاية */}
      <View style={styles.arena} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hud: {
    alignItems: 'center',
    paddingBottom: Spacing.two,
    zIndex: 2,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: 'rgba(21, 26, 46, 0.9)',
    borderColor: Colors.line,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  scoreLabel: {
    color: Colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  scoreValue: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
    minWidth: 64,
    textAlign: 'center',
  },
  arena: {
    flex: 1,
    zIndex: 1,
  },
});
