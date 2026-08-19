import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
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