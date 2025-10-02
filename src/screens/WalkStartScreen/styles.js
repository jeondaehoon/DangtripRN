import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 60,
    },
    timeContainer: {
        position: "absolute",
        top: 380,
        alignItems: "center",
        width: "100%",
    },
    timeText: {
        fontSize: 64,
        fontWeight: "bold",
        color: "#000",
    },
    label: {
        fontSize: 18,
        marginTop: 8,
        color: "#555",
    },
    adjustRow: {
        flexDirection: "row",
        marginTop: 16,
    },
    adjustBtn: {
        backgroundColor: "#eee",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 12,
    },
    adjustText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
    },
    buttonRow: {
        position: "absolute",
        bottom: 80,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    circleLarge: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#FFD700",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 8,
    },
    circleSmall: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    startText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
    },
    endButtonContainer: {
        position: "absolute",
        bottom: 220,
        width: "100%",
        alignItems: "center",
    },
    endButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#e74c3c",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    endButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
    },

    fabContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    fabActions: {
        position: "absolute",
        bottom: 70, // 메인 FAB 위쪽에 버튼 배치
        alignItems: "center",
    },

});
