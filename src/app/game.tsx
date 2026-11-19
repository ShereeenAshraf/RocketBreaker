import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { NeonButton } from '@/components/neon-button';
import { Screen } from '@/components/screen';
import { Colors, Spacing } from '@/constants/theme';

/**
 * Gameplay = شاشة اللعب.
 * دلوقتي Placeholder بس عشان نثبت الفلو.
 * الزر تحت بيحاكي "خلصت الجولة" ويروح Game Over مع سكور تجريبي.
 */
export default function GameScreen() {
  const demoScore = 1280;

  return (
    <Screen style={styles.container}>
      <Text style={styles.score}>Score {demoScore}</Text>

      <View style={styles.arena}>
        <Text style={styles.placeholder}>🚀 Game arena</Text>
        <Text style={styles.hint}>هنا هنحط الصاروخ + الحجارة بعدين</Text>
      </View>

      <NeonButton
        label="End round (demo)"
        onPress={() =>
          router.replace({
            pathname: '/game-over',
            params: { score: String(demoScore) },
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
  },
  score: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  arena: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  placeholder: {
    color: Colors.accent,
    fontSize: 22,
    fontWeight: '700',
  },
  hint: {
    color: Colors.muted,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: Spacing.four,
  },
});
