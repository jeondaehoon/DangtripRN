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
        fontWeight: "600",
        marginLeft: 12,
        color: "#000",
    },
    body: {
        padding: 20,
    },
    noticeBox: {
        marginBottom: 24,
    },
    noticeMain: {
        fontSize: 15,
        color: "#333",
        marginBottom: 8,
    },
    noticeBlue: {
        fontSize: 13,
        color: "#4e7fff",
        marginBottom: 4,
    },
    noticeRed: {
        fontSize: 13,
        color: "#e53935",
    },
    label: {
        fontSize: 14,
        color: "#777",
        marginBottom: 6,
    },
    disabledBox: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 14,
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
    },
    disabledText: {
        fontSize: 16,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        marginBottom: 20,
    },
    stackedBox: {
        marginBottom: 20,
    },
    inputTight: {
        marginBottom: 0, // 붙여서 간격 제거
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        borderRadius: 0,
    },
    matchText: {
        color: "#4e7fff", // 파란색
        fontSize: 13,
        marginTop: 6,
    },
    mismatchText: {
        color: "#e53935", // 빨간색
        fontSize: 13,
        marginTop: 6,
    },
    saveBtn: {
        backgroundColor: "#4e7fff",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    saveBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
