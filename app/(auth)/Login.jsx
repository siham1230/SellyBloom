import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { GradientButton } from '../../components/common/GradientButton';
import { FONTS } from '../../constants';
import { colors } from '../../theme';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in...', { email, password });
        // router.replace('/Home');
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Enter your details to continue</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="hello@sellybloom.com"
                                placeholderTextColor={colors.textSecondary}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor={colors.textSecondary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <GradientButton
                                title="Login"
                                onPress={handleLogin}
                                size="lg"
                                fullWidth
                            />
                        </View>

                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 48,
        justifyContent: 'flex-start',
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 42,
        color: colors.primary,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: colors.text,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: colors.text,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: colors.text,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 16,
    },
    backButton: {
        alignItems: 'center',
        padding: 10,
    },
    backButtonText: {
        fontFamily: FONTS.medium,
        color: colors.textSecondary,
        fontSize: 16,
    },
});
