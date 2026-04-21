import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Linking } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../core/theme';

export default function AcercaScreen() {
  return (
    <ScrollView style={s.screen}>
      <View style={s.container}>
        <Text style={s.pageTitle}>Integrantes</Text>

        <View style={s.card}>
          <View style={s.row}>
            <View style={s.imageContainer}>
              <Image
                source={require('../../../assets/personas/image1.png')}
                style={s.image}
                resizeMode="contain"
              />
            </View>
            <View style={s.infoContainer}>
              <Text style={s.name}>Informacion</Text>
              <View style={s.divider} />
              <Text style={s.info}><Text style={s.bold}>Nombre:</Text> Angel Antonio</Text>
              <Text style={s.info}><Text style={s.bold}>Apellido:</Text> Martinez Ventura</Text>
              <Text style={s.info}><Text style={s.bold}>Matricula:</Text> 2024-0264</Text>
              <Text style={s.info}><Text style={s.bold}>Telefono:</Text> 829-603-6934</Text>
              <Text style={s.info}><Text style={s.bold}>Telegram:</Text><Text style={s.link} onPress={() => Linking.openURL('https://t.me/AngelMartinez200')}> https://t.me/AngelMartinez200</Text></Text>
              <Text style={s.info}><Text style={s.bold}>Correo:</Text> 20240264@itla.edu.do</Text>
            </View>
          </View>
        </View>

        <View style={s.card}>
          <View style={s.row}>
            <View style={s.imageContainer}>
              <Image
                source={require('../../../assets/personas/image2.png')}
                style={s.image}
                resizeMode="contain"
              />
            </View>
            <View style={s.infoContainer}>
              <Text style={s.name}>Informacion</Text>
              <View style={s.divider} />
              <Text style={s.info}><Text style={s.bold}>Nombre:</Text> Dianny Michelle</Text>
              <Text style={s.info}><Text style={s.bold}>Apellido:</Text> De los santos</Text>
              <Text style={s.info}><Text style={s.bold}>Matricula:</Text> 2024-0213</Text>
              <Text style={s.info}><Text style={s.bold}>Telefono:</Text> 809-906-6054</Text>
              <Text style={s.info}><Text style={s.bold}>Telegram:</Text><Text style={s.link} onPress={() => Linking.openURL('https://t.me/diannymiche')}> https://t.me/diannymiche</Text></Text>
              <Text style={s.info}><Text style={s.bold}>Correo:</Text> diannydelossantos12@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={s.card}>
          <View style={s.row}>
            <View style={s.imageContainer}>
              <Image
                source={require('../../../assets/personas/image3.png')}
                style={s.image}
                resizeMode="contain"
              />
            </View>
            <View style={s.infoContainer}>
              <Text style={s.name}>Informacion</Text>
              <View style={s.divider} />
              <Text style={s.info}><Text style={s.bold}>Nombre:</Text> Reynaldo</Text>
              <Text style={s.info}><Text style={s.bold}>Apellido:</Text> Jiménez</Text>
              <Text style={s.info}><Text style={s.bold}>Matricula:</Text> 2024-0156</Text>
              <Text style={s.info}><Text style={s.bold}>Telefono:</Text> 829-484-1414</Text>
              <Text style={s.info}><Text style={s.bold}>Telegram:</Text><Text style={s.link} onPress={() => Linking.openURL('https://t.me/ReynaldoJG')}> https://t.me/ReynaldoJG</Text></Text>
              <Text style={s.info}><Text style={s.bold}>Correo:</Text> jgreynaldo619@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={s.card}>
          <View style={s.row}>
            <View style={s.imageContainer}>
              <Image
                source={require('../../../assets/personas/image4.png')}
                style={s.image}
                resizeMode="contain"
              />
            </View>
            <View style={s.infoContainer}>
              <Text style={s.name}>Informacion</Text>
              <View style={s.divider} />
              <Text style={s.info}><Text style={s.bold}>Nombre:</Text> Jairo Betancourt</Text>
              <Text style={s.info}><Text style={s.bold}>Apellido:</Text> Hidalgo</Text>
              <Text style={s.info}><Text style={s.bold}>Matricula:</Text> 2022-0060</Text>
              <Text style={s.info}><Text style={s.bold}>Telefono:</Text> 849-453-9110</Text>
              <Text style={s.info}><Text style={s.bold}>Telegram:</Text><Text style={s.link} onPress={() => Linking.openURL('https://t.me/JairoBetaGD')}> https://t.me/JairoBetaGD</Text></Text>
              <Text style={s.info}><Text style={s.bold}>Correo:</Text> jairobeta651@outlook.es</Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageContainer: {
    width: 80,
    height: 100,
    marginRight: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 115,
  },
  infoContainer: {
    flex: 1,
  },

  link: {
    color: COLORS.primary,
    fontWeight: '600'
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  lastname: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 6,
  },
  info: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  bold: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});