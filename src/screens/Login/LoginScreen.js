import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { postRequest } from "../../util/api";

export default function LoginScreen({ navigation }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await postRequest("/login", {
                userId: id,
                password: password,
            });

            console.log("서버 응답:", data);

            if (data.token) {
                // JWT 토큰 전달
                navigation.navigate('MainScreen', { token: data.token, userId: id });
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("로그인 에러:", err);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/images/FreefitAppLogo.png')}
                style={styles.logo}
            />
            <Text style={styles.subtitle}>댕트립에 오신 것을 환영합니다!</Text>

            {/* 일반 로그인 입력 */}
            <TextInput
                style={styles.input}
                placeholder="아이디"
                placeholderTextColor="#aaa"
                value={id}
                onChangeText={setId}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* 일반 로그인 버튼 */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>

            {/* 회원가입 */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.footerText, { color: '#4e7fff', fontWeight: 'bold' }]}>
                    아직 회원이 아니신가요? 회원가입
                </Text>
            </TouchableOpacity>
        </View>
    );
}
