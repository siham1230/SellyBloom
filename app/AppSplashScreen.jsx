import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Lobster_400Regular } from '@expo-google-fonts/lobster';


export default function AppSplashScreen() {
    const scaleValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 2000,
            useNativrDriver: false,
        }).start();
    }, []);


    return (
        <View style={styles.container}>
            <Animated.Text
                style={[styles.title, { transform: [{ scale: scaleValue }] }]}>
                SellyBloom

            </Animated.Text>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFC9DC",
    },
    title: {
        fontFamily: "Lobster",
        fontSize: 36,
        color: "#131011ff",
    },
});

