import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4e7fff",
    },

    header: {
        paddingVertical: 16,
        alignItems: "center",
        backgroundColor: "#4e7fff",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },

    contentWrapper: {
        flex: 1,
        backgroundColor: "#f8f9fb",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        marginTop: 10,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#202124",
        marginBottom: 12,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        color: "#555",
    },
    value: {
        fontSize: 14,
        color: "#111",
        fontWeight: "600",
        textAlign: "right",
        flexShrink: 1,
    },
});
