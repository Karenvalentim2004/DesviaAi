import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
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