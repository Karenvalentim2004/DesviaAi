import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { listarBuracos } from "@/database/buracoRepository";
import { colors } from "@/theme/colors";

export default function Home({ navigation }: any) {

    const [buracos, setBuracos] = useState<any[]>([]);

    function carregarBuracos() {
        const resultado = listarBuracos();

        setBuracos(resultado);
    }

    useFocusEffect(
        useCallback(() => {
            carregarBuracos();
        }, [])
    );

    function abrirDetalhes(id: number) {
        navigation.navigate(
            "DetalhesBuraco",
            { id }
        );
    }

    return (
        <View style= { styles.container } >

        {/* HEADER */ }

        < View style = { styles.header } >

            <View>
            <Text style={ styles.greeting }>
                Olá! 👋
    </Text>

        < Text style = { styles.title } >
            DesviaAi
                </Text>
                </View>

                < View style = { styles.notification } >
                    <Text style={ styles.notificationText }>
                        🔔
    </Text>
        </View>

        </View>

    {/* SUBTÍTULO */ }

    <Text style={ styles.subtitle }>
        Ajude a identificar problemas
                nas ruas da nossa cidade.
            </Text>

    {/* BOTÃO CADASTRAR */ }

    <TouchableOpacity
                style={ styles.addButton }
    onPress = {() =>
    navigation.navigate(
        "CadastroBuraco"
    )
}
            >

    <Text style={ styles.addIcon }>
        +
        </Text>

        < View >
        <Text style={ styles.addTitle }>
            Registrar um buraco
                </Text>

                < Text style = { styles.addSubtitle } >
                    Ajude a melhorar nossa cidade
                        </Text>
                        </View>

                        </TouchableOpacity>

{/* TÍTULO DA LISTA */ }

<View style={ styles.sectionHeader }>

    <Text style={ styles.sectionTitle }>
        Buracos registrados
            </Text>

            < Text style = { styles.counter } >
                { buracos.length }
                </Text>

                </View>

{/* LISTA */ }

<FlatList
                data={ buracos }
keyExtractor = {(item) =>
item.id.toString()
                }
showsVerticalScrollIndicator = { false}
contentContainerStyle = {
    styles.list
}
renderItem = {({ item }) => (
    <TouchableOpacity
                        style= { styles.card }
onPress = {() =>
abrirDetalhes(item.id)
                        }
                    >

    {/* FOTO */ }

    < View style = { styles.imageContainer } >

    {
        item.foto ? (
            <Image
                                    source= {{
    uri: item.foto,
                                    }}
style = { styles.image }
    />
                            ) : (
    <View
                                    style= {
        styles.noImage
    }
    >
    <Text
                                        style={
    styles.noImageText
}
                                    >
                                        🕳️
</Text>
    </View>
                            )}

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
    item.status ||
        "Aberto"
}
    </Text>
    </View>

    </View>

{/* INFORMAÇÕES */ }

<View style={ styles.cardContent }>

    <Text
                                style={ styles.cardTitle }
numberOfLines = { 1}
    >
    { item.titulo }
    </Text>

    < Text
style = {
    styles.location
}
numberOfLines = { 2}
    >
                                📍 { item.endereco }
</Text>

    < View
style = {
    styles.cardFooter
}
    >

    <Text
                                    style={
    styles.user
}
numberOfLines = { 1}
    >
                                    👤 { item.usuario_nome }
</Text>

    < Text
style = {
    styles.arrow
}
    >
                                    ›
</Text>

    </View>

    </View>

    </TouchableOpacity>
                )}
ListEmptyComponent = {
                    < View
style = {
    styles.emptyContainer
}
    >
    <Text
                            style={
    styles.emptyIcon
}
                        >
                            🕳️
</Text>

    < Text
style = {
    styles.emptyTitle
}
    >
    Nenhum buraco registrado
        </Text>

        < Text
style = {
    styles.emptyText
}
    >
    Seja o primeiro a registrar
                            um problema na sua cidade.
                        </Text>
    </View>
                }
            />

    </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 55,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greeting: {
        fontSize: 15,
        color: colors.textSecondary,
        marginBottom: 4,
    },

    title: {
        fontSize: 25,
        fontWeight: "800",
        color: colors.text,
    },

    notification: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
    },

    notificationText: {
        fontSize: 20,
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
        marginBottom: 20,
    },

    addButton: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },

    addIcon: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: colors.white,
        textAlign: "center",
        lineHeight: 42,
        fontSize: 30,
        fontWeight: "400",
        color: colors.black,
        marginRight: 13,
    },

    addTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: colors.black,
    },

    addSubtitle: {
        fontSize: 12,
        color: colors.text,
        marginTop: 3,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
    },

    counter: {
        marginLeft: 8,
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.gray,
        textAlign: "center",
        lineHeight: 24,
        fontSize: 12,
        color: colors.textSecondary,
    },

    list: {
        paddingBottom: 30,
    },

    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },

    imageContainer: {
        height: 170,
        position: "relative",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    noImage: {
        flex: 1,
        backgroundColor: colors.gray,
        justifyContent: "center",
        alignItems: "center",
    },

    noImageText: {
        fontSize: 50,
    },

    status: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusText: {
        fontSize: 11,
        fontWeight: "700",
        color: colors.black,
    },

    cardContent: {
        padding: 15,
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 8,
    },

    location: {
        fontSize: 13,
        color: colors.textSecondary,
        lineHeight: 19,
    },

    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },

    user: {
        flex: 1,
        fontSize: 12,
        color: colors.textSecondary,
    },

    arrow: {
        fontSize: 26,
        color: colors.textSecondary,
    },

    emptyContainer: {
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 30,
    },

    emptyIcon: {
        fontSize: 50,
        marginBottom: 15,
    },

    emptyTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 8,
    },

    emptyText: {
        textAlign: "center",
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },

});