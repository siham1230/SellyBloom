import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { GradientButton } from '../../components/common/GradientButton';
import { FONTS } from '../../constants';
import { colors } from '../../theme';
import { useRegistrationStore } from '../../store/registrationStore';

const Register = () => {
    const { step, formData, setStep, updateFormData } = useRegistrationStore();

    const handleNextStep = () => {
        if (step === 1) {
            if (!formData.fullName) {
                alert('Please enter your full name');
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!formData.email) {
                alert('Please enter your email');
                return;
            }
            setStep(3);
        }
    };

    const handleRegister = () => {
        if (!formData.password || !formData.confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log('Registering...', formData);
        // router.replace('/Home');
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            router.back();
        }
    };

    const getStepContent = () => {
        switch (step) {
            case 1:
                return {
                    title: "Let's Start",
                    subtitle: "Tell us your name to personalize your experience.",
                    progress: 0.33
                };
            case 2:
                return {
                    title: "Stay Connected",
                    subtitle: "We'll send order updates to this email.",
                    progress: 0.66
                };
            case 3:
                return {
                    title: "Secure Account",
                    subtitle: "Protect your account with a strong password.",
                    progress: 1.0
                };
            default:
                return { title: "", subtitle: "", progress: 0 };
        }
    };

    const { title, subtitle, progress } = getStepContent();

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>

                    <View style={styles.form}>
                        {step === 1 && (
                            <>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Full Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="John Doe"
                                        placeholderTextColor={colors.textSecondary}
                                        value={formData.fullName}
                                        onChangeText={(text) => updateFormData({ fullName: text })}
                                        autoCapitalize="words"
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <GradientButton title="Next" onPress={handleNextStep} size="lg" fullWidth />
                                </View>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="hello@sellybloom.com"
                                        placeholderTextColor={colors.textSecondary}
                                        value={formData.email}
                                        onChangeText={(text) => updateFormData({ email: text })}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <GradientButton title="Next" onPress={handleNextStep} size="lg" fullWidth />
                                </View>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="••••••••"
                                        placeholderTextColor={colors.textSecondary}
                                        value={formData.password}
                                        onChangeText={(text) => updateFormData({ password: text })}
                                        secureTextEntry
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="••••••••"
                                        placeholderTextColor={colors.textSecondary}
                                        value={formData.confirmPassword}
                                        onChangeText={(text) => updateFormData({ confirmPassword: text })}
                                        secureTextEntry
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <GradientButton title="Register" onPress={handleRegister} size="lg" fullWidth />
                                </View>
                            </>
                        )}

                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Register;

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
        marginBottom: 32,
        alignItems: 'center',
    },
    progressContainer: {
        width: '100%',
        height: 4,
        backgroundColor: '#E9ECEF',
        borderRadius: 2,
        marginBottom: 32,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 2,
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
