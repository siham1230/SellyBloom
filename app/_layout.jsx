// app/_layout.js
import { Stack, router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppSplashScreen from "./AppSplashScreen";

export default function RootLayout() {
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [hasLaunched, setHasLaunched] = useState(null);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            const alreadyLaunched = await AsyncStorage.getItem("hasLaunched");
            setHasLaunched(alreadyLaunched !== null);
        };
        checkFirstLaunch();
    }, []);

    useEffect(() => {
        if (hasLaunched === null) return;

        const timer = setTimeout(() => {
            setIsSplashVisible(false);

            if (hasLaunched) {
                router.replace("/HomeScreen");
            } else {
                router.replace("/OnboardingScreen");
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [hasLaunched]);

    if (isSplashVisible) {
        return <AppSplashScreen />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}