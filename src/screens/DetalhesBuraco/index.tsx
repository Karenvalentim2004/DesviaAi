import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import MapView, {
  Marker,
} from "react-native-maps";

import {
  buscarBuraco,
  listarMidias,
  Midia,
} from "@/database/buracoRepository";

import { styles } from "./styles";

export default function DetalhesBuraco({
  route,
  navigation,
}: any) {
  const { id } = route.params;

  const [buraco, setBuraco] =
    useState<any>(null);

  const [midias, setMidias] =
    useState<Midia[]>([]);

  const [paginaAtual, setPaginaAtual] =
    useState(0);

  useEffect(() => {
    carregarDados();
  }, [id]);

  function carregarDados() {
    const resultado =
      buscarBuraco(id);

    const midiasResultado =
      listarMidias(id);

    setBuraco(resultado);
    setMidias(midiasResultado);
  }

  if (!buraco) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Buraco não encontrado.
        </Text>
      </View>
    );
  }

  function formatarData(data: string) {
    if (!data) {
      return "Não informado";
    }

    return new Date(data).toLocaleDateString(
      "pt-BR"
    );
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text style={styles.backText}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Detalhes do buraco
        </Text>

        <View style={styles.headerSpace} />

      </View>

      <FlatList
        data={[buraco]}
        keyExtractor={() =>
          buraco.id.toString()
        }
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View>

            {/* CARROSSEL */}

            <View style={styles.carousel}>

              {midias.length > 0 ? (

                <FlatList
                  data={midias}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={
                    false
                  }
                  keyExtractor={(item) =>
                    item.id.toString()
                  }
                  onMomentumScrollEnd={(
                    event
                  ) => {
                    const index =
                      Math.round(
                        event
                          .nativeEvent
                          .contentOffset
                          .x /
                        event
                          .nativeEvent
                          .layoutMeasurement
                          .width
                      );

                    setPaginaAtual(
                      index
                    );
                  }}
                  renderItem={({
                    item,
                  }) => (
                    <View
                      style={
                        styles.mediaItem
                      }
                    >

                      {item.tipo ===
                        "video" ? (
                        <VideoItem
                          uri={
                            item.uri
                          }
                        />
                      ) : (
                        <Image
                          source={{
                            uri: item.uri,
                          }}
                          style={
                            styles.media
                          }
                        />
                      )}

                    </View>
                  )}
                />

              ) : (

                <View
                  style={
                    styles.noMedia
                  }
                >
                  <Text
                    style={
                      styles.noMediaIcon
                    }
                  >
                    🕳️
                  </Text>

                  <Text
                    style={
                      styles.noMediaText
                    }
                  >
                    Nenhuma foto
                    cadastrada
                  </Text>
                </View>

              )}

              {/* CONTADOR */}

              {midias.length > 0 && (
                <View
                  style={
                    styles.mediaCounter
                  }
                >
                  <Text
                    style={
                      styles.mediaCounterText
                    }
                  >
                    {paginaAtual + 1}
                    /
                    {midias.length}
                  </Text>
                </View>
              )}

            </View>

            {/* INDICADORES */}

            {midias.length > 1 && (
              <View
                style={
                  styles.indicators
                }
              >
                {midias.map(
                  (_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.indicator,
                        index ===
                        paginaAtual &&
                        styles.indicatorActive,
                      ]}
                    />
                  )
                )}
              </View>
            )}

            {/* CONTEÚDO */}

            <View style={styles.content}>

              <View
                style={
                  styles.titleRow
                }
              >

                <View
                  style={
                    styles.titleContainer
                  }
                >

                  <Text
                    style={
                      styles.title
                    }
                  >
                    {
                      buraco.titulo
                    }
                  </Text>

                  <Text
                    style={
                      styles.location
                    }
                  >
                    📍{" "}
                    {
                      buraco.endereco
                    }
                  </Text>

                </View>

                <View
                  style={
                    styles.status
                  }
                >
                  <Text
                    style={
                      styles.statusText
                    }
                  >
                    {
                      buraco.status
                    }
                  </Text>
                </View>

              </View>

              {/* INFORMAÇÕES */}

              <View
                style={
                  styles.section
                }
              >

                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  Informações
                </Text>

                <InfoRow
                  label="Cadastrado por"
                  value={
                    buraco.usuario_nome ||
                    "Não informado"
                  }
                />

                <InfoRow
                  label="Data"
                  value={formatarData(
                    buraco.criado_em
                  )}
                />

                <InfoRow
                  label="Categoria"
                  value={
                    buraco.categoria ||
                    "Não informado"
                  }
                />

                <InfoRow
                  label="Gravidade"
                  value={
                    buraco.gravidade ||
                    "Não informado"
                  }
                />

              </View>

              {/* DESCRIÇÃO */}

              <View
                style={
                  styles.section
                }
              >

                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  Descrição
                </Text>

                <Text
                  style={
                    styles.description
                  }
                >
                  {
                    buraco.descricao ||
                    "Nenhuma descrição informada."
                  }
                </Text>

              </View>

              {/* LOCALIZAÇÃO */}

              <View
                style={
                  styles.section
                }
              >

                <Text
                  style={
                    styles.sectionTitle
                  }
                >
                  Localização
                </Text>

                <Text
                  style={
                    styles.address
                  }
                >
                  {buraco.endereco}
                  {"\n"}
                  {buraco.bairro}
                  {"\n"}
                  {buraco.cidade}
                </Text>

                {buraco.latitude !==
                  null &&
                  buraco.longitude !==
                  null && (
                    <View
                      style={
                        styles.mapContainer
                      }
                    >

                      <MapView
                        style={
                          styles.map
                        }
                        initialRegion={{
                          latitude:
                            buraco.latitude,
                          longitude:
                            buraco.longitude,
                          latitudeDelta:
                            0.005,
                          longitudeDelta:
                            0.005,
                        }}
                      >

                        <Marker
                          coordinate={{
                            latitude:
                              buraco.latitude,
                            longitude:
                              buraco.longitude,
                          }}
                          title={
                            buraco.titulo
                          }
                        />

                      </MapView>

                    </View>
                  )}

              </View>

            </View>

          </View>
        )}
      />

    </View>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>

      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>

    </View>
  );
}

function VideoItem({
  uri,
}: {
  uri: string;
}) {
  return (
    <View style={styles.videoContainer}>

      <Text style={styles.videoIcon}>
        ▶
      </Text>

      <Text style={styles.videoText}>
        Vídeo
      </Text>

      <Text
        style={styles.videoUri}
        numberOfLines={1}
      >
        {uri}
      </Text>

    </View>
  );
}