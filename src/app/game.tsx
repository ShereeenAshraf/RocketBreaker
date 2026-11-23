import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlayerRocket } from '@/components/player-rocket';
import { ROCKET_BOTTOM } from '@/constants/game';
import { Colors, Spacing } from '@/constants/theme';
import { useRocketMovement } from '@/hooks/use-rocket-movement';

/**
 * Gameplay
 *
 * الشاشة بتجمع الطبقات بس.
 * منطق الصاروخ والحركة موجود في: useRocketMovement
 */
export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const [score] = useState(0);

  const { rocketX, panGesture, onArenaLayout } = useRocketMovement();

  return (
    <GestureHandlerRootView style={styles.root}>
      <Image
        source={require('@/assets/images/game-bg.jpg')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition="center"
        accessibilityIgnoresInvertColors
      />

      <View style={[styles.hud, { paddingTop: insets.top + Spacing.two }]}>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{String(score).padStart(4, '0')}</Text>
        </View>
      </View>

      <GestureDetector gesture={panGesture}>
        <View style={styles.arena} onLayout={onArenaLayout}>
          <PlayerRocket
            translateX={rocketX}
            bottom={Math.max(insets.bottom, Spacing.two) + ROCKET_BOTTOM}
          />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
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
