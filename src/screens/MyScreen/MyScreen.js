import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Platform, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./myStyles";
import axios from "axios";

export default function MyScreen({ navigation, route }) {
    const { userId, token, nickname } = route.params;
    const [user, setUser] = useState(null);

    const BASE_URL = Platform.OS === "android"
        ? "http://192.168.45.62:8080"
        : "http://localhost:8080";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("유저 정보 불러오기 실패:", error);
            }
        };
        fetchUser();
    }, [userId, token]);

    if (!user) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>로딩 중...</Text>
            </SafeAreaView>
        );
    }

    const handleLogout = () => {
        Alert.alert(
            "로그아웃",
            "로그아웃하시겠습니까?",
            [
                { text: "아니요", style: "cancel" },
                {
                    text: "예",
                    style: "destructive",
                    onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#4e7fff" }}>
            <View style={styles.hero}>
                <View style={styles.profileRow}>
                    <Image
                        source={
                            user.avatar
                                ? { uri: `${BASE_URL}/images/${user.avatar}` }
                                : require("../../../assets/images/FreefitAppLogo.png")
                        }
                        style={styles.profileAvatar}
                    />
                    <View>
                        <Text style={styles.profileName}>{user.name}님</Text>
                        <Text style={styles.profileEmail}>{user.nickname}</Text>
                        <Text style={styles.profileEmail}>{user.email}</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: "#f8f9fb" }}>
                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>내 활동</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.cardRow}
                        onPress={() => navigation.navigate("MyWalkHistoryScreen", { userId, token })}
                    >
                        <Ionicons name="walk-outline" size={22} color="#4e7fff" />
                        <Text style={styles.cardLabel}>내 산책 기록</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardRow}>
                        <Ionicons name="people-outline" size={22} color="#4e7fff" />
                        <Text style={styles.cardLabel}>내 그룹 참여 내역</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cardRow}
                        onPress={() => navigation.navigate("MyCommunityScreen", { userId, token })}
                    >
                        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#4e7fff" />
                        <Text style={styles.cardLabel}>내 커뮤니티 활동</Text>
                    </TouchableOpacity>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>혜택</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.cardRow}
                        onPress={() => navigation.navigate("MyCouponScreeny", { userId, token })}
                    >
                        <Ionicons name="ticket-outline" size={22} color="#4e7fff" />
                        <Text style={styles.cardLabel}>내 쿠폰함</Text>
                    </TouchableOpacity>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>설정 & 지원</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.cardRow}
                        onPress={() => navigation.navigate("MyInfoEditScreen", { userId, token, nickname })}
                    >
                        <Ionicons name="person-outline" size={22} color="#4e7fff" />
                        <Text style={styles.cardLabel}>내 정보 수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardRow}>
                        <Ionicons name="settings-outline" size={22} color="#4e7fff" />
                        <Text style={styles.cardLabel}>앱 설정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardRow}>
                        <Ionicons name="help-circle-outline" size={22} color="#4e7fff" />
                        <Text style={styles.cardLabel}>고객센터</Text>
                    </TouchableOpacity>
                    {/* 로그아웃 버튼 */}
                    <TouchableOpacity style={styles.cardRow} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={22} color="#e53935" />
                        <Text style={[styles.cardLabel, { color: "#e53935" }]}>로그아웃</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
