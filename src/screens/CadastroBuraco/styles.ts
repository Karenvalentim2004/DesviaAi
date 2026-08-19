import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },

    header: {
        height: 90,
        paddingTop: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    back: {
        fontSize: 36,
        color: colors.text,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
    },

    headerSpace: {
        width: 40,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: colors.text,
        marginTop: 20,
        marginBottom: 15,
    },

    photoCount: {
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.gray,
        textAlign: "center",
        lineHeight: 24,
        marginLeft: 8,
        marginTop: 5,
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "700",
    },

    addPhotoButton: {
        height: 80,
        borderRadius: 14,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
    },

    cameraIcon: {
        fontSize: 32,
        marginRight: 14,
    },

    addPhotoTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.text,
    },

    addPhotoSubtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },

    photosList: {
        marginTop: 15,
    },

    photoItem: {
        width: 130,
        height: 130,
        marginRight: 10,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
    },

    photoPreview: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    removePhoto: {
        position: "absolute",
        top: 7,
        right: 7,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.danger,
        justifyContent: "center",
        alignItems: "center",
    },

    removePhotoText: {
        color: colors.white,
        fontSize: 22,
        lineHeight: 25,
    },

    photoNumber: {
        position: "absolute",
        bottom: 7,
        left: 7,
        minWidth: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
    },

    photoNumberText: {
        color: colors.white,
        fontSize: 11,
        fontWeight: "700",
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 7,
        marginTop: 15,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        fontSize: 15,
        color: colors.text,
    },

    textArea: {
        height: 100,
        paddingTop: 15,
    },

    optionsRow: {
        flexDirection: "row",
        gap: 10,
    },

    option: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
    },

    optionActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    optionText: {
        color: colors.textSecondary,
        fontWeight: "600",
        fontSize: 13,
    },

    optionTextActive: {
        color: colors.black,
        fontWeight: "700",
    },

    locationTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    refreshText: {
        color: colors.primaryDark,
        fontSize: 12,
        fontWeight: "700",
        marginTop: 20,
    },

    locationCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
    },

    locationIcon: {
        fontSize: 25,
        marginRight: 10,
    },

    locationInfo: {
        flex: 1,
    },

    locationTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
    },

    locationText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 3,
    },

    mapContainer: {
        height: 220,
        borderRadius: 16,
        overflow: "hidden",
        marginTop: 15,
    },

    map: {
        flex: 1,
    },

    mapLoading: {
        flex: 1,
        backgroundColor: colors.gray,
        justifyContent: "center",
        alignItems: "center",
    },

    mapLoadingText: {
        color: colors.textSecondary,
        fontSize: 13,
    },

    button: {
        height: 56,
        backgroundColor: colors.primary,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "800",
    },
});