import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({

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

    loadingText: {
        color: colors.textSecondary,
        fontSize: 15,
    },

    header: {
        height: 90,
        paddingHorizontal: 20,
        paddingTop: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.white,
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    backText: {
        fontSize: 36,
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

    carousel: {
        height: 270,
        position: "relative",
        backgroundColor: colors.gray,
    },

    mediaItem: {
        width: 392,
        height: 270,
    },

    media: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    noMedia: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    noMediaIcon: {
        fontSize: 65,
        marginBottom: 10,
    },

    noMediaText: {
        color: colors.textSecondary,
        fontSize: 14,
    },

    mediaCounter: {
        position: "absolute",
        right: 15,
        bottom: 15,
        backgroundColor: "rgba(0,0,0,0.65)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    mediaCounterText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "700",
    },

    indicators: {
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },

    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.border,
    },

    indicatorActive: {
        width: 18,
        backgroundColor: colors.primary,
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

    address: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 15,
    },

    mapContainer: {
        height: 220,
        borderRadius: 16,
        overflow: "hidden",
    },

    map: {
        flex: 1,
    },

    videoContainer: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    videoIcon: {
        width: 65,
        height: 65,
        borderRadius: 33,
        backgroundColor: colors.primary,
        color: colors.black,
        textAlign: "center",
        lineHeight: 65,
        fontSize: 25,
        paddingLeft: 4,
    },

    videoText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "700",
        marginTop: 12,
    },

    videoUri: {
        color: colors.textSecondary,
        fontSize: 10,
        marginTop: 5,
        maxWidth: "80%",
    },

});