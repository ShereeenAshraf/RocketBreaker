import { Stack } from 'expo-router';
import { NavigationBar } from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

import { Colors } from '@/constants/theme';

// نخلي الـ splash الأصلي يفضل ظاهر لحد ما شاشة اللعبة (الصورة) تبقى جاهزة
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 800, fade: true });

/**
 * Root Layout = مدخل التنقّل كله.
 *
 * Stack معناها: الشاشات بتتعمل فوق بعض زي كومة أوراق.
 * - push: تضيف شاشة فوق
 * - replace: تبدّل الشاشة الحالية (مفيدة في Splash → Menu)
 * - back: ترجع لورا
 *
 * NavigationBar style="light" = أزرار/إيماءات فاتحة فوق خلفية غامقة.
 * SystemUI بيخلي خلفية الـ root نفس لون الثيم عشان شريط الأندرويد السفلي مايبانش بلون تاني.
 */
export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(Colors.background);
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <NavigationBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'fade',
        }}
      />
    </>
  );
}
