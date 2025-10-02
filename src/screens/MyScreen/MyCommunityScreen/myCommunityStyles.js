// myCommunityStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4e7fff", // 상단 파란색
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
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: 8,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
    },
    tabActive: {
        borderBottomWidth: 3,
        borderBottomColor: "#4e7fff",
    },
    tabText: {
        fontSize: 15,
        color: "#5f6368",
        fontWeight: "500",
    },
    tabTextActive: {
        color: "#4e7fff",
        fontWeight: "700",
    },
    contentWrapper: {
        flex: 1,
        backgroundColor: "#fff", // 흰색이 끝까지
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        marginHorizontal: 1,
        marginTop: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#202124",
        marginBottom: 4,
    },
    cardPreview: {
        fontSize: 14,
        color: "#5f6368",
    },
    cardSub: {
        fontSize: 13,
        color: "#9aa0a6",
        marginTop: 2,
    },
    cardDate: {
        fontSize: 12,
        color: "#9aa0a6",
        marginTop: 6,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },
    footerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    footerText: {
        fontSize: 13,
        color: "#5f6368",
        marginLeft: 4,
    },
});
