import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { OrbitItem } from './OrbitItem';

export const OrbitRing = React.memo(({
  config,
  index: ringIndex,
}) => {
  const { radius, duration, items, direction = 'clockwise' } = config;
  const rotation = useSharedValue(0);

  // Memoize container and path styles
  const containerStyle = useMemo(
    () => [styles.orbitRingContainer, { width: radius * 2, height: radius * 2 }],
    [radius]
  );

  const pathStyle = useMemo(
    () => [styles.orbitPath, { borderRadius: radius }],
    [radius]
  );

  useEffect(() => {
    const endValue = direction === 'clockwise' ? 360 : -360;

    rotation.value = withRepeat(
      withTiming(endValue, {
        duration: duration,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [direction, duration, rotation]);

  return (
    <View style={containerStyle}>
      <View style={pathStyle} />
      {items.map((item, itemIndex) => (
        <OrbitItem
          key={`item-${ringIndex}-${itemIndex}`}
          item={item}
          index={itemIndex}
          totalItems={items.length}
          radius={radius}
          rotation={rotation}
          ringIndex={ringIndex}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  orbitRingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitPath: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
});
