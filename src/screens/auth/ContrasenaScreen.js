import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import apiClient from '../../services/apiClient'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, FONTS } from '../../core/theme';
import { useAuth } from '../../store/AuthContext';

export default function Contraseña({ navigation }) {
    const [actual, setActual] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [loading, setLoading] = useState(false);
    const { logout } = useAuth();

    const cambiarContraseña = async () => {
        if (loading) return;
        if (!actual.trim() || !contraseña.trim()) {
            Alert.alert('Error', 'Debes completar ambos campos');
            return;
        }

        try {
            setLoading(true);
            await apiClient.post('/auth/cambiar-clave',
                new URLSearchParams({
                    datax: JSON.stringify({ actual, nueva: contraseña })
                }),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            );

            Alert.alert(
                'Éxito',
                'Contraseña cambiada correctamente',
                [
                    {
                        text: 'OK',
                        onPress: async () => {

                            if (logout) {
                                await logout();
                            }
                            navigation.navigate('Home');
                        }
                    }
                ]
            );

        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={s.screen}>
            <Text style={s.title}>Cambiar contraseña</Text>

            <View style={s.card}>
                <View style={s.form}>
                    <TextInput style={s.input} placeholder='Clave Actual' value={actual} onChangeText={setActual} secureTextEntry placeholderTextColor={COLORS.textMuted || '#110101'}/>

                    <TextInput style={s.input} secureTextEntry placeholder='Nueva Contraseña' value={contraseña} onChangeText={setContraseña} placeholderTextColor={COLORS.textMuted || '#110101'}/>
                </View>

                <View style={s.actions}>
                    <TouchableOpacity disabled={loading} onPress={cambiarContraseña} style={s.button}>
                        <Text style={s.buttonText}>
                            {loading ? 'Cargando...' : 'Cambiar Clave'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },

    title: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 10
    },

    card: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 15,

        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 }
    },

    form: {
        gap: 15,
        marginBottom: 10
    },

    input: {
        borderWidth: 1.5,
        borderColor: COLORS.primaryLight,
        borderRadius: 10,
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: FONTS.sizes.sm
    },

    actions: {
        alignItems: 'center',
        gap: 10
    },

    linkText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted
    },

    link: {
        color: COLORS.primary,
        fontWeight: '600'
    },

    button: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        borderRadius: 12,
        height: 40
    },

    buttonText: {
        color: '#fff',
        fontWeight: '600'
    },

    sub: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        marginTop: 12
    }
});