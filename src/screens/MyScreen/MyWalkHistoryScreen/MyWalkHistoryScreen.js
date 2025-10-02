import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./walkHistoryStyles";
import axios from "axios";

export default function MyWalkHistoryScreen({ navigation, route }) {
    const { userId, token } = route.params;
    const [walks, setWalks] = useState([]);

    const BASE_URL = Platform.OS === "android"
        ? "http://192.168.45.62:8080"
        : "http://localhost:8080";

    useEffect(() => {
        const fetchWalks = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/walklog/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setWalks(response.data);
            } catch (error) {
                console.error("산책 기록 불러오기 실패:", error);
            }
        };
        fetchWalks();
    }, [userId, token]);

    const formatDuration = (minutes) => {
        if (minutes < 60) return `${minutes}분`;
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("WalkLogDetailScreen", {
                    walkId: item.walkId,
                    userId,
                    token,
                })
            }
        >
            <View style={styles.cardRow}>
                <Ionicons name="walk-outline" size={26} color="#4e7fff" />
                <View style={styles.cardContent}>
                    <Text style={styles.dateText}>{item.createdAt}</Text>
                    <Text style={styles.detailText}>{formatDuration(item.duration)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9aa0a6" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>내 산책 기록</Text>
            </View>
            <View style={styles.listWrapper}>
                <FlatList
                    data={walks}
                    keyExtractor={(item) => item.walkId.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={{ alignItems: "center", marginTop: 40 }}>
                            <Text style={{ color: "#5f6368" }}>산책 기록이 없습니다.</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}
