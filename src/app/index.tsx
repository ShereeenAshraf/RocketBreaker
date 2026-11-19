import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Screen } from '@/components/screen';
import { Colors, Spacing } from '@/constants/theme';

/**
 * Splash = أول شاشة بتفتح مع التطبيق (لأن الملف اسمه index.tsx → المسار `/`).
 *
 * بعد ثانية ونص بنعمل replace للـ Menu:
 * replace مش push، عشان لو المستخدم ضغط Back ميرجعش للـ Splash.
 */
export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/menu');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen style={styles.center}>
      <Text style={styles.eyebrow}>Midnight Galaxy</Text>
      <Text style={styles.title}>ROCKET BREAKER</Text>
      <Text style={styles.loading}>Loading...</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  eyebrow: {
    color: Colors.muted,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: Colors.accentPink,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  loading: {
    marginTop: Spacing.five,
    color: Colors.accentCyan,
    fontSize: 14,
    fontWeight: '600',
  },
});
