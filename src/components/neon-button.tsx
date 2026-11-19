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
 * زر بسيط بنفس روح الثيم.
 * بعدين لما نزوّق الواجهة هنبدّل الألوان/الظلال من هنا مرة واحدة.
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
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}>
      <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primary: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accentCyan,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    minHeight: 56,
  },
  secondary: {
    backgroundColor: Colors.panel,
    borderColor: Colors.line,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.four,
    minHeight: 48,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  labelPrimary: {
    color: Colors.text,
    fontSize: 18,
  },
  labelSecondary: {
    color: Colors.muted,
    fontSize: 15,
  },
});
