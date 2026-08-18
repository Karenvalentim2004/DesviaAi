import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

import { buscarUsuario } from "@/database/usuarioRepository";
import { colors } from "@/theme/colors";

export default function Login({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function entrar() {
        if (!email || !senha) {
            Alert.alert(
                "Atenção",
                "Digite seu e-mail e senha."
            );

            return;
        }

        const usuario = buscarUsuario(
            email,
            senha
        );

        if (!usuario) {
            Alert.alert(
                "Erro",
                "E-mail ou senha incorretos."
            );

            return;
        }

        navigation.replace("Home");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.icon}>
                    ⚠
                </Text>

                <Text style={styles.title}>
                    DesviaAi
                </Text>

                <Text style={styles.subtitle}>
                    Ajude a tornar nossa cidade
                    melhor para todos.
                </Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>
                    E-mail
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="seu@email.com"
                    placeholderTextColor={
                        colors.textSecondary
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>
                    Senha
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Sua senha"
                    placeholderTextColor={
                        colors.textSecondary
                    }
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={entrar}
                >
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </TouchableOpacity>

                <View style={styles.cadastroArea}>
                    <Text style={styles.cadastroText}>
                        Ainda não possui uma conta?
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Cadastro")
                        }
                    >
                        <Text style={styles.cadastroLink}>
                            Criar conta
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 24,
        justifyContent: "center",
    },

    header: {
        alignItems: "center",
        marginBottom: 45,
    },

    icon: {
        fontSize: 60,
        color: colors.primary,
        marginBottom: 15,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.text,
    },

    subtitle: {
        marginTop: 10,
        textAlign: "center",
        color: colors.textSecondary,
        fontSize: 15,
        lineHeight: 21,
    },

    form: {
        width: "100%",
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 7,
        marginTop: 12,
    },

    input: {
        height: 54,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.white,
    },

    button: {
        height: 54,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
    },

    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "700",
    },

    cadastroArea: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
        gap: 5,
    },

    cadastroText: {
        color: colors.textSecondary,
    },

    cadastroLink: {
        fontWeight: "700",
        color: colors.text,
    },
});