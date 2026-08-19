import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({

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

    counterText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "700",
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