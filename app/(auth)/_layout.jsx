import { Stack } from 'expo-router';
import { colors } from '../../theme';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="AuthSelection" options={{ headerShown: false }} />
            <Stack.Screen
                name="Login"
                options={{
                    presentation: 'formSheet',
                    headerShown: false,
                    sheetAllowedDetents: [0.8,],
                    sheetDetents: [0.8,],
                    sheetCornerRadius: 16,
                    sheetElevation: 16,
                    sheetGrabberVisible: true,
                    contentStyle: { backgroundColor: colors.background },
                }}
            />
            <Stack.Screen
                name="Register"
                options={{
                    presentation: 'formSheet',
                    headerShown: false,
                    sheetAllowedDetents: [0.8,],
                    sheetDetents: [0.8,],
                    sheetCornerRadius: 16,
                    sheetElevation: 16,
                    sheetGrabberVisible: true,
                    contentStyle: { backgroundColor: colors.background },
                }}
            />
        </Stack>
    );
}
