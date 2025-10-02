import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 12,
        color: "#000",
    },
    body: {
        padding: 20,
    },
    noticeBox: {
        marginBottom: 20,
    },
    noticeMain: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
        color: "#000",
    },
    noticeBlue: {
        fontSize: 13,
        color: "#4e7fff",
        marginBottom: 2,
    },
    noticeRed: {
        fontSize: 13,
        color: "#e53935",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
        color: "#000",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        marginBottom: 20,
    },
    birthRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    birthPicker: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginHorizontal: 4,
    },
    disabledBox: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#f5f5f5",
        marginBottom: 20,
    },
    disabledText: {
        fontSize: 14,
        color: "#555",
    },
    saveBtn: {
        backgroundColor: "#4e7fff",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 10,
    },
    saveBtnText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});
