import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../core/theme';

export default function IngresosScreen() {
  return (
    <View style={s.screen}>
      <Text style={s.title}>IngresosScreen</Text>
      <Text style={s.sub}>Pendiente de implementacion</Text>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  title:  { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.textPrimary },
  sub:    { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, marginTop: 8 },
});
