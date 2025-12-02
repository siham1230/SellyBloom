import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SUN_SIZE = 60;

export const Sun = () => {
  const sunScale = useSharedValue(1);

  useEffect(() => {
    sunScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  return (
    <Animated.View
      entering={FadeIn.duration(1200)}
      style={[styles.sunContainer]}
    >
      <Image
        style={styles.sunGlow}
        source={require('../../assets/icons/account.png')}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sunContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  sun: {
    width: SUN_SIZE,
    height: SUN_SIZE,
    borderRadius: SUN_SIZE / 2,
  },
  sunGlow: {
    position: 'absolute',
    width: SUN_SIZE * 1.2,
    height: SUN_SIZE * 1.2,
    borderRadius: SUN_SIZE,
  },
});
