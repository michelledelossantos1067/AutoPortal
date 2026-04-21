import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import apiClient from '../../services/apiClient';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, FONTS } from '../../core/theme';
import { useAuth } from '../../store/AuthContext';

export default function LoginScreen({ navigation }) {
  const [contraseña, setContraseña] = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const loginCuenta = async () => {
    if (loading) return;

    try {
      if (!contraseña.trim() || !matricula.trim()) return;

      setLoading(true);

      const response = await apiClient.post('/auth/login',
        new URLSearchParams({
          datax: JSON.stringify({
            matricula,
            contrasena: contraseña
          })
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const payload = response.data?.data ?? response.data ?? {};

      const token = payload?.token ?? payload?.accessToken;
      const refreshToken =
        payload?.refreshToken ??
        payload?.refresh_token ??
        payload?.refreshtoken;

      if (!token) {
        Alert.alert('Error login');
        return;
      }

      await SecureStore.setItemAsync('token', token);

      if (refreshToken) {
        await SecureStore.setItemAsync('refreshToken', refreshToken);
      }

      await login({ token, refreshToken, usuario: payload });

    } catch (error) {
      Alert.alert(error.response?.data?.message || 'Error login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.screen}>
      <Text style={s.title}>Login</Text>

      <View style={s.card}>
        <View style={s.form}>

          <TextInput style={s.input} placeholder='Introducir Matricula' value={matricula} onChangeText={setMatricula} placeholderTextColor={COLORS.textMuted || '#110101'} />

          <TextInput style={s.input} secureTextEntry placeholder='Introducir Contraseña' value={contraseña} onChangeText={setContraseña} placeholderTextColor={COLORS.textMuted || '#110101'}/>

        </View>

        <View style={s.actions}>

          <Text style={s.linkText}>
            ¿Olvido su contraseña?{" "}
            <Text style={s.link} onPress={() => navigation.navigate('Auth', { screen: 'Recuperar' })}>
              Recupera aqui
            </Text>
          </Text>

          <TouchableOpacity disabled={loading} onPress={loginCuenta} style={s.button}>
            <Text style={s.buttonText}>
              {loading ? 'Cargando...' : 'Inicia Sesion'}
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
    fontSize: FONTS.sizes.sm,
    color: '#000'
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