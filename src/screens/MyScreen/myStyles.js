import { StyleSheet } from "react-native";

export default StyleSheet.create({
    hero: {
        backgroundColor: "#4e7fff",
        padding: 24,
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 14,
        backgroundColor: "#fff",
    },
    profileName: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },
    profileEmail: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 13,
        marginTop: 2,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: 18,
    },
    sectionHeader: {
        marginTop: 18,
        marginBottom: 6,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#202124",
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#fff",
        marginBottom: 6,
        borderRadius: 12,
        marginHorizontal: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    cardLabel: {
        marginLeft: 10,
        fontSize: 14,
        color: "#111",
        fontWeight: "600",
    },
});
