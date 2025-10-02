import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./walkLogDetailStyles";

export default function WalkLogDetailScreen({ route }) {
    const { walkId, token } = route.params;
    const [walk, setWalk] = useState(null);

    const BASE_URL = Platform.OS === "android"
        ? "http://192.168.45.62:8080"
        : "http://localhost:8080";

    useEffect(() => {
        const fetchWalkDetail = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/walklog/detail/${walkId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setWalk(response.data);
            } catch (error) {
                console.error("산책 상세 불러오기 실패:", error);
            }
        };
        fetchWalkDetail();
    }, [walkId, token]);

    if (!walk) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>산책 상세 기록</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>불러오는 중...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>산책 상세 기록</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* 시작 시간 */}
                <View style={styles.card}>
                    <Ionicons name="time-outline" size={22} color="#4e7fff" />
                    <View style={styles.cardInner}>
                        <Text style={styles.cardTitle}>시작 시간</Text>
                        <Text style={styles.cardText}>{walk.startTime}</Text>
                    </View>
                </View>

                {/* 종료 시간 */}
                <View style={styles.card}>
                    <Ionicons name="alarm-outline" size={22} color="#4e7fff" />
                    <View style={styles.cardInner}>
                        <Text style={styles.cardTitle}>종료 시간</Text>
                        <Text style={styles.cardText}>{walk.endTime}</Text>
                    </View>
                </View>

                {/* 소요 시간 */}
                <View style={styles.card}>
                    <Ionicons name="hourglass-outline" size={22} color="#4e7fff" />
                    <View style={styles.cardInner}>
                        <Text style={styles.cardTitle}>소요 시간</Text>
                        <Text style={styles.cardText}>{walk.duration}분</Text>
                    </View>
                </View>

                {/* 응급 상황 */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>응급 상황 기록</Text>
                </View>

                {walk.emergency && walk.emergency.length > 0 ? (
                    walk.emergency.map((e, idx) => (
                        <View key={idx} style={styles.emergencyCard}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                                <Ionicons
                                    name="alert-circle-outline"
                                    size={22}
                                    color={e.severity === "위급" ? "#e53935" : "#ff9800"}
                                    style={{ marginRight: 8 }}
                                />
                                <Text
                                    style={[
                                        styles.emergencyTitle,
                                        { color: e.severity === "위급" ? "#d32f2f" : "#ef6c00" },
                                    ]}
                                >
                                    {e.symptomName} ({e.severity})
                                </Text>
                            </View>
                            {e.description && <Text style={styles.emergencyText}>설명: {e.description}</Text>}
                            <Text style={styles.emergencyDate}>{e.recordedAt}</Text>
                        </View>
                    ))
                ) : (
                    <View style={styles.card}>
                        <Ionicons name="alert-circle-outline" size={22} color="#9aa0a6" />
                        <View style={styles.cardInner}>
                            <Text style={styles.cardTitle}>응급 상황 기록</Text>
                            <Text style={styles.cardText}>없음</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
