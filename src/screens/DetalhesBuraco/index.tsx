import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import {
  buscarBuraco,
} from "@/database/buracoRepository";

import { colors } from "@/theme/colors";

export default function DetalhesBuraco({
  route,
  navigation,
}: any) {

  const { id } = route.params;

  const [buraco, setBuraco] =
    useState<any>(null);

  useEffect(() => {
    const resultado =
      buscarBuraco(id);

    setBuraco(resultado);
  }, [id]);

  if (!buraco) {
    return (
      <View style={styles.loading}>
        <Text>
          Buraco não encontrado.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={styles.backButton}
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

      {/* FOTO / GALERIA */}

      <View style={styles.photoContainer}>

        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoIcon}>
            🕳️
          </Text>

          <Text style={styles.photoText}>
            Fotos do buraco
          </Text>
        </View>

      </View>

      {/* CONTEÚDO */}

      <View style={styles.content}>

        <View style={styles.titleRow}>

          <View style={styles.titleContainer}>

            <Text style={styles.title}>
              {buraco.titulo}
            </Text>

            <Text
              style={styles.location}
            >
              📍 {buraco.endereco}
            </Text>

          </View>

          <View style={styles.status}>
            <Text style={styles.statusText}>
              {buraco.status}
            </Text>
          </View>

        </View>

        {/* INFORMAÇÕES */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Informações
          </Text>

          <InfoRow
            label="Cadastrado por"
            value={
              buraco.usuario_nome
            }
          />

          <InfoRow
            label="Data"
            value={
              formatarData(
                buraco.criado_em
              )
            }
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

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Descrição
          </Text>

          <Text style={styles.description}>
            {buraco.descricao ||
              "Nenhuma descrição informada."}
          </Text>

        </View>

        {/* LOCALIZAÇÃO */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Localização
          </Text>

          <Text style={styles.description}>
            {buraco.bairro}
            {"\n"}
            {buraco.cidade}
          </Text>

          <TouchableOpacity
            style={styles.mapButton}
          >
            <Text
              style={
                styles.mapButtonText
              }
            >
              📍 Ver no mapa
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </ScrollView>
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

function formatarData(data: string) {

  if (!data) {
    return "Não informado";
  }

  return new Date(data).toLocaleString(
    "pt-BR"
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  header: {
    height: 90,
    paddingHorizontal: 20,
    paddingTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 35,
    color: colors.text,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },

  headerSpace: {
    width: 40,
  },

  photoContainer: {
    height: 260,
    paddingHorizontal: 16,
  },

  photoPlaceholder: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },

  photoIcon: {
    fontSize: 65,
    marginBottom: 10,
  },

  photoText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  content: {
    padding: 20,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  titleContainer: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },

  location: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },

  status: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: colors.black,
    fontSize: 11,
    fontWeight: "700",
  },

  section: {
    marginTop: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  infoLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  infoValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    maxWidth: "55%",
    textAlign: "right",
  },

  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },

  mapButton: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  mapButtonText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "700",
  },

});