import React, { useState } from 'react';
import apiClient from '../../services/apiClient'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, FONTS } from '../../core/theme';

export default function ActivacionScreen({ route, navigation }) {
  const [contraseña, setContraseña] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const { token } = route.params;
  const [loading, setLoading] = useState(false)

  const activarCuenta = async () => {
    if (loading) return;

    try {

      if (contraseña.trim().length < 6) {
        Alert.alert('Error: La contraseña debe de tener mas de 6 caracteres');
        return;
      }

      if (confirmar !== contraseña) {
        Alert.alert('Error: La contraseña no coincide');
        return;
      }

      setLoading(true)

      const data = {
        token: token,
        contrasena: contraseña
      };

      const response = await apiClient.post('/auth/activar',
        new URLSearchParams({
          datax: JSON.stringify(data)
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      alert('Cuenta activada');

      navigation.navigate('Auth', {
        screen: 'login',
      });

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert('Error al activar cuenta');
    } finally {
      setLoading(false)
    }

  };

  return (
    <View style={s.screen}>
      <Text style={s.title}>Activación</Text>

      <View style={s.card}>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          justifyContent: 'center',
          padding: 15
        }}>

          <TextInput style={s.inputHalf} placeholder='Contraseña' value={contraseña} onChangeText={setContraseña} secureTextEntry />

          <TextInput style={s.inputHalf} placeholder='Confirmar' value={confirmar} onChangeText={setConfirmar} secureTextEntry />

        </View>

        <TouchableOpacity disabled={loading} onPress={activarCuenta} style={s.button}>
          <Text style={s.buttonText}>
            {loading ? 'Cargando...' : 'Activar'}
          </Text>
        </TouchableOpacity>

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
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginTop: 15,
    alignItems: 'center',

    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },

  inputHalf: {
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    borderRadius: 10,
    paddingVertical: 10,
    width: '48%',
    textAlign: 'center',
    fontSize: FONTS.sizes.sm
  },

  button: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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