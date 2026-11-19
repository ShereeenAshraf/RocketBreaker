import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * Splash — Midnight Galaxy V1
 *
 * نفس أسلوب المنيو: صورة الديزاين كاملة كخلفية
 * (العنوان + الصاروخ + لودينج الدوتس مرسومين جوه الصورة).
 *
 * بعد ~1.8 ثانية → replace للـ Menu
 * (replace مش push عشان Back ميرجعش هنا).
 */
export default function SplashScreenRoute() {
  useEffect(() => {
    // لما صورتنا تظهر، نخفي الـ splash الأصلي بتاع Expo
    SplashScreen.hideAsync().catch(() => {});

    const timer = setTimeout(() => {
      router.replace('/menu');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <Image
        source={require('@/assets/images/splash-bg.jpg')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition="bottom"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
