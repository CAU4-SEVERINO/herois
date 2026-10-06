import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

type BotaoCustomizadoProps = {
  titulo: string;
  onPress: () => void;
  icone?: keyof typeof Ionicons.glyphMap;
  secundario?: boolean;
};

export default function BotaoCustomizado({
  titulo,
  onPress,
  icone,
  secundario = false,
}: BotaoCustomizadoProps) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        secundario
          ? styles.botaoSecundario
          : styles.botaoPrincipal,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icone && (
        <Ionicons
          name={icone}
          size={21}
          color={secundario ? '#F5C451' : '#171323'}
        />
      )}

      <Text
        style={[
          styles.texto,
          secundario
            ? styles.textoSecundario
            : styles.textoPrincipal,
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 52,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    paddingHorizontal: 20,
  },

  botaoPrincipal: {
    backgroundColor: '#F5C451',
  },

  botaoSecundario: {
    backgroundColor: '#211C2D',
    borderWidth: 1,
    borderColor: '#3A334B',
  },

  texto: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 16,
  },

  textoPrincipal: {
    color: '#171323',
  },

  textoSecundario: {
    color: '#F5C451',
  },
});