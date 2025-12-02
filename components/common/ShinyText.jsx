import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas, Text, LinearGradient, useFont, vec } from '@shopify/react-native-skia';
import { useSharedValue, withRepeat, withTiming, Easing, useDerivedValue, withSequence, withDelay } from 'react-native-reanimated';
import { Cookie_400Regular } from '@expo-google-fonts/cookie';
import { colors } from '../../theme';

export const ShinyText = ({ text, fontSize = 48 }) => {
    const font = useFont(Cookie_400Regular, fontSize);
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 3000, easing: Easing.linear }),
                withTiming(0, { duration: 0 }), // Reset instantly
                withDelay(2000, withTiming(0, { duration: 0 })) // Wait 2s before restarting (dummy animation to hold value)
            ),
            -1, // Infinite repeat
            false // Do not reverse
        );
    }, []);

    const textWidth = font ? font.measureText(text).width : 0;
    const widthSV = useSharedValue(0);

    useEffect(() => {
        if (textWidth > 0) {
            widthSV.value = textWidth;
        }
    }, [textWidth]);

    const gradientTransform = useDerivedValue(() => {
        const w = widthSV.value;
        if (w === 0) return [];
        // Sweep from left (-w) to right (w) so the shine passes completely through
        return [{ translateX: -w + (progress.value * 2.5 * w) }];
    });
    const x = -textWidth / 2; // We will translate the canvas origin to center

    if (!font) {
        return <View style={{ height: fontSize + 10 }} />; // Placeholder to prevent layout jump
    }

    return (
        <View style={{ height: fontSize + 20, width: textWidth + 20, alignItems: 'center', justifyContent: 'center' }}>
            <Canvas style={{ width: textWidth + 40, height: fontSize + 20 }}>
                {/* Translate to center the text drawing */}
                <Text
                    x={20}
                    y={fontSize}
                    text={text}
                    font={font}
                >
                    <LinearGradient
                        start={vec(0, 0)}
                        end={vec(textWidth, 0)}
                        colors={[colors.primary, colors.secondary, colors.primary]}
                        positions={[0, 0.5, 1]}
                        transform={gradientTransform}
                    />
                </Text>
            </Canvas>
        </View>
    );
};
