import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#4e7fff", // StatusBar까지 파란색
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#4e7fff",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    headerRight: {
        flexDirection: "row",
    },
    headerIcon: {
        marginLeft: 12,
    },
    messageList: {
        padding: 12,
        flexGrow: 1,
        justifyContent: "flex-end",
        backgroundColor: "#f8f9fb",
    },
    messageBubble: {
        maxWidth: "70%",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginBottom: 10,
    },
    myMessage: {
        backgroundColor: "#4e7fff",
        alignSelf: "flex-end",
    },
    otherMessage: {
        backgroundColor: "#e5e5ea",
        alignSelf: "flex-start",
    },
    messageText: {
        fontSize: 15,
        color: "#fff",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 15,
        backgroundColor: "#fff",
    },
    sendButton: {
        backgroundColor: "#4e7fff",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
