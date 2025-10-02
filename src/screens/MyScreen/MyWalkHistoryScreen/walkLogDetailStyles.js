import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4e7fff",
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        backgroundColor: "#4e7fff",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
    },
    content: {
        flex: 1,
        backgroundColor: "#f8f9fb",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    cardInner: {
        marginLeft: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#202124",
        marginBottom: 4,
    },
    cardText: {
        fontSize: 14,
        color: "#5f6368",
    },
    sectionHeader: {
        marginBottom: 8,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#202124",
    },
    emergencyCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: "#e53935",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    emergencyTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    emergencyText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 4,
    },
    emergencyDate: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
});
