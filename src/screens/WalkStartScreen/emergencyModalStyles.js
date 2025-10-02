import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        maxHeight: height * 0.85,
        minHeight: height * 0.4,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    navBtn: {
        fontSize: 14,
        fontWeight: "600",
        color: "#3498db",
    },
    stepBody: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2c3e50",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#34495e",
        marginBottom: 15,
        textAlign: "center",
    },
    description: {
        fontSize: 15,
        color: "#555",
        textAlign: "center",
        marginBottom: 15,
        lineHeight: 22,
    },
    search: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        fontSize: 15,
    },
    symptomCard: {
        width: "100%",
        padding: 15,
        backgroundColor: "#f8f9f9",
        borderRadius: 10,
        marginVertical: 6,
    },
    symptomText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#2c3e50",
    },
    emptyText: {
        color: "#888",
        fontSize: 14,
        marginBottom: 15,
    },
    footer: {
        marginTop: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        backgroundColor: "#3498db",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 120,
        height: 48,   // ✅ 버튼 높이 고정
    },
    buttonSecondary: {
        backgroundColor: "#95a5a6",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        textAlign: "center",
    },
});
