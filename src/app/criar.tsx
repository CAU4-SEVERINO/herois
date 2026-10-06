import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import BotaoCustomizado from '../components/BotaoCustomizado';
import CustomModal from '../modais/CustomModal';
import { useHerois } from '../context/HeroContext';

export default function CriarHeroi() {
  const { adicionarHeroi } = useHerois();

  const [modalVisivel, setModalVisivel] = useState(false);

  function salvarHeroi(
    nome: string,
    classe: string,
    estrelas: number,
    icone: string
  ) {
    adicionarHeroi({
      nome,
      classe,
      estrelas,
      icone,
    });

    setModalVisivel(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.apresentacao}>
          <View style={styles.iconePrincipal}>
            <Ionicons
              name="sparkles-outline"
              size={48}
              color="#F5C451"
            />
          </View>

          <Text style={styles.titulo}>
            CRIE SEU HERÓI
          </Text>

          <Text style={styles.texto}>
            Todo grande aventureiro começa com uma história.
            Monte seu personagem e escolha o quanto ele será
            lendário.
          </Text>
        </View>

        <View style={styles.informacoes}>
          <View style={styles.infoItem}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#F5C451"
            />

            <View style={styles.infoTextoArea}>
              <Text style={styles.infoTitulo}>
                Identidade
              </Text>

              <Text style={styles.infoDescricao}>
                Escolha um nome para seu herói.
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons
              name="shield-outline"
              size={24}
              color="#F5C451"
            />

            <View style={styles.infoTextoArea}>
              <Text style={styles.infoTitulo}>
                Classe
              </Text>

              <Text style={styles.infoDescricao}>
                Defina o estilo do personagem.
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons
              name="star-outline"
              size={24}
              color="#F5C451"
            />

            <View style={styles.infoTextoArea}>
              <Text style={styles.infoTitulo}>
                Poder
              </Text>

              <Text style={styles.infoDescricao}>
                Dê de uma a cinco estrelas.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.botaoArea}>
          <BotaoCustomizado
            titulo="COMEÇAR CRIAÇÃO"
            icone="create-outline"
            onPress={() => setModalVisivel(true)}
          />
        </View>

        <View style={styles.aviso}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#71697F"
          />

          <Text style={styles.avisoTexto}>
            O herói criado aparecerá automaticamente na lista
            principal da liga de heróis.
          </Text>
        </View>
      </ScrollView>

      <CustomModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        onSave={salvarHeroi}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120F1C',
  },

  conteudo: {
    padding: 22,
    paddingBottom: 40,
  },

  apresentacao: {
    alignItems: 'center',
  },

  iconePrincipal: {
    width: 104,
    height: 104,
    borderRadius: 34,
    backgroundColor: '#211C2D',
    borderWidth: 1,
    borderColor: '#3A334B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  titulo: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka_700Bold',
    fontSize: 29,
    textAlign: 'center',
  },

  texto: {
    color: '#91899F',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 310,
    marginTop: 9,
  },

  informacoes: {
    backgroundColor: '#211C2D',
    borderWidth: 1,
    borderColor: '#332C42',
    borderRadius: 20,
    padding: 18,
    marginTop: 30,
    gap: 20,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  infoTextoArea: {
    flex: 1,
  },

  infoTitulo: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
  },

  infoDescricao: {
    color: '#81788F',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 11,
    marginTop: 3,
  },

  botaoArea: {
    marginTop: 25,
  },

  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 8,
  },

  avisoTexto: {
    flex: 1,
    color: '#71697F',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 10,
    lineHeight: 16,
  },
});