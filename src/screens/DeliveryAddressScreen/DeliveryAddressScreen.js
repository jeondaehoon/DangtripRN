import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Platform, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DaumPostcode from 'react-native-daum-postcode';
import styles from './styles';

export default function DeliveryAddressScreen({ route, navigation }) {
    const { userId, token, onSelectAddress } = route.params;
    const [addresses, setAddresses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [postcodeVisible, setPostcodeVisible] = useState(false);

    const [recipientName, setRecipientName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    // 배송지 목록 불러오기
    const fetchAddresses = async () => {
        try {
            const res = await fetch(`${BASE_URL}/deliveryinfo/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setAddresses(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    // 배송지 선택
    const handleSelect = (item) => {
        if (onSelectAddress) {
            onSelectAddress(item);
        }
        navigation.goBack();
    };

    // 배송지 추가
    const handleAddAddress = async () => {
        if (!recipientName || !phone || !address) {
            Alert.alert("알림", "필수 입력값을 채워주세요.");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/delivery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    recipientName,
                    phone,
                    address,
                    addressDetail
                })
            });

            if (res.ok) {
                Alert.alert("알림", "배송지가 추가되었습니다.");
                setModalVisible(false);
                setRecipientName('');
                setPhone('');
                setAddress('');
                setAddressDetail('');
                fetchAddresses();
            } else {
                Alert.alert("오류", "배송지 추가 실패");
            }
        } catch (e) {
            console.error(e);
            Alert.alert("에러", "네트워크 오류 발생");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.addressId.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.addressRow, item.isDefault === 'Y' && styles.defaultAddress]}
                        onPress={() => handleSelect(item)}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.addressName}>{item.recipientName} ({item.phone})</Text>
                            <Text style={styles.addressText}>{item.address} {item.addressDetail}</Text>
                            {item.isDefault === 'Y' && <Text style={styles.defaultText}>기본 배송지</Text>}
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </TouchableOpacity>
                )}
            />

            {/* 배송지 추가 버튼 */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addText}>+ 배송지 추가</Text>
                </TouchableOpacity>
            </View>

            {/* 배송지 추가 모달 */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>새 배송지 추가</Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>수령인</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="이름을 입력하세요"
                                value={recipientName}
                                onChangeText={setRecipientName}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>전화번호</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="휴대폰 번호"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>주소</Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="주소를 검색해주세요"
                                    value={address}
                                    editable={false}
                                />
                                <TouchableOpacity
                                    style={styles.searchBtn}
                                    onPress={() => setPostcodeVisible(true)}
                                >
                                    <Text style={styles.searchBtnText}>검색</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>상세 주소</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="상세주소 입력"
                                value={addressDetail}
                                onChangeText={setAddressDetail}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={handleAddAddress}
                        >
                            <Text style={styles.saveBtnText}>저장하기</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelBtnText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* 주소 검색 모달 */}
            <Modal visible={postcodeVisible} animationType="slide">
                <SafeAreaView style={{ flex: 1 }}>
                    <DaumPostcode
                        onSelected={(data) => {
                            setAddress(data.address);
                            setPostcodeVisible(false);
                        }}
                        onError={(err) => console.error(err)}
                    />
                    <TouchableOpacity
                        style={{ padding: 16, backgroundColor: '#eee', alignItems: 'center' }}
                        onPress={() => setPostcodeVisible(false)}
                    >
                        <Text>닫기</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}
