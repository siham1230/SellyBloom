import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  Canvas,
  Circle,
  RadialGradient,
  LinearGradient,
  vec,
  Image,
  useImage,
  BlurMask,
  Group,
} from '@shopify/react-native-skia';

const ITEM_SIZE = 50;
const GLOW_SIZE = 80;
const CANVAS_SIZE = GLOW_SIZE + 20;
const CENTER = CANVAS_SIZE / 2;

export const OrbitItem = React.memo(({
  index,
  totalItems,
  radius,
  rotation,
  item,
  ringIndex,
}) => {
  const angleStep = 360 / totalItems;
  const initialAngle = index * angleStep;
  const entranceProgress = useSharedValue(0);

  // Load the image asset only if icon exists
  const image = useImage(item?.icon || null);

  // Memoize color calculations
  const gradientColors = useMemo(() => {
    if (!item?.colors || item.colors.length < 2) {
        // Fallback colors if missing
        return [
            'rgba(255, 201, 220, 0.9)',
            'rgba(240, 98, 146, 0.7)',
            'rgba(255, 201, 220, 0.3)',
            'rgba(255, 201, 220, 0)',
        ];
    }
    return [
      `rgba(${item.colors[0][0]}, ${item.colors[0][1]}, ${item.colors[0][2]}, 0.9)`,
      `rgba(${item.colors[1][0]}, ${item.colors[1][1]}, ${item.colors[1][2]}, 0.7)`,
      `rgba(${item.colors[0][0]}, ${item.colors[0][1]}, ${item.colors[0][2]}, 0.3)`,
      `rgba(${item.colors[0][0]}, ${item.colors[0][1]}, ${item.colors[0][2]}, 0)`,
    ];
  }, [item?.colors]);

  const mainCircleColors = useMemo(() => {
    if (!item?.colors || item.colors.length < 2) {
         return [
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 201, 220, 1)',
            'rgba(240, 98, 146, 0.9)',
            'rgba(200, 50, 100, 0.5)',
         ];
    }
    return [
      `rgba(${Math.min((item.colors[0]?.[0] ?? 0) + 40, 255)}, ${Math.min(
        (item.colors[0]?.[1] ?? 0) + 40,
        255,
      )}, ${Math.min((item.colors[0]?.[2] ?? 0) + 40, 255)}, 0.4)`,
      `rgba(${item.colors[0][0]}, ${item.colors[0][1]}, ${item.colors[0][2]}, 1)`,
      `rgba(${item.colors[1][0]}, ${item.colors[1][1]}, ${item.colors[1][2]}, 0.9)`,
      `rgba(${Math.max((item.colors[1]?.[0] ?? 0) - 30, 0)}, ${Math.max(
        (item.colors[1]?.[1] ?? 0) - 30,
        0,
      )}, ${Math.max((item.colors[1]?.[2] ?? 0) - 30, 0)}, 0.5)`,
    ];
  }, [item?.colors]);

  useEffect(() => {
    const delay = ringIndex * 500 + index * 80;
    entranceProgress.value = withDelay(
      delay,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [index, ringIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    const currentAngleDeg = rotation.value + initialAngle;
    const currentAngleRad = (currentAngleDeg * Math.PI) / 180;

    const translateX = radius * Math.cos(currentAngleRad);
    const translateY = radius * Math.sin(currentAngleRad);

    const sinVal = Math.sin(currentAngleRad);
    const zIndex = sinVal > 0 ? 10 : 1;

    const progress = entranceProgress.value;

    return {
      transform: [
        { translateX },
        { translateY },
        { scale: progress },
      ],
      opacity: progress,
      zIndex,
    };
  }, [radius, initialAngle]);

  const hasIcon = !!item?.icon;

  // Render empty state (no icon) using native components
  if (!hasIcon) {
    return (
      <Animated.View style={[styles.itemContainer, animatedStyle]}>
        <View style={styles.emptyCircle}>
          <Text style={styles.questionMark}>?</Text>
        </View>
      </Animated.View>
    );
  }

  if (!image) {
    return null;
  }

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <Canvas style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
        {/* Outer Glow Effect */}
        <Group>
          <Circle cx={CENTER} cy={CENTER} r={ITEM_SIZE / 2 + 10}>
            <RadialGradient
              c={vec(CENTER, CENTER)}
              r={ITEM_SIZE / 2 + 20}
              colors={gradientColors}
            />
            <BlurMask blur={15} style="normal" />
          </Circle>
        </Group>

        {/* Main circle with enhanced 3D gradient */}
        <Circle cx={CENTER} cy={CENTER} r={ITEM_SIZE / 2}>
          <LinearGradient
            start={vec(CENTER - ITEM_SIZE / 3, CENTER - ITEM_SIZE / 3)}
            end={vec(CENTER + ITEM_SIZE / 3, CENTER + ITEM_SIZE / 3)}
            colors={mainCircleColors}
            positions={[0, 0.35, 0.65, 1]}
          />
        </Circle>

        {/* Image Icon */}
        <Image
          image={image}
          x={CENTER - ITEM_SIZE / 4}
          y={CENTER - ITEM_SIZE / 4}
          width={ITEM_SIZE / 2}
          height={ITEM_SIZE / 2}
          fit="contain"
        />
      </Canvas>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  canvas: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  emptyCircle: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cccccc',
  },
});
