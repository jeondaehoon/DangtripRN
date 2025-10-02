import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import debounce from 'lodash.debounce';
import styles from './styles';
import { postRequest } from "../../util/api";

export default function Signup({ navigation }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [carrier, setCarrier] = useState('KT');
    const [gender, setGender] = useState('male');
    const [nationality, setNationality] = useState('korean');
    const [phone, setPhone] = useState('');
    const [idMessage, setIdMessage] = useState('');

    // 아이디 중복 체크
    const checkId = async (userid) => {
        if (userid.length < 3) {
            setIdMessage('');
            return;
        }
        try {
            const res = await postRequest('/checkid', { userId: userid });
            if (res) {
                setIdMessage('이미 존재하는 아이디입니다.');
            } else {
                setIdMessage('사용 가능한 아이디입니다.');
            }
        } catch (err) {
            console.error(err);
            setIdMessage('아이디 중복 체크에 실패했습니다.');
        }
    };

    const debouncedCheckId = useCallback(debounce(checkId, 500), []);

    const handleIdChange = (text) => {
        setId(text);
        debouncedCheckId(text);
    };

    // 생년월일 자동 포맷 (19990927 → 1999.09.27)
    const handleBirthChange = (text) => {
        const onlyNums = text.replace(/[^0-9]/g, '').slice(0, 8);
        if (onlyNums.length === 8) {
            const formatted = `${onlyNums.substring(0, 4)}.${onlyNums.substring(4, 6)}.${onlyNums.substring(6, 8)}`;
            setBirth(formatted);
        } else {
            setBirth(onlyNums);
        }
    };

    // 전화번호 자동 포맷 (01012341234 → 010-1234-1234)
    const handlePhoneChange = (text) => {
        const onlyNums = text.replace(/[^0-9]/g, '').slice(0, 11);
        let formatted = onlyNums;

        if (onlyNums.length <= 3) {
            formatted = onlyNums;
        } else if (onlyNums.length <= 7) {
            formatted = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
        } else {
            formatted = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
        }

        setPhone(formatted);
    };

    // 회원가입
    const handleSignup = async () => {
        if (idMessage === '이미 존재하는 아이디입니다.') {
            Alert.alert('회원가입 오류', '사용할 수 없는 아이디입니다.');
            return;
        }

        let formattedBirth = birth;
        if (/^\d{8}$/.test(birth)) {
            formattedBirth = `${birth.substring(0, 4)}.${birth.substring(4, 6)}.${birth.substring(6, 8)}`;
        }

        try {
            const data = await postRequest('/signup', {
                userId: id,
                password,
                email,
                name,
                birth: formattedBirth,
                carrier,
                gender,
                nationality,
                phone
            });

            console.log("백엔드 응답:", data);

            const success = data === true || data === 1 || data === "success";

            if (success) {
                navigation.navigate('Terms', { userId: id });

                setTimeout(() => {
                    Alert.alert("회원가입 성공", "회원가입이 완료되었습니다.");
                }, 500);
            } else {
                Alert.alert("회원가입 실패", "회원가입에 실패했습니다.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert('회원가입 오류', '회원가입 중 문제가 발생했습니다.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.logo}>댕트립</Text>
            <Text style={styles.title}>본인확인을 위해 휴대폰 인증을 진행해주세요.</Text>

            {/* 첫번째 박스: 아이디, 비밀번호, 이메일 */}
            <View style={styles.inputBox}>
                <View style={styles.inputRow}>
                    <Icon name="account-outline" size={22} color="#bbb" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="아이디"
                        placeholderTextColor="#bbb"
                        value={id}
                        onChangeText={handleIdChange}
                    />
                </View>
                {idMessage ? (
                    <Text style={{ color: idMessage.includes('가능') ? 'green' : 'red', marginLeft: 8, marginBottom: 8 }}>
                        {idMessage}
                    </Text>
                ) : null}
                <View style={styles.inputRow}>
                    <Icon name="lock-outline" size={22} color="#bbb" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="비밀번호"
                        placeholderTextColor="#bbb"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Icon name="eye-off-outline" size={22} color="#bbb" style={styles.inputRightIcon} />
                </View>
                <View style={styles.inputRow}>
                    <Icon name="email-outline" size={22} color="#bbb" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="[선택] 이메일주소 (본인 확인용)"
                        placeholderTextColor="#bbb"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
            </View>

            {/* 두번째 박스: 이름, 생년월일, 통신사, 성별/국적 */}
            <View style={styles.inputBox}>
                <View style={styles.inputRow}>
                    <Icon name="account-outline" size={22} color="#bbb" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="이름"
                        placeholderTextColor="#bbb"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Icon name="calendar-month-outline" size={22} color="#bbb" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="생년월일 8자리 (예: 19990927)"
                        placeholderTextColor="#bbb"
                        value={birth}
                        onChangeText={handleBirthChange}
                        keyboardType="number-pad"
                        maxLength={10} // 1999.09.27까지 포함하면 10자리
                    />
                </View>
                <View style={styles.inputRow}>
                    <Icon name="cellphone-wireless" size={22} color="#bbb" style={styles.inputIcon} />
                    <RNPickerSelect
                        onValueChange={setCarrier}
                        value={carrier}
                        items={[
                            { label: "SKT", value: "SKT" },
                            { label: "KT", value: "KT" },
                            { label: "LG U+", value: "LGU" },
                            { label: "SKT알뜰폰", value: "SKTMVNO" },
                            { label: "KT알뜰폰", value: "KTMVNO" },
                            { label: "LG U+알뜰폰", value: "LGUMVNO" },
                        ]}
                        placeholder={{ label: "통신사 선택", value: null }}
                        useNativeAndroidPickerStyle={false}
                        style={{
                            inputIOS: {
                                fontSize: 16,
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 8,
                                color: '#000',
                                paddingRight: 30,
                            },
                            inputAndroid: {
                                fontSize: 16,
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 8,
                                color: '#000',
                                paddingRight: 30,
                            },
                            placeholder: {
                                color: '#bbb',
                            },
                        }}
                    />
                </View>
                <View style={styles.selectRow}>
                    <TouchableOpacity
                        style={[styles.selectButton, gender === 'male' && styles.selectActive]}
                        onPress={() => setGender('male')}
                    >
                        <Text style={[styles.selectText, gender === 'male' && styles.selectTextActive]}>남자</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.selectButton, gender === 'female' && styles.selectActive]}
                        onPress={() => setGender('female')}
                    >
                        <Text style={[styles.selectText, gender === 'female' && styles.selectTextActive]}>여자</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.selectButton, nationality === 'korean' && styles.selectActive]}
                        onPress={() => setNationality('korean')}
                    >
                        <Text style={[styles.selectText, nationality === 'korean' && styles.selectTextActive]}>내국인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.selectButton, nationality === 'foreigner' && styles.selectActive]}
                        onPress={() => setNationality('foreigner')}
                    >
                        <Text style={[styles.selectText, nationality === 'foreigner' && styles.selectTextActive]}>외국인</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 휴대전화번호 */}
            <View style={styles.inputBox}>
                <View style={styles.inputRow}>
                    <Icon name="cellphone" size={22} color="#bbb" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="휴대전화번호"
                        placeholderTextColor="#bbb"
                        value={phone}
                        keyboardType="phone-pad"
                        maxLength={13} // 010-1234-1234
                        onChangeText={handlePhoneChange}
                    />
                </View>
            </View>

            {/* 가입 버튼 */}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSignup}
            >
                <Text style={styles.submitButtonText}>가입하기</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
