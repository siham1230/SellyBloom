import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Canvas, Rect, RadialGradient, vec } from '@shopify/react-native-skia';
import { Sun } from './orbit/Sun';
import { OrbitRing } from './orbit/OrbitRing';
import Animated from 'react-native-reanimated';
import { GridBackground } from './common/GridBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const OrbitAnimation = ({
  orbits,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Background grid */}
      <GridBackground />

      {/* Sun */}
      <Sun />

      {/* Orbits */}
      {orbits.map((orbit, index) => (
        <OrbitRing key={`orbit-${index}`} config={orbit} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridImage: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
    transform: [{ scale: 1.5 }],
    alignSelf: 'center',
    opacity: 0.1,
  },
  gradientCanvas: {
    position: 'absolute',
    width: 400,
    height: 400,
    alignSelf: 'center',
  },
});
