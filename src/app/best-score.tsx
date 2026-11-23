import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { NeonButton } from '@/components/neon-button';
import { Screen } from '@/components/screen';
import { Colors, Spacing } from '@/constants/theme';

/**
 * Best Score — Empty State
 *
 * Empty state = لما مفيش بيانات لسه (أول مرة تفتحي الشاشة / مفيش جولات).
 * بعدين لما نضيف التخزين:
 * - bestScore > 0
 * - recentScores فيها أرقام
 * هنبدّل الجزء ده لعرض القائمة زي الديزاين.
 */
export default function BestScoreScreen() {
  // دلوقتي ثابتة فاضية — خطوة التخزين جاية
  const bestScore = 0;
  const recentScores: number[] = [];
  const isEmpty = bestScore === 0 && recentScores.length === 0;

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.trophy} accessibilityLabel="Trophy">
          🏆
        </Text>
        <Text style={styles.title}>Best Score</Text>
        <Text style={styles.score}>{bestScore.toLocaleString('en-US')}</Text>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Recent Scores</Text>

          {isEmpty ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No scores yet</Text>
              <Text style={styles.emptyHint}>
                Play a round to set your first best score!
              </Text>
            </View>
          ) : (
            recentScores.map((value) => (
              <View key={value} style={styles.scoreRow}>
                <Text style={styles.scoreRowText}>{value.toLocaleString('en-US')}</Text>
              </View>
            ))
          )}
        </View>
      </View>

      <NeonButton label="BACK" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    gap: Spacing.four,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  trophy: {
    fontSize: 56,
    marginBottom: Spacing.one,
  },
  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  score: {
    color: Colors.accentCyan,
    fontSize: 44,
    fontWeight: '800',
    marginBottom: Spacing.three,
  },
  panel: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(21, 26, 46, 0.92)',
    borderColor: Colors.accentCyan,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  panelTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyBox: {
    backgroundColor: Colors.panel,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  emptyHint: {
    color: Colors.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  scoreRow: {
    backgroundColor: Colors.panel,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.line,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  scoreRowText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
});
