import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientButton } from '../../components/common/GradientButton';
import { GridBackground } from '../../components/common/GridBackground';
import { ShinyText } from '../../components/common/ShinyText';
import { FONTS } from '../../constants';
import { colors } from '../../theme';

const AuthSelection = () => {
    return (
        <SafeAreaView style={styles.container}>
            <GridBackground style={{ top: -100 }} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <ShinyText text="Welcome" fontSize={56} />
                    <Text style={styles.subtitle}>Sign in or create an account to continue</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <GradientButton
                        title="Sign Up"
                        onPress={() => router.push('/Register')}
                        size="lg"
                        fullWidth
                    />

                    <View style={styles.spacer} />
                    <GradientButton
                        title="Log In"
                        onPress={() => router.push('/Login')}
                        size="lg"
                        fullWidth
                        variant="ghost"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AuthSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 60,
        alignItems: 'center',
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 26,
    },
    buttonContainer: {
        width: '100%',
    },
    spacer: {
        height: 20,
    },
});
