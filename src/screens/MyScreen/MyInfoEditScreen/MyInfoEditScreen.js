import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import styles from "./myInfoEditStyles";

export default function MyInfoEditScreen({ route, navigation }) {
    const { userId, token, nickname: initialNickname } = route.params;

    // 초기 닉네임은 params.nickname, 이후 API 응답으로 갱신
    const [userInfo, setUserInfo] = useState({
        userId,
        nickname: initialNickname || "",
    });

    const BASE_URL =
        Platform.OS === "android"
            ? "http://192.168.45.62:8080"
            : "http://localhost:8080";

    // 날짜 포맷 변환 (1997-10-08 00:00:00 → 1997.10.08)
    const formatBirth = (birth) => {
        if (!birth) return "-";
        const datePart = birth.split(" ")[0];
        return datePart.replace(/-/g, ".");
    };

    // 성별 변환 (male → 남성, female → 여성)
    const formatGender = (gender) => {
        if (!gender) return "-";
        if (gender.toLowerCase() === "male") return "남성";
        if (gender.toLowerCase() === "female") return "여성";
        return gender;
    };

    // 전화번호 포맷 변환 (01082683878 → 010-8268-3878)
    const formatPhone = (phone) => {
        if (!phone) return "-";
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    // 유저 정보 불러오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/userdetailinfo/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(res.data);
            } catch (err) {
                console.error("유저 정보 불러오기 실패:", err);
                Alert.alert("에러", "유저 정보를 불러올 수 없습니다.");
            }
        };
        fetchUserInfo();
    }, [userId, token]);

    const renderRow = (label, value) => (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value || "-"}</Text>
        </View>
    );

    if (!userInfo) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>내 정보 수정</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>로딩 중...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>내 정보 수정</Text>
            </View>

            {/* 본문 */}
            <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>
                {/* 1. 로그인 정보 */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("EditLoginInfoScreen", { userId, token })}
                >
                    <Text style={styles.cardTitle}>로그인 정보</Text>
                    {renderRow("아이디", userInfo.userId)}
                    {renderRow("비밀번호", "********")}
                </TouchableOpacity>

                {/* 2. 프로필 정보 */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("EditProfileInfoScreen", { userId, token })}
                >
                    <Text style={styles.cardTitle}>프로필 정보</Text>
                    {renderRow("닉네임", userInfo.nickname)}
                    {renderRow("생년월일", formatBirth(userInfo.birth))}
                    {renderRow("성별", formatGender(userInfo.gender))}
                </TouchableOpacity>

                {/* 3. 이름 */}
                <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                    <Text style={styles.cardTitle}>이름</Text>
                    {renderRow("이름", userInfo.name)}
                </TouchableOpacity>

                {/* 4. 연락처 */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("EditContactInfoScreen", { userId, token })}
                >
                    <Text style={styles.cardTitle}>연락처 및 이메일</Text>
                    {renderRow("이메일", userInfo.email)}
                    {renderRow("전화번호", formatPhone(userInfo.phone))}
                </TouchableOpacity>

                {/* 5. 주소 */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("EditAddressInfoScreen", { userId, token })}
                >
                    <Text style={styles.cardTitle}>주소 및 배송지</Text>
                    {renderRow("주소", userInfo.address)}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
