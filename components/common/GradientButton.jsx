import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Canvas, Rect, LinearGradient, vec } from '@shopify/react-native-skia';

export const GradientButton = ({ title, onPress, size = 'md', fullWidth = false, variant = 'filled' }) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        size === 'lg' && styles.lgContainer,
        isGhost && styles.ghostContainer,
      ]}
      onLayout={(e) => {
        setLayout({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        });
      }}
    >
      {!isGhost && layout.width > 0 && layout.height > 0 && (
        <Canvas style={StyleSheet.absoluteFill}>
          <Rect x={0} y={0} width={layout.width} height={layout.height}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(layout.width, 0)}
              colors={['#4A4B46', '#656660', '#656660', '#4A4B46']}
              positions={[0, 0.1, 0.9, 1]}
            />
          </Rect>
        </Canvas>
      )}

      <View style={[
        styles.content,
        size === 'lg' && styles.lgContent,
      ]}>
        <Text style={[styles.text, isGhost && styles.ghostText]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#656660', // Fallback color for filled
  },
  ghostContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4A4B46',
  },
  fullWidth: {
    width: '100%',
  },
  lgContainer: {
    // Container specific styles if needed
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure text is above canvas
  },
  lgContent: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ghostText: {
    color: '#4A4B46',
  },
});
