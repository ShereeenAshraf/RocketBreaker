import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { NEON_SHOT_HEIGHT, NEON_SHOT_WIDTH } from '@/constants/game';
import { Colors } from '@/constants/theme';

type NeonShotProps = {
  x: number;
  y: number;
};

/**
 * NeonShot = طلقة نيون واحدة من الصاروخ.
 * الألوان من ثيم Midnight Galaxy: بنفسجي → سيان.
 */
export function NeonShot({ x, y }: NeonShotProps) {
  return (
    <View pointerEvents="none" style={[styles.wrap, { left: x, top: y }]}>
      <LinearGradient
        colors={[Colors.accent, Colors.accentCyan]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.beam}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: NEON_SHOT_WIDTH,
    height: NEON_SHOT_HEIGHT,
    borderRadius: NEON_SHOT_WIDTH,
    overflow: 'hidden',
    shadowColor: Colors.accentCyan,
    shadowOpacity: 0.85,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  beam: {
    flex: 1,
    borderRadius: NEON_SHOT_WIDTH,
  },
});
