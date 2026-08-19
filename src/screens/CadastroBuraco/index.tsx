import {
  Alert,
  Image,
  ScrollView,
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
} from "react-native-maps";

import {
  adicionarMidia,
  criarBuraco,
} from "@/database/buracoRepository";

import { colors } from "@/theme/colors";
import { styles } from "./styles";

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

  const [fotos, setFotos] =
    useState<string[]>([]);

  const [latitude, setLatitude] =
    useState<number | null>(null);

  const [longitude, setLongitude] =
    useState<number | null>(null);

  const [carregandoLocalizacao, setCarregandoLocalizacao] =
    useState(true);

  const [salvando, setSalvando] =
    useState(false);

  useEffect(() => {
    obterLocalizacao();
  }, []);

  // LOCALIZAÇÃO
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

      // Tenta descobrir o endereço através das coordenadas GPS
      const resultado =
        await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: lng,
        });

      if (resultado.length > 0) {
        const local = resultado[0];

        const enderecoCompleto = [
          local.street,
          local.name,
          local.streetNumber,
        ]
          .filter(Boolean)
          .join(", ");

        setEndereco(
          enderecoCompleto
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

  // CÂMERA
  async function tirarFoto() {
    try {
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
        const uri =
          resultado.assets[0].uri;

        setFotos((anteriores) => [
          ...anteriores,
          uri,
        ]);
      }
    } catch (error) {
      console.log(
        "Erro ao abrir câmera:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível abrir a câmera."
      );
    }
  }

  // GALERIA
  async function escolherGaleria() {
    try {
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

          allowsMultipleSelection: true,

          quality: 0.8,
        });

      if (!resultado.canceled) {
        const novasFotos =
          resultado.assets.map(
            (asset) => asset.uri
          );

        setFotos((anteriores) => [
          ...anteriores,
          ...novasFotos,
        ]);
      }
    } catch (error) {
      console.log(
        "Erro ao abrir galeria:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível abrir a galeria."
      );
    }
  }

  // ESCOLHER COMO ADICIONAR FOTO
  function selecionarFoto() {
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

  // REMOVER FOTO
  function removerFoto(index: number) {
    setFotos((anteriores) =>
      anteriores.filter(
        (_, i) => i !== index
      )
    );
  }

  // CADASTRAR
  function cadastrar() {
    if (!titulo.trim()) {
      Alert.alert(
        "Atenção",
        "Informe um título para o problema."
      );

      return;
    }

    if (!descricao.trim()) {
      Alert.alert(
        "Atenção",
        "Informe uma descrição do problema."
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

    if (fotos.length === 0) {
      Alert.alert(
        "Atenção",
        "Adicione pelo menos uma foto do buraco."
      );

      return;
    }

    try {
      setSalvando(true);

      const buracoId =
        criarBuraco(
          1,
          titulo.trim(),
          descricao.trim(),
          endereco.trim(),
          bairro.trim(),
          cidade.trim(),
          latitude,
          longitude,
          categoria,
          gravidade
        );

      // Salva todas as fotos
      fotos.forEach((uri) => {
        adicionarMidia(
          Number(buracoId),
          uri,
          "imagem"
        );
      });

      Alert.alert(
        "Buraco registrado!",
        "O problema foi cadastrado com sucesso.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      console.log(
        "Erro ao cadastrar buraco:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o buraco."
      );
    } finally {
      setSalvando(false);
    }
  }

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
          style={styles.backButton}
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

      {/* FOTOS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Fotos do problema
        </Text>

        <Text style={styles.photoCount}>
          {fotos.length}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addPhotoButton}
        onPress={selecionarFoto}
      >
        <Text style={styles.cameraIcon}>
          📷
        </Text>

        <View>
          <Text style={styles.addPhotoTitle}>
            Adicionar foto
          </Text>

          <Text
            style={
              styles.addPhotoSubtitle
            }
          >
            Câmera ou galeria
          </Text>
        </View>
      </TouchableOpacity>

      {/* FOTOS ADICIONADAS */}

      {fotos.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={styles.photosList}
        >
          {fotos.map(
            (uri, index) => (
              <View
                key={`${uri}-${index}`}
                style={
                  styles.photoItem
                }
              >
                <Image
                  source={{
                    uri,
                  }}
                  style={
                    styles.photoPreview
                  }
                />

                <TouchableOpacity
                  style={
                    styles.removePhoto
                  }
                  onPress={() =>
                    removerFoto(
                      index
                    )
                  }
                >
                  <Text
                    style={
                      styles.removePhotoText
                    }
                  >
                    ×
                  </Text>
                </TouchableOpacity>

                <View
                  style={
                    styles.photoNumber
                  }
                >
                  <Text
                    style={
                      styles.photoNumberText
                    }
                  >
                    {index + 1}
                  </Text>
                </View>
              </View>
            )
          )}
        </ScrollView>
      )}

      {/* INFORMAÇÕES */}
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
      <View style={styles.locationTitleRow}>
        <Text style={styles.sectionTitle}>
          Localização
        </Text>

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

      <View style={styles.locationCard}>
        <Text style={styles.locationIcon}>
          📍
        </Text>

        <View
          style={styles.locationInfo}
        >
          <Text
            style={
              styles.locationTitle
            }
          >
            Localização atual
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
      </View>

      {/* MAPA */}
      <View style={styles.mapContainer}>
        {latitude !== null &&
          longitude !== null ? (
          <MapView
            style={styles.map}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
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
            <Text
              style={
                styles.mapLoadingText
              }
            >
              📍 Obtendo localização...
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


      {/* BOTÃO CADASTRAR */}
      <TouchableOpacity
        style={[
          styles.button,
          salvando &&
          styles.buttonDisabled,
        ]}
        onPress={cadastrar}
        disabled={salvando}
      >
        <Text style={styles.buttonText}>
          {salvando
            ? "Cadastrando..."
            : "Cadastrar buraco"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}