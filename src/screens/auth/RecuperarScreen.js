import React, { useState } from 'react';
import apiClient from '../../services/apiClient'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, FONTS } from '../../core/theme';

export default function RecuperarScreen({ navigation }) {

  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);

  const guardarRegistro = async () => {
    if (loading) return;

    try {

      if (!matricula.trim()) {
        Alert.alert("Error: Debe de introducir data")
        return
      }

      setLoading(true);

      const data = {
        matricula: matricula
      };

      const response = await apiClient.post('/auth/olvidar',
        new URLSearchParams({
          datax: JSON.stringify(data)
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const mensaje = response.data?.message;

      alert(mensaje);

      navigation.navigate('Auth', { screen: 'Login' });

    } catch (error) {
      console.log(error.response?.data || error.message);

      const msg = error.response?.data?.message;

      if (msg) {
        alert(msg);
      } else {
        alert('Error al recuperar contraseña');
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={s.screen}>
      <Text style={s.title}>Recuperar contraseña</Text>

      <View style={s.card}>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          justifyContent: 'center',
          padding: 15
        }}>

          <TextInput style={s.input} placeholder='Introducir Matricula' value={matricula} onChangeText={setMatricula} placeholderTextColor={COLORS.textMuted || '#110101'}/>

        </View>

        <TouchableOpacity disabled={loading} onPress={guardarRegistro} style={s.button}>
          <Text style={s.buttonText}>
            {loading ? 'Cargando...' : 'Recuperar'}
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

  input: {
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    borderRadius: 10,
    paddingVertical: 10,
    width: '100%',
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