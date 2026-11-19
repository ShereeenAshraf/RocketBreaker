import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { NeonButton } from '@/components/neon-button';
import { Screen } from '@/components/screen';
import { Colors, Spacing } from '@/constants/theme';

/**
 * Game Over:
 * - Play Again → replace لـ /game (جولة جديدة)
 * - Home → replace لـ /menu (مش back عشان منفضلش جوّه ستاك اللعب)
 *
 * useLocalSearchParams بتقرا القيم اللي اتبعتت مع الرابط (زي score).
 */
export default function GameOverScreen() {
  const { score } = useLocalSearchParams<{ score?: string }>();
  const currentScore = score ?? '0';

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>GAME OVER</Text>
        <Text style={styles.score}>Score {currentScore}</Text>
        <Text style={styles.best}>Best — قريبًا</Text>
      </View>

      <View style={styles.actions}>
        <NeonButton label="PLAY AGAIN" onPress={() => router.replace('/game')} />
        <NeonButton
          label="HOME"
          variant="secondary"
          onPress={() => router.replace('/menu')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  title: {
    color: Colors.accentPink,
    fontSize: 32,
    fontWeight: '800',
  },
  score: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  best: {
    color: Colors.gold,
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
});
