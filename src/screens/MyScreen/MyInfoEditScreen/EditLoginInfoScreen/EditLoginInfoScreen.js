import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./editLoginInfoStyles";
import axios from "axios";

export default function EditLoginInfoScreen({ route, navigation }) {
    const { userId, token } = route.params;
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkCurrentResult, setCheckCurrentResult] = useState(null);

    const BASE_URL =
        Platform.OS === "android"
            ? "http://192.168.45.62:8080"
            : "http://localhost:8080";

    // 현재 비밀번호 실시간 체크
    useEffect(() => {
        if (!currentPassword) {
            setCheckCurrentResult(null);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            try {
                const res = await axios.post(
                    `${BASE_URL}/check/password?userId=${userId}&currentPassword=${currentPassword}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCheckCurrentResult(res.data === true);
            } catch (err) {
                console.error("비밀번호 확인 실패:", err);
                setCheckCurrentResult(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [currentPassword]);

    // 저장 버튼
    const handleSave = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("오류", "새 비밀번호와 확인이 일치하지 않습니다.");
            return;
        }

        try {
            const res = await axios.post(
                `${BASE_URL}/update/password?userId=${userId}&currentPassword=${currentPassword}&newPassword=${newPassword}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data === true) {
                Alert.alert("성공", "비밀번호가 변경되었습니다.");
                navigation.goBack();
            } else {
                Alert.alert("실패", "현재 비밀번호가 올바르지 않습니다.");
            }
        } catch (err) {
            console.error("비밀번호 변경 실패:", err);
            Alert.alert("에러", "비밀번호 변경 중 문제가 발생했습니다.");
        }
    };

    // 새 비밀번호 일치 여부
    const renderPasswordMatch = () => {
        if (!newPassword || !confirmPassword) return null;
        if (newPassword === confirmPassword) {
            return <Text style={styles.matchText}>비밀번호가 일치합니다.</Text>;
        } else {
            return (
                <Text style={styles.mismatchText}>
                    비밀번호가 일치하지 않습니다. 다시 확인하세요.
                </Text>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>비밀번호 변경</Text>
            </View>

            <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
                {/* 안내문구 */}
                <View style={styles.noticeBox}>
                    <Text style={styles.noticeMain}>안전한 비밀번호로 내 정보를 보호하세요</Text>
                    <Text style={styles.noticeBlue}>
                        · 다른 아이디/사이트에서 사용한 적 없는 비밀번호
                    </Text>
                    <Text style={styles.noticeRed}>
                        · 이전에 사용한 적 없는 비밀번호가 안전합니다.
                    </Text>
                </View>

                {/* 아이디 */}
                <Text style={styles.label}>아이디</Text>
                <View style={styles.disabledBox}>
                    <Text style={styles.disabledText}>{userId}</Text>
                </View>

                {/* 비밀번호 변경 구역 */}
                <Text style={styles.sectionTitle}>비밀번호 변경</Text>

                {/* 현재 비밀번호 */}
                <TextInput
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                    placeholder="현재 비밀번호 입력"
                    style={styles.input}
                />
                {checkCurrentResult !== null && (
                    <Text
                        style={
                            checkCurrentResult
                                ? styles.matchText
                                : styles.mismatchText
                        }
                    >
                        {checkCurrentResult
                            ? "비밀번호가 일치합니다."
                            : "비밀번호가 일치하지 않습니다."}
                    </Text>
                )}

                {/* 새 비밀번호 + 확인 */}
                <View style={styles.stackedBox}>
                    <TextInput
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        placeholder="새 비밀번호 입력"
                        style={[styles.input, styles.inputTight]}
                    />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        placeholder="비밀번호 다시 입력"
                        style={[styles.input, styles.inputTight]}
                    />
                    {renderPasswordMatch()}
                </View>

                {/* 저장 버튼 */}
                <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>저장하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
