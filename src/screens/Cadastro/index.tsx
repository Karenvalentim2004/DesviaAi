import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

import {
    criarUsuario,
    buscarUsuarioPorEmail,
} from "@/database/usuarioRepository";

import { colors } from "@/theme/colors";
import { styles } from "./styles";

export default function Cadastro({ navigation }: any) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    function cadastrar() {

        if (
            !nome.trim() ||
            !email.trim() ||
            !senha ||
            !confirmarSenha
        ) {
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

        if (senha.length < 6) {
            Alert.alert(
                "Atenção",
                "A senha deve ter pelo menos 6 caracteres."
            );

            return;
        }

        const emailFormatado =
            email.trim().toLowerCase();

        const usuarioExistente =
            buscarUsuarioPorEmail(
                emailFormatado
            );

        if (usuarioExistente) {
            Alert.alert(
                "Atenção",
                "Este e-mail já está cadastrado."
            );

            return;
        }

        try {

            criarUsuario(
                nome.trim(),
                emailFormatado,
                senha
            );

            Alert.alert(
                "Cadastro realizado!",
                "Sua conta foi criada com sucesso.",
                [
                    {
                        text: "Entrar",
                        onPress: () =>
                            navigation.navigate(
                                "Login"
                            ),
                    },
                ]
            );

            // Limpa os campos
            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");

        } catch (error) {

            console.log(
                "Erro ao cadastrar usuário:",
                error
            );

            Alert.alert(
                "Erro",
                "Não foi possível realizar o cadastro."
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
                contentContainerStyle={
                    styles.content
                }
                keyboardShouldPersistTaps="handled"
            >

                {/* VOLTAR */}

                <TouchableOpacity
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Text style={styles.voltar}>
                        ← Voltar
                    </Text>
                </TouchableOpacity>

                {/* HEADER */}

                <View style={styles.header}>

                    <Text style={styles.title}>
                        Criar conta
                    </Text>

                    <Text style={styles.subtitle}>
                        Cadastre-se para ajudar a registrar
                        os problemas da cidade.
                    </Text>

                </View>

                {/* FORMULÁRIO */}

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
                        autoCapitalize="words"
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
                        autoCorrect={false}
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
                        onChangeText={
                            setConfirmarSenha
                        }
                    />

                    {/* BOTÃO */}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={cadastrar}
                    >
                        <Text style={styles.buttonText}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* LOGIN */}

                <View style={styles.loginArea}>

                    <Text style={styles.loginText}>
                        Já possui uma conta?
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(
                                "Login"
                            )
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