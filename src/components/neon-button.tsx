import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

type NeonButtonProps = {
  label: string;
  onPress: () => void;
  /** primary = الزر الكبير | secondary = زر أصغر */
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

/**
 * زر بروح Midnight Galaxy.
 * primary = تدرج بنفسجي → سيان زي الديزاين
 */
export function NeonButton({
  label,
  onPress,
  variant = 'primary',
  style,
}: NeonButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, style]}>
      {isPrimary ? (
        <LinearGradient
          colors={['#8b5cf6', '#38bdf8']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.base, styles.primary]}>
          <Text style={[styles.label, styles.labelPrimary]}>{label}</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={['#1a2240', '#151a2e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, styles.secondary]}>
          <Text style={[styles.label, styles.labelSecondary]}>{label}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  primary: {
    borderColor: Colors.accentCyan,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    minHeight: 56,
  },
  secondary: {
    borderColor: Colors.line,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.four,
    minHeight: 48,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  labelPrimary: {
    color: Colors.text,
    fontSize: 18,
  },
  labelSecondary: {
    color: Colors.text,
    fontSize: 15,
  },
});
