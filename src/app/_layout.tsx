import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '@/constants/theme';

/**
 * Root Layout = مدخل التنقّل كله.
 *
 * Stack معناها: الشاشات بتتعمل فوق بعض زي كومة أوراق.
 * - push: تضيف شاشة فوق
 * - replace: تبدّل الشاشة الحالية (مفيدة في Splash → Menu)
 * - back: ترجع لورا
 *
 * headerShown: false عشان الألعاب عادة من غير شريط عنوان النظام.
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
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
