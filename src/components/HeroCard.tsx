import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Hero } from '../context/HeroContext';
import Estrelas from './Estrelas';

type HeroCardProps = {
  heroi: Hero;
  onPress: () => void;
};

export default function HeroCard({
  heroi,
  onPress,
}: HeroCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {heroi.fotoUri ? (
        <Image
          source={{ uri: heroi.fotoUri }}
          style={styles.icone}
        />
      ) : (
        <View style={styles.icone}>
          <Ionicons
            name={
              heroi.icone as keyof typeof Ionicons.glyphMap
            }
            size={31}
            color="#F5C451"
          />
        </View>
      )}

      <View style={styles.informacoes}>
        <Text style={styles.nome}>
          {heroi.nome}
        </Text>

        <View style={styles.classe}>
          <Ionicons
            name="shield-outline"
            size={15}
            color="#A9A2B8"
          />

          <Text style={styles.classeTexto}>
            {heroi.classe}
          </Text>
        </View>

        <Estrelas
          quantidade={heroi.estrelas}
          tamanho={17}
        />
      </View>

      <Ionicons
        name="chevron-forward"
        size={21}
        color="#655C76"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#211C2D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#332C42',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  icone: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: '#2B2439',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    overflow: 'hidden',
  },

  informacoes: {
    flex: 1,
    gap: 6,
  },

  nome: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 19,
  },

  classe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  classeTexto: {
    color: '#A9A2B8',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 13,
  },
});