import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import MapView, {
  Marker,
  Region,
} from "react-native-maps";

import {
  adicionarMidia,
  criarBuraco,
} from "@/database/buracoRepository";

import { colors } from "@/theme/colors";

export default function CadastroBuraco({
  navigation,
}: any) {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  const [categoria, setCategoria] =
    useState("Rua");

  const [gravidade, setGravidade] =
    useState("Média");

  const [foto, setFoto] =
    useState<string | null>(null);

  const [latitude, setLatitude] =
    useState<number | null>(null);

  const [longitude, setLongitude] =
    useState<number | null>(null);

  const [carregandoLocalizacao, setCarregandoLocalizacao] =
    useState(true);

  useEffect(() => {
    obterLocalizacao();
  }, []);

  async function obterLocalizacao() {

    try {

      setCarregandoLocalizacao(true);

      const {
        status,
      } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {

        Alert.alert(
          "Permissão necessária",
          "Precisamos da sua localização para registrar o buraco."
        );

        setCarregandoLocalizacao(false);

        return;
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy:
            Location.Accuracy.High,
        });

      const lat =
        location.coords.latitude;

      const lng =
        location.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);

      const enderecoAtual =
        await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: lng,
        });

      if (enderecoAtual.length > 0) {

        const local =
          enderecoAtual[0];

        setEndereco(
          [
            local.street,
            local.name,
            local.streetNumber,
          ]
            .filter(Boolean)
            .join(", ")
        );

        setBairro(
          local.district || ""
        );

        setCidade(
          local.city ||
          local.subregion ||
          ""
        );
      }

    } catch (error) {

      console.log(
        "Erro ao obter localização:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível obter sua localização."
      );

    } finally {

      setCarregandoLocalizacao(false);

    }
  }

  async function tirarFoto() {

    const {
      status,
    } =
      await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {

      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à câmera."
      );

      return;
    }

    const resultado =
      await ImagePicker.launchCameraAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

    if (!resultado.canceled) {

      setFoto(
        resultado.assets[0].uri
      );
    }
  }

  async function escolherGaleria() {

    const {
      status,
    } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {

      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à sua galeria."
      );

      return;
    }

    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

    if (!resultado.canceled) {

      setFoto(
        resultado.assets[0].uri
      );
    }
  }

  async function selecionarFoto() {

    Alert.alert(
      "Adicionar foto",
      "Escolha uma opção",
      [
        {
          text: "Tirar foto",
          onPress: tirarFoto,
        },
        {
          text: "Escolher da galeria",
          onPress: escolherGaleria,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  }

  function cadastrar() {

    if (!titulo.trim()) {

      Alert.alert(
        "Atenção",
        "Informe um título para o problema."
      );

      return;
    }

    if (
      latitude === null ||
      longitude === null
    ) {

      Alert.alert(
        "Atenção",
        "A localização ainda não foi encontrada."
      );

      return;
    }

    try {

      /*
       * POR ENQUANTO:
       * vamos usar usuário 1.
       *
       * Depois vamos pegar o ID
       * do usuário realmente logado.
       */

      const buracoId =
        criarBuraco(
          1,
          titulo,
          descricao,
          endereco,
          bairro,
          cidade,
          latitude,
          longitude,
          categoria,
          gravidade
        );

      if (foto) {

        adicionarMidia(
          Number(buracoId),
          foto,
          "imagem"
        );
      }

      Alert.alert(
        "Buraco registrado!",
        "O problema foi cadastrado com sucesso.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o buraco."
      );
    }
  }

  const region: Region | undefined =
    latitude !== null &&
      longitude !== null
      ? {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
      : undefined;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text style={styles.back}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Registrar buraco
        </Text>

        <View style={styles.headerSpace} />

      </View>

      {/* FOTO */}

      <Text style={styles.sectionTitle}>
        Foto do problema
      </Text>

      <TouchableOpacity
        style={styles.photoArea}
        onPress={selecionarFoto}
      >

        {foto ? (

          <Image
            source={{
              uri: foto,
            }}
            style={styles.photo}
          />

        ) : (

          <View
            style={
              styles.photoPlaceholder
            }
          >

            <Text
              style={
                styles.cameraIcon
              }
            >
              📷
            </Text>

            <Text
              style={
                styles.photoTitle
              }
            >
              Adicionar foto
            </Text>

            <Text
              style={
                styles.photoSubtitle
              }
            >
              Tire uma foto ou escolha
              da galeria
            </Text>

          </View>

        )}

      </TouchableOpacity>

      {/* TÍTULO */}

      <Text style={styles.sectionTitle}>
        Informações
      </Text>

      <Text style={styles.label}>
        Título
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Buraco grande na rua"
        placeholderTextColor={
          colors.textSecondary
        }
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>
        Descrição
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
        placeholder="Descreva o problema..."
        placeholderTextColor={
          colors.textSecondary
        }
        value={descricao}
        onChangeText={setDescricao}
        multiline
        textAlignVertical="top"
      />

      {/* CATEGORIA */}

      <Text style={styles.label}>
        Categoria
      </Text>

      <View style={styles.optionsRow}>

        {[
          "Rua",
          "Calçada",
          "Estrada",
        ].map((item) => (

          <TouchableOpacity
            key={item}
            style={[
              styles.option,
              categoria === item &&
              styles.optionActive,
            ]}
            onPress={() =>
              setCategoria(item)
            }
          >
            <Text
              style={[
                styles.optionText,
                categoria === item &&
                styles.optionTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>

        ))}

      </View>

      {/* GRAVIDADE */}

      <Text style={styles.label}>
        Gravidade
      </Text>

      <View style={styles.optionsRow}>

        {[
          "Baixa",
          "Média",
          "Alta",
        ].map((item) => (

          <TouchableOpacity
            key={item}
            style={[
              styles.option,
              gravidade === item &&
              styles.optionActive,
            ]}
            onPress={() =>
              setGravidade(item)
            }
          >
            <Text
              style={[
                styles.optionText,
                gravidade === item &&
                styles.optionTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>

        ))}

      </View>

      {/* LOCALIZAÇÃO */}

      <Text style={styles.sectionTitle}>
        Localização
      </Text>

      <View style={styles.locationHeader}>

        <Text style={styles.locationIcon}>
          📍
        </Text>

        <View style={styles.locationInfo}>

          <Text
            style={
              styles.locationTitle
            }
          >
            Sua localização
          </Text>

          <Text
            style={
              styles.locationText
            }
          >
            {carregandoLocalizacao
              ? "Obtendo localização..."
              : endereco ||
              "Localização encontrada"}
          </Text>

        </View>

        <TouchableOpacity
          onPress={obterLocalizacao}
        >
          <Text
            style={
              styles.refreshText
            }
          >
            Atualizar
          </Text>
        </TouchableOpacity>

      </View>

      {/* MAPA */}

      <View style={styles.mapContainer}>

        {region ? (

          <MapView
            style={styles.map}
            region={region}
          >

            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
              title="Buraco registrado"
              description={
                endereco
              }
            />

          </MapView>

        ) : (

          <View
            style={
              styles.mapLoading
            }
          >
            <Text>
              Carregando mapa...
            </Text>
          </View>

        )}

      </View>

      {/* ENDEREÇO */}

      <Text style={styles.label}>
        Endereço
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor={
          colors.textSecondary
        }
        value={endereco}
        onChangeText={setEndereco}
      />

      <Text style={styles.label}>
        Bairro
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Bairro"
        placeholderTextColor={
          colors.textSecondary
        }
        value={bairro}
        onChangeText={setBairro}
      />

      <Text style={styles.label}>
        Cidade
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Cidade"
        placeholderTextColor={
          colors.textSecondary
        }
        value={cidade}
        onChangeText={setCidade}
      />

      {/* BOTÃO */}

      <TouchableOpacity
        style={styles.button}
        onPress={cadastrar}
      >

        <Text style={styles.buttonText}>
          Cadastrar buraco
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    height: 90,
    paddingTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    fontSize: 36,
    color: colors.text,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },

  headerSpace: {
    width: 25,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
    marginTop: 20,
    marginBottom: 15,
  },

  photoArea: {
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.gray,
    borderWidth: 1,
    borderColor: colors.border,
  },

  photoPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraIcon: {
    fontSize: 45,
    marginBottom: 10,
  },

  photoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  photoSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 5,
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 7,
    marginTop: 15,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    fontSize: 15,
    color: colors.text,
  },

  textArea: {
    height: 100,
    paddingTop: 15,
  },

  optionsRow: {
    flexDirection: "row",
    gap: 10,
  },

  option: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  optionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  optionText: {
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 13,
  },

  optionTextActive: {
    color: colors.black,
    fontWeight: "700",
  },

  locationHeader: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  locationIcon: {
    fontSize: 25,
    marginRight: 10,
  },

  locationInfo: {
    flex: 1,
  },

  locationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  locationText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },

  refreshText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
  },

  mapContainer: {
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 15,
  },

  map: {
    flex: 1,
  },

  mapLoading: {
    flex: 1,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "800",
  },

});