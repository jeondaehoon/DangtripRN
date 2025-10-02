import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import styles from "./editProfileInfoStyles";
import axios from "axios";

export default function EditProfileInfoScreen({ route, navigation }) {
    const { userId, token, nickname: initNickname, birth: initBirth } = route.params;

    const [nickname, setNickname] = useState(initNickname || "");

    const initialYear = initBirth ? parseInt(initBirth.split(".")[0]) : 2000;
    const initialMonth = initBirth ? parseInt(initBirth.split(".")[1]) : 1;
    const initialDay = initBirth ? parseInt(initBirth.split(".")[2]) : 1;

    const [year, setYear] = useState(initialYear);
    const [month, setMonth] = useState(initialMonth);
    const [day, setDay] = useState(initialDay);

    const BASE_URL =
        Platform.OS === "android"
            ? "http://192.168.45.62:8080"
            : "http://localhost:8080";

    const handleSave = async () => {
        const birth = `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;

        try {
            const res = await axios.post(
                `${BASE_URL}/update/profile`,
                { userId, nickname, birth },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data === true) {
                Alert.alert("성공", "프로필이 수정되었습니다.");
                navigation.goBack();
            } else {
                Alert.alert("실패", "프로필 수정에 실패했습니다.");
            }
        } catch (err) {
            console.error("프로필 수정 실패:", err);
            Alert.alert("에러", "프로필 수정 중 문제가 발생했습니다.");
        }
    };

    // 연도 리스트
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1949 }, (_, i) => 1950 + i);

    // 월 리스트
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // 일 리스트
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>프로필 정보 수정</Text>
            </View>

            <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
                {/* 안내문구 */}
                <View style={styles.noticeBox}>
                    <Text style={styles.noticeMain}>내 프로필 정보를 최신 상태로 관리하세요</Text>
                    <Text style={styles.noticeBlue}>· 닉네임은 앱에서 표시되는 이름입니다.</Text>
                    <Text style={styles.noticeRed}>· 생년월일은 셀렉트 박스로 선택하세요.</Text>
                </View>

                {/* 닉네임 */}
                <Text style={styles.label}>닉네임</Text>
                <TextInput
                    value={nickname}
                    onChangeText={setNickname}
                    placeholder="닉네임 입력"
                    style={styles.input}
                />

                {/* 생년월일 */}
                <Text style={styles.label}>생년월일</Text>
                <View style={styles.birthRow}>
                    <View style={styles.birthPicker}>
                        <Picker selectedValue={year} onValueChange={(val) => setYear(val)}>
                            {years.map((y) => (
                                <Picker.Item key={y} label={`${y}`} value={y} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.birthPicker}>
                        <Picker selectedValue={month} onValueChange={(val) => setMonth(val)}>
                            {months.map((m) => (
                                <Picker.Item key={m} label={`${m}월`} value={m} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.birthPicker}>
                        <Picker selectedValue={day} onValueChange={(val) => setDay(val)}>
                            {days.map((d) => (
                                <Picker.Item key={d} label={`${d}일`} value={d} />
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* 저장 버튼 */}
                <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>저장하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
