import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { listarBuracos } from "@/database/buracoRepository";

import { styles } from "./styles";

export default function Home({ navigation }: any) {
    const [buracos, setBuracos] = useState<any[]>([]);

    const carregarBuracos = useCallback(() => {
        try {
            const resultado = listarBuracos();
            setBuracos(resultado);
        } catch (error) {
            console.log("Erro ao carregar buracos:", error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarBuracos();
        }, [carregarBuracos])
    );

    function abrirDetalhes(id: number) {
        navigation.navigate("DetalhesBuraco", {
            id: id,
        });
    }

    function abrirCadastro() {
        navigation.navigate("CadastroBuraco");
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>
                        Olá! 👋
                    </Text>

                    <Text style={styles.title}>
                        DesviaAi
                    </Text>
                </View>

                <View style={styles.notification}>
                    <Text style={styles.notificationText}>
                        🔔
                    </Text>
                </View>
            </View>

            <Text style={styles.subtitle}>
                Ajude a identificar problemas
                nas ruas da nossa cidade.
            </Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={abrirCadastro}
                activeOpacity={0.8}
            >
                <Text style={styles.addIcon}>
                    +
                </Text>

                <View>
                    <Text style={styles.addTitle}>
                        Registrar um buraco
                    </Text>

                    <Text style={styles.addSubtitle}>
                        Ajude a melhorar nossa cidade
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    Buracos registrados
                </Text>

                <View style={styles.counter}>
                    <Text style={styles.counterText}>
                        {buracos.length}
                    </Text>
                </View>
            </View>

            <FlatList
                data={buracos}
                keyExtractor={(item) =>
                    String(item.id)
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            abrirDetalhes(item.id)
                        }
                        activeOpacity={0.8}
                    >
                        <View style={styles.imageContainer}>

                            {item.foto ? (
                                <Image
                                    source={{
                                        uri: item.foto,
                                    }}
                                    style={styles.image}
                                />
                            ) : (
                                <View style={styles.noImage}>
                                    <Text style={styles.noImageText}>
                                        🕳️
                                    </Text>
                                </View>
                            )}

                            <View style={styles.status}>
                                <Text style={styles.statusText}>
                                    {item.status || "Aberto"}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.cardContent}>
                            <Text
                                style={styles.cardTitle}
                                numberOfLines={1}
                            >
                                {item.titulo}
                            </Text>

                            <Text
                                style={styles.location}
                                numberOfLines={2}
                            >
                                📍 {item.endereco || "Localização não informada"}
                            </Text>

                            <View style={styles.cardFooter}>
                                <Text
                                    style={styles.user}
                                    numberOfLines={1}
                                >
                                    👤 {item.usuario_nome || "Usuário"}
                                </Text>

                                <Text style={styles.arrow}>
                                    ›
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>
                            🕳️
                        </Text>

                        <Text style={styles.emptyTitle}>
                            Nenhum buraco registrado
                        </Text>

                        <Text style={styles.emptyText}>
                            Seja o primeiro a registrar
                            um problema na sua cidade.
                        </Text>
                    </View>
                }
            />

        </View>
    );
}