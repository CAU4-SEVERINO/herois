import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

import { Hero } from '../context/HeroContext';
import Estrelas from '../components/Estrelas';
import BotaoCustomizado from '../components/BotaoCustomizado';

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (
    nome: string,
    classe: string,
    estrelas: number,
    icone: string,
    fotoUri?: string
  ) => void;
  onDelete?: (id: number) => void;
  heroi?: Hero | null;
};

const classes = [
  { nome: 'Guerreiro', icone: 'shield-outline' },
  { nome: 'Mago', icone: 'sparkles-outline' },
  { nome: 'Arqueiro', icone: 'locate-outline' },
  { nome: 'Paladino', icone: 'flash-outline' },
];

export default function CustomModal({
  visible,
  onClose,
  onSave,
  onDelete,
  heroi,
}: CustomModalProps) {
  const [nome, setNome] = useState('');
  const [classe, setClasse] = useState('');
  const [estrelas, setEstrelas] = useState(3);
  const [icone, setIcone] = useState('shield-outline');
  const [fotoUri, setFotoUri] = useState<string | undefined>();

  const inputNome = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setNome(heroi?.nome || '');
      setClasse(heroi?.classe || '');
      setEstrelas(heroi?.estrelas ?? 3);
      setIcone(heroi?.icone || 'shield-outline');
      setFotoUri(heroi?.fotoUri);
    }
  }, [visible, heroi]);

  async function escolherFoto() {
    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled) {
        setFotoUri(resultado.assets[0].uri);
      }
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível abrir a galeria de fotos.'
      );
    }
  }

  function salvar() {
    if (!nome.trim() || !classe.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o nome e a classe do herói.'
      );
      return;
    }

    onSave(
      nome.trim(),
      classe.trim(),
      estrelas,
      icone,
      fotoUri
    );

    onClose();
  }

  function confirmarExclusao() {
    if (!heroi || !onDelete) {
      return;
    }

    Alert.alert(
      'Excluir herói',
      `Tem certeza que deseja excluir ${heroi.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => onDelete(heroi.id),
        },
      ]
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.fundo}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modal}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.cabecalho}>
              <View style={styles.tituloArea}>
                <Text style={styles.titulo}>
                  {heroi ? 'Editar Herói' : 'Novo Herói'}
                </Text>

                <Text style={styles.subtitulo}>
                  {heroi
                    ? 'Atualize as informações do personagem'
                    : 'Crie um novo membro para sua guilda'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.fechar}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.fotoArea}
              onPress={escolherFoto}
              activeOpacity={0.8}
            >
              {fotoUri ? (
                <Image
                  source={{ uri: fotoUri }}
                  style={styles.foto}
                />
              ) : (
                <View style={styles.semFoto}>
                  <Ionicons
                    name="camera-outline"
                    size={36}
                    color="#F5C451"
                  />

                  <Text style={styles.fotoTexto}>
                    ADICIONAR FOTO
                  </Text>
                </View>
              )}

              <View style={styles.cameraBotao}>
                <Ionicons name="camera" size={17} color="#171323" />
              </View>
            </TouchableOpacity>

            <Text style={styles.dicaFoto}>
              Toque na imagem para escolher ou trocar a foto.
            </Text>

            <Text style={styles.label}>Nome do herói</Text>

            <TextInput
              ref={inputNome}
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Arthur"
              placeholderTextColor="#71697F"
              style={styles.input}
            />

            <Text style={styles.label}>Classe</Text>

            <TextInput
              value={classe}
              onChangeText={setClasse}
              placeholder="Ex: Guerreiro"
              placeholderTextColor="#71697F"
              style={styles.input}
            />

            <Text style={styles.label}>Escolha uma classe</Text>

            <View style={styles.listaClasses}>
              {classes.map((item) => {
                const selecionada = icone === item.icone;

                return (
                  <TouchableOpacity
                    key={item.nome}
                    style={[
                      styles.classeBotao,
                      selecionada && styles.classeSelecionada,
                    ]}
                    onPress={() => {
                      setIcone(item.icone);
                      setClasse(item.nome);
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={item.icone as keyof typeof Ionicons.glyphMap}
                      size={22}
                      color={selecionada ? '#171323' : '#F5C451'}
                    />

                    <Text
                      style={[
                        styles.classeTexto,
                        selecionada && styles.classeTextoSelecionada,
                      ]}
                    >
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.estrelasArea}>
              <Text style={styles.label}>Poder do herói</Text>

              <Estrelas
                quantidade={estrelas}
                clicavel
                onChange={setEstrelas}
                tamanho={28}
              />
            </View>

            <View style={styles.botoes}>
              <BotaoCustomizado
                titulo={heroi ? 'SALVAR ALTERAÇÕES' : 'CRIAR HERÓI'}
                icone="checkmark-circle-outline"
                onPress={salvar}
              />

              {heroi && (
                <TouchableOpacity
                  style={styles.excluir}
                  onPress={confirmarExclusao}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#E57373"
                  />

                  <Text style={styles.excluirTexto}>
                    EXCLUIR HERÓI
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.cancelar}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(8, 6, 13, 0.78)',
    justifyContent: 'center',
    padding: 20,
  },

  modal: {
    backgroundColor: '#171323',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#3A334B',
    maxHeight: '92%',
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  tituloArea: {
    flex: 1,
    paddingRight: 10,
  },

  titulo: {
    color: '#FFFFFF',
    fontFamily: 'Fredoka_700Bold',
    fontSize: 25,
  },

  subtitulo: {
    color: '#91899F',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 12,
    marginTop: 4,
  },

  fechar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#282237',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fotoArea: {
    width: 112,
    height: 112,
    borderRadius: 28,
    backgroundColor: '#282237',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#493F58',
    overflow: 'hidden',
  },

  foto: {
    width: '100%',
    height: '100%',
  },

  semFoto: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  fotoTexto: {
    color: '#F5C451',
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 10,
    marginTop: 5,
  },

  cameraBotao: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: '#F5C451',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dicaFoto: {
    color: '#81788F',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 18,
  },

  label: {
    color: '#D8D1E0',
    fontFamily: 'Fredoka_500Medium',
    fontSize: 14,
    marginBottom: 7,
  },

  input: {
    height: 49,
    backgroundColor: '#211C2D',
    borderWidth: 1,
    borderColor: '#393248',
    borderRadius: 13,
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontFamily: 'Trocchi_400Regular',
    fontSize: 14,
    marginBottom: 14,
  },

  listaClasses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },

  classeBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#211C2D',
    borderWidth: 1,
    borderColor: '#393248',
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 11,
  },

  classeSelecionada: {
    backgroundColor: '#F5C451',
    borderColor: '#F5C451',
  },

  classeTexto: {
    color: '#D8D1E0',
    fontFamily: 'Fredoka_500Medium',
    fontSize: 12,
  },

  classeTextoSelecionada: {
    color: '#171323',
  },

  estrelasArea: {
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 18,
  },

  botoes: {
    alignItems: 'center',
  },

  excluir: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 8,
    paddingHorizontal: 20,
  },

  excluirTexto: {
    color: '#E57373',
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 13,
  },

  cancelar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  cancelarTexto: {
    color: '#92899F',
    fontFamily: 'Fredoka_500Medium',
    fontSize: 14,
  },
});
