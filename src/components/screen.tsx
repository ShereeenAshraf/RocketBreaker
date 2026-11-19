import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';

type ScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
};

/**
 * غلاف مشترك لكل شاشات اللعبة.
 * بيدي خلفية Midnight Galaxy + مساحة آمنة تحت النوتش/الشريط السفلي.
 */
export function Screen({ children, style }: ScreenProps) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={[styles.safe, style]}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
});
