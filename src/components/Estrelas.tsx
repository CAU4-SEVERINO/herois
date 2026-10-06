import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

type EstrelasProps = {
  quantidade: number;
  clicavel?: boolean;
  onChange?: (valor: number) => void;
  tamanho?: number;
};

export default function Estrelas({
  quantidade,
  clicavel = false,
  onChange,
  tamanho = 22,
}: EstrelasProps) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((numero) => {
        const preenchida = numero <= quantidade;

        const estrela = (
          <Ionicons
            name={
              preenchida
                ? 'star'
                : 'star-outline'
            }
            size={tamanho}
            color={
              preenchida
                ? '#F5C451'
                : '#5C536D'
            }
          />
        );

        if (clicavel) {
          return (
            <TouchableOpacity
              key={numero}
              onPress={() => onChange?.(numero)}
              activeOpacity={0.7}
            >
              {estrela}
            </TouchableOpacity>
          );
        }

        return (
          <View key={numero}>
            {estrela}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
});