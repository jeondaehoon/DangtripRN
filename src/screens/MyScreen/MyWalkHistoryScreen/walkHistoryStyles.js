import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4e7fff", // SafeArea 전체 배경을 파란색
    },
    header: {
        paddingTop: 20,
        paddingBottom: 16,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    listWrapper: {
        flex: 1,
        backgroundColor: "#f8f9fb", // 리스트 영역은 회색으로 덮음
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
    },
    listContainer: {
        paddingVertical: 12,
    },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 14,
        padding: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardContent: {
        flex: 1,
        marginLeft: 12,
    },
    dateText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#202124",
    },
    detailText: {
        fontSize: 13,
        color: "#5f6368",
        marginTop: 2,
    },
});
