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
import { styles } from "./styles";

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