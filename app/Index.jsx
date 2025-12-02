import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { OrbitAnimation } from '../components/OrbitAnimation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientButton } from '../components/common/GradientButton';
import { FONTS, FONT_WEIGHTS } from '../constants';
import { colors } from '../theme';
import { router } from 'expo-router';

const OnboardingScreen = () => {
  const orbits = useMemo(
    () => [
      {
        radius: 100,
        duration: 40000,
        direction: 'clockwise',
        items: [
          {
            icon: require('../assets/icons/card-bloom.png'),
            colors: [
              [255, 201, 220],
              [240, 98, 146],
            ],
          },
          {
            icon: require('../assets/icons/truck.png'),
            colors: [
              [183, 89, 247],
              [146, 54, 243],
            ],
          },
          {
            icon: require('../assets/icons/calender.png'),
            colors: [
              [255, 82, 82],
              [211, 47, 47],
            ],
          },
          {
            icon: require('../assets/icons/bloom.png'),
            colors: [
              [245, 190, 65],
              [242, 169, 60],
            ],
          },
          {
            icon: require('../assets/icons/shop.png'),
            colors: [
              [238, 122, 48],
              [235, 97, 43],
            ],
          },
          {
            icon: require('../assets/icons/gift.png'),
            colors: [
              [235, 117, 235],
              [235, 83, 213],
            ],
          },
        ],
      },
      {
        radius: 160,
        duration: 50000,
        color: [234, 67, 73],
        direction: 'counter-clockwise',
        items: [
          {
            icon: require('../assets/icons/harth.png'),
            colors: [
              [104, 223, 159],
              [90, 196, 125],
            ],
          },
          {
            colors: [
              [78, 166, 247],
              [60, 136, 236],
            ],
          },
          {
            icon: require('../assets/icons/flowers.png'),
            colors: [
              [78, 166, 247],
              [60, 136, 236],
            ],
          },
          {
            colors: [
              [183, 89, 247],
              [146, 54, 243],
            ],
          },
          {
            icon: require('../assets/icons/walk.png'),
            colors: [
              [238, 122, 48],
              [235, 97, 43],
            ],
          },
          {
            colors: [
              [183, 89, 247],
              [146, 54, 243],
            ],
          },
        ],
      },
    ],
    [],
  );

  const handleGetStarted = () => {
    // Navigate to AuthSelection
    router.push('/AuthSelection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <OrbitAnimation orbits={orbits} style={styles.animation} />
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.title}>Welcome to SellyBloom</Text>
        <Text style={styles.subtitle}>Where every flower tells a story</Text>

        <Text style={styles.description}>
          Discover the freshest blooms, handcrafted arrangements, and perfect gifts for every occasion.
        </Text>

        <GradientButton
          title="Get Started"
          onPress={handleGetStarted}
          size="lg"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  animation: {
    width: 400,
    height: 400,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 24,
    paddingTop: 8,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    fontWeight: FONT_WEIGHTS.medium,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.2,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    fontWeight: FONT_WEIGHTS.regular,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
    paddingHorizontal: 4,
  },
});
