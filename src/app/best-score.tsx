import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { NeonButton } from '@/components/neon-button';
import { Screen } from '@/components/screen';
import { Colors, Spacing } from '@/constants/theme';

/**
 * Best Score = أعلى نتيجة.
 * دلوقتي رقم ثابت؛ بعدين هنحفظه بـ AsyncStorage.
 */
export default function BestScoreScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.title}>Best Score</Text>
        <Text style={styles.score}>0</Text>
        <Text style={styles.hint}>لسه مش بنحفظ السكور — دي خطوة لاحقة</Text>
      </View>

      <NeonButton label="BACK" variant="secondary" onPress={() => router.back()} />
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
  trophy: {
    fontSize: 48,
  },
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  score: {
    color: Colors.accentCyan,
    fontSize: 40,
    fontWeight: '800',
  },
  hint: {
    color: Colors.muted,
    fontSize: 13,
    textAlign: 'center',
  },
});
