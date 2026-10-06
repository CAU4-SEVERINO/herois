
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import HeroCard from '../components/HeroCard';
import BotaoCustomizado from '../components/BotaoCustomizado';
import CustomModal from '../modais/CustomModal';
import { Hero, useHerois } from '../context/HeroContext';

export default function Home() {
  const {
    herois,
    adicionarHeroi,
    editarHeroi,
    excluirHeroi,
  } = useHerois();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [heroiSelecionado, setHeroiSelecionado] =
    useState<Hero | null>(null);

  function abrirCadastro() {
    setHeroiSelecionado(null);
    setModalVisivel(true);
  }

  function abrirEdicao(heroi: Hero) {
    setHeroiSelecionado(heroi);
    setModalVisivel(true);
  }

  function salvarHeroi(
    nome: string,
    classe: string,
    estrelas: number,
    icone: string,
    fotoUri?: string
  ) {
    const dadosHeroi = {
      nome,
      classe,
      estrelas,
      icone,
      fotoUri,
    };

    if (heroiSelecionado) {
      editarHeroi(heroiSelecionado.id, dadosHeroi);
    } else {
      adicionarHeroi(dadosHeroi);
    }
  }

  function removerHeroi(id: number) {
    excluirHeroi(id);
    setModalVisivel(false);
    setHeroiSelecionado(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={herois}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <>
            <View style={styles.cabecalho}>
              <View style={styles.logoArea}>
                <View style={styles.logo}>
                  <Ionicons
                    name="shield"
                    size={25}
                    color="#171323"
                  />
                </View>

                <Text style={styles.logoTexto}>
                  LIGA DE HERÓIS
                </Text>
              </View>

              <Text style={styles.titulo}>
                SEVEFC APRESENTA
              </Text>

              <Text style={styles.subtitulo}>
                Recrute os melhores guerreiros da região.
              </Text>
            </View>

            <View style={styles.resumo}>
              <View>
                <Text style={styles.numero}>
                  {herois.length}
                </Text>

                <Text style={styles.numeroTexto}>
                  {herois.length === 1
                    ? 'herói cadastrado'
                    : 'heróis cadastrados'}
                </Text>
              </View>

              <Ionicons
                name="people-outline"
                size={32}
                color="#F5C451"
              />
            </View>

            <View style={styles.tituloLista}>
              <Text style={styles.tituloSecao}>
                Seus heróis
              </Text>

              {herois.length > 0 && (
                <Text style={styles.quantidade}>
                  {herois.length}
                </Text>
              )}
            </View>
          </>
        }
        renderItem={({ item }) => (
          <HeroCard
            heroi={item}
            onPress={() => abrirEdicao(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <View style={styles.vazioIcone}>
              <Ionicons
                name="shield-outline"
                size={42}
                color="#5F566D"
              />
            </View>

            <Text style={styles.vazioTitulo}>
              A guilda está vazia
            </Text>

            <Text style={styles.vazioTexto}>
              Ainda não existe nenhum herói cadastrado.
              Crie o primeiro e comece sua aventura.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.rodape}>
            <BotaoCustomizado
              titulo="CADASTRAR HERÓI"
              icone="add-circle-outline"
              onPress={abrirCadastro}
            />
          </View>
        }
      />

      <CustomModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        onSave={salvarHeroi}
        onDelete={removerHeroi}
        heroi={heroiSelecionado}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120F1C',
  },

  lista: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 35,
  },

  cabecalho: {
    marginBottom: 22,
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#F5C451',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoTexto: {
    color: '#F5C451',
    fontFamily: 'Fredoka_700Bold',
    fontSize: 19,
    letterSpacing: 1,
  },

  titulo: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka_700Bold',
    fontSize: 31,
    marginTop: 2,
  },

  subtitulo: {
    color: '#91899F',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 12,
    marginTop: 5,
    maxWidth: 240,
    lineHeight: 18,
  },

  resumo: {
    backgroundColor: '#211C2D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#332C42',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 27,
  },

  numero: {
    color: '#F5C451',
    fontFamily: 'Fredoka_700Bold',
    fontSize: 29,
  },

  numeroTexto: {
    color: '#A9A2B8',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 12,
  },

  tituloLista: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 13,
  },

  tituloSecao: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 21,
  },

  quantidade: {
    backgroundColor: '#2B2439',
    color: '#F5C451',
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  vazio: {
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
  },

  vazioIcone: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: '#211C2D',
    borderWidth: 1,
    borderColor: '#332C42',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },

  vazioTitulo: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 19,
    marginBottom: 7,
  },

  vazioTexto: {
    color: '#81788F',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    maxWidth: 285,
  },

  rodape: {
    marginTop: 18,
  },
});
