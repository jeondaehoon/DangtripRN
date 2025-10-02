import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import styles from "./editContactInfoStyles";

export default function EditContactInfoScreen({ route, navigation }) {
    const { email: initEmail, phone: initPhone, userId, token } = route.params;

    // 이메일 초기 분리
    const [emailId, setEmailId] = useState(
        initEmail ? initEmail.split("@")[0] : ""
    );
    const [emailDomain, setEmailDomain] = useState(
        initEmail ? initEmail.split("@")[1] : "gmail.com"
    );

    const [phone, setPhone] = useState(initPhone || "");

    // 전화번호 자동 하이픈 삽입
    const formatPhone = (value) => {
        const onlyNums = value.replace(/[^0-9]/g, "");
        if (onlyNums.length < 4) return onlyNums;
        if (onlyNums.length < 8)
            return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(
            3,
            7
        )}-${onlyNums.slice(7, 11)}`;
    };

    const handlePhoneChange = (text) => {
        setPhone(formatPhone(text));
    };

    const BASE_URL =
        Platform.OS === "android"
            ? "http://192.168.45.62:8080"
            : "http://localhost:8080";

    const handleSave = async () => {
        const email = `${emailId}@${emailDomain}`;
        try {
            const res = await axios.post(
                `${BASE_URL}/update/contact`,
                { userId, email, phone },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data === true) {
                Alert.alert("성공", "연락처 정보가 수정되었습니다.");
                navigation.goBack();
            } else {
                Alert.alert("실패", "연락처 수정에 실패했습니다.");
            }
        } catch (err) {
            console.error("연락처 수정 실패:", err);
            Alert.alert("에러", "연락처 수정 중 문제가 발생했습니다.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>연락처 및 이메일 수정</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.body}
                showsVerticalScrollIndicator={false}
            >
                {/* 안내문구 */}
                <View style={styles.noticeBox}>
                    <Text style={styles.noticeMain}>
                        연락처와 이메일을 최신 상태로 관리하세요
                    </Text>
                    <Text style={styles.noticeBlue}>
                        · 이메일은 계정 복구 및 알림에 사용됩니다.
                    </Text>
                    <Text style={styles.noticeRed}>
                        · 전화번호는 본인 인증과 보안에 사용됩니다.
                    </Text>
                </View>

                {/* 이메일 */}
                <Text style={styles.label}>이메일</Text>
                <View style={styles.emailRow}>
                    <TextInput
                        value={emailId}
                        onChangeText={setEmailId}
                        placeholder="이메일 아이디"
                        style={styles.emailInput}
                    />
                    <Text style={styles.atText}>@</Text>
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={emailDomain}
                            onValueChange={(itemValue) => setEmailDomain(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#333"
                        >
                            <Picker.Item label="gmail.com" value="gmail.com" />
                            <Picker.Item label="naver.com" value="naver.com" />
                            <Picker.Item label="daum.net" value="daum.net" />
                            <Picker.Item label="kakao.com" value="kakao.com" />
                        </Picker>
                    </View>
                </View>

                {/* 전화번호 */}
                <Text style={styles.label}>전화번호</Text>
                <TextInput
                    value={phone}
                    onChangeText={handlePhoneChange}
                    placeholder="전화번호 입력"
                    style={styles.input}
                    keyboardType="phone-pad"
                />

                {/* 저장 버튼 */}
                <TouchableOpacity
                    style={styles.saveBtn}
                    activeOpacity={0.8}
                    onPress={handleSave}
                >
                    <Text style={styles.saveBtnText}>저장하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
