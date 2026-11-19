import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { NeonButton } from '@/components/neon-button';
import { Screen } from '@/components/screen';
import { Colors, Spacing } from '@/constants/theme';

const STEPS = [
  'Swipe to move rocket',
  'Tap to fire soft neon beam',
  'Break fire rocks before they hit',
];

/**
 * How to Play = شاشة شرح.
 * حالياً نص بسيط؛ بعدين هنحوّلها لكروت زي الديزاين.
 */
export default function HowToPlayScreen() {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>How to Play</Text>

      <View style={styles.steps}>
        {STEPS.map((step, index) => (
          <View key={step} style={styles.card}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <NeonButton label="BACK" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.four,
  },
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: Spacing.three,
  },
  steps: {
    flex: 1,
    gap: Spacing.three,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.panel,
    borderColor: Colors.line,
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  stepNumber: {
    color: Colors.accentCyan,
    fontSize: 20,
    fontWeight: '800',
    width: 28,
  },
  stepText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
});
