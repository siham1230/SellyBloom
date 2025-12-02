// app/_layout.js
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import { Cookie_400Regular } from '@expo-google-fonts/cookie';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Cookie_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <Stack initialRouteName="index">
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                </Stack>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}