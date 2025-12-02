import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Canvas, Rect, RadialGradient, vec } from '@shopify/react-native-skia';
import Animated from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const GridBackground = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            {/* Background grid image */}
            <Animated.Image
                source={require('../../assets/icons/tile-grid-png-6.png')}
                style={styles.gridImage}
                resizeMode="cover"
            />

            {/* Skia radial gradient overlay - fades from center outwards */}
            <Canvas style={styles.gradientCanvas}>
                <Rect x={0} y={0} width={400} height={400}>
                    <RadialGradient
                        c={vec(200, 200)}
                        r={200}
                        colors={[
                            'rgba(250, 251, 245, 0)',
                            'rgba(250, 251, 245, 0.3)',
                            'rgba(250, 251, 245, 0.7)',
                            'rgba(250, 251, 245, 1)',
                        ]}
                        positions={[0, 0.4, 0.7, 1]}
                    />
                </Rect>
            </Canvas>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
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
