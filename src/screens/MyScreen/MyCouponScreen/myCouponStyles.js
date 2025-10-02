import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4e7fff", // 상단 파란 배경
    },
    header: {
        backgroundColor: "#4e7fff",
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    contentWrapper: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        marginTop: 10, // ✅ 흰색 영역을 아래로 더 늘려 보이게
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 12,
        marginBottom: 12,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        marginHorizontal: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
    },
    cardDate: {
        fontSize: 13,
        color: "#666",
    },
    cardUsed: {
        opacity: 0.6,
    },
    cardActive: {
        opacity: 1,
    },
    statusBar: (used) => ({
        width: 6,
        height: "100%",
        backgroundColor: used ? "#ff4d4d" : "#4e7fff",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        marginRight: 12,
    }),
});

export default styles;
