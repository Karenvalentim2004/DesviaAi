import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

import { criarUsuario } from "@/database/usuarioRepository";
import { colors } from "@/theme/colors";

export default function Cadastro({ navigation }: any) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    function cadastrar() {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert(
                "Atenção",
                "Preencha todos os campos."
            );
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert(
                "Atenção",
                "As senhas não são iguais."
            );
            return;
        }

        try {
            criarUsuario(
                nome,
                email,
                senha
            );

            Alert.alert(
                "Cadastro realizado!",
                "Sua conta foi criada com sucesso.",
                [
                    {
                        text: "Entrar",
                        onPress: () =>
                            navigation.navigate("Login"),
                    },
                ]
            );
        } catch (error) {
            Alert.alert(
                "Erro",
                "Este e-mail já pode estar cadastrado."
            );
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Text style={styles.voltar}>
                        ← Voltar
                    </Text>
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>
                        Criar conta
                    </Text>

                    <Text style={styles.subtitle}>
                        Cadastre-se para ajudar a registrar
                        os problemas da cidade.
                    </Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>
                        Nome
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Seu nome"
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        value={nome}
                        onChangeText={setNome}
                    />

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
                        placeholder="Crie uma senha"
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        secureTextEntry
                        value={senha}
                        onChangeText={setSenha}
                    />

                    <Text style={styles.label}>
                        Confirmar senha
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite a senha novamente"
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        secureTextEntry
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={cadastrar}
                    >
                        <Text style={styles.buttonText}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.loginArea}>
                    <Text style={styles.loginText}>
                        Já possui uma conta?
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Login")
                        }
                    >
                        <Text style={styles.loginLink}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    content: {
        flexGrow: 1,
        padding: 24,
        paddingTop: 60,
    },

    voltar: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 40,
    },

    header: {
        marginBottom: 35,
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: colors.textSecondary,
        lineHeight: 22,
    },

    form: {
        gap: 8,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text,
        marginTop: 8,
    },

    input: {
        height: 52,
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
        marginTop: 24,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.black,
    },

    loginArea: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        gap: 5,
    },

    loginText: {
        color: colors.textSecondary,
        fontSize: 14,
    },

    loginLink: {
        color: colors.text,
        fontWeight: "700",
        fontSize: 14,
    },
});