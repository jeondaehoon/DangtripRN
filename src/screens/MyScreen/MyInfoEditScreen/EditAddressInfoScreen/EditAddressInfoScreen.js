import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Modal,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DaumPostcode from 'react-native-daum-postcode';
import axios from 'axios';
import styles from './editAddressInfoStyles';

export default function EditAddressInfoScreen({ route, navigation }) {
    const { userId, token } = route.params;

    const [baseAddress, setBaseAddress] = useState('');
    const [baseAddressDetail, setBaseAddressDetail] = useState('');
    const [addresses, setAddresses] = useState([]);

    const [baseModalVisible, setBaseModalVisible] = useState(false);
    const [postcodeVisible, setPostcodeVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedEditItem, setSelectedEditItem] = useState(null);

    const [recipientName, setRecipientName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');

    const [newBaseAddress, setNewBaseAddress] = useState('');
    const [newBaseDetail, setNewBaseDetail] = useState('');
    const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    // 기본주소 조회
    const fetchUserAddress = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/select/useraddress/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBaseAddress(res.data.address);
            setBaseAddressDetail(res.data.addressDetail);
        } catch (err) {
            console.error(err);
        }
    };

    // 배송지 목록 조회
    const fetchDeliveryAddresses = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/select/deliveryaddress/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAddresses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUserAddress();
        fetchDeliveryAddresses();
    }, []);

    // 기본주소 업데이트 (PUT)
    const handleSaveBase = async () => {
        try {
            await axios.put(
                `${BASE_URL}/update/useraddress/${userId}`,
                { address: newBaseAddress, addressDetail: newBaseDetail },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBaseAddress(newBaseAddress);
            setBaseAddressDetail(newBaseDetail);
            setBaseModalVisible(false);
            Alert.alert("알림", "기본 주소가 수정되었습니다.");
        } catch (err) {
            console.error(err);
            Alert.alert("에러", "기본 주소 수정 실패");
        }
    };

    // 배송지 추가 모달 열기
    const openAddModal = () => {
        setRecipientName('');
        setPhone('');
        setAddress('');
        setAddressDetail('');
        setIsEditMode(false);
        setSelectedEditItem(null);
        setModalVisible(true);
    };

    // 배송지 추가 / 수정
    const handleAddOrUpdate = async () => {
        if (!recipientName || !phone || !address) {
            Alert.alert("알림", "필수 입력값을 채워주세요.");
            return;
        }

        try {
            if (isEditMode && selectedEditItem) {
                // 수정 (PUT)
                await axios.put(
                    `${BASE_URL}/update/deliveryaddress/${selectedEditItem.addressId}`,
                    { recipientName, phone, address, addressDetail },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                Alert.alert("알림", "배송지가 수정되었습니다.");
            } else {
                // 추가 (POST)
                await axios.post(
                    `${BASE_URL}/insert/deliveryaddress`,
                    { userId, recipientName, phone, address, addressDetail },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                Alert.alert("알림", "새 배송지가 추가되었습니다.");
            }
            setModalVisible(false);
            setRecipientName('');
            setPhone('');
            setAddress('');
            setAddressDetail('');
            setSelectedEditItem(null);
            setIsEditMode(false);
            fetchDeliveryAddresses();
        } catch (err) {
            console.error(err);
            Alert.alert("에러", "배송지 저장 실패");
        }
    };

    // 배송지 삭제 (DELETE)
    const handleDelete = async () => {
        if (!selectedDeleteItem) return;
        try {
            await axios.delete(
                `${BASE_URL}/delete/deliveryaddress/${selectedDeleteItem.addressId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setAddresses(addresses.filter(a => a.addressId !== selectedDeleteItem.addressId));
            Alert.alert("알림", "배송지가 삭제되었습니다.");
        } catch (err) {
            console.error(err);
            Alert.alert("에러", "배송지 삭제 실패");
        }
        setConfirmDeleteVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>주소 및 배송지 수정</Text>
            </View>

            <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
                <View style={styles.noticeBox}>
                    <Text style={styles.noticeMain}>기본 주소와 배송지를 따로 관리할 수 있습니다</Text>
                    <Text style={styles.noticeBlue}>· 기본 주소는 회원가입 시 입력한 주소입니다.</Text>
                    <Text style={styles.noticeRed}>· 배송지는 상품 구매 시 실제 배송받을 주소입니다.</Text>
                </View>

                <Text style={styles.sectionTitle}>기본 주소</Text>
                <View style={styles.baseAddressBox}>
                    <Text style={styles.baseAddressText}>{baseAddress}</Text>
                    <Text style={styles.baseAddressDetail}>{baseAddressDetail}</Text>
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => {
                            setNewBaseAddress(baseAddress);
                            setNewBaseDetail(baseAddressDetail);
                            setBaseModalVisible(true);
                        }}
                    >
                        <Text style={styles.editBtnText}>수정</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>배송지 목록</Text>
                {addresses.map((item) => (
                    <View
                        key={item.addressId}
                        style={[styles.addressRow, item.isDefault === 'Y' && styles.defaultAddress]}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.addressName}>
                                {item.recipientName} ({item.phone})
                            </Text>
                            <Text style={styles.addressText}>
                                {item.address} {item.addressDetail}
                            </Text>
                            {item.isDefault === 'Y' && (
                                <Text style={styles.defaultText}>기본 배송지</Text>
                            )}
                        </View>
                        <View style={styles.actionCol}>
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.updateBtn]}
                                onPress={() => {
                                    setRecipientName(item.recipientName);
                                    setPhone(item.phone);
                                    setAddress(item.address);
                                    setAddressDetail(item.addressDetail);
                                    setSelectedEditItem(item);
                                    setIsEditMode(true);
                                    setModalVisible(true);
                                }}
                            >
                                <Text style={styles.actionBtnText}>수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.deleteBtn]}
                                onPress={() => {
                                    setSelectedDeleteItem(item);
                                    setConfirmDeleteVisible(true);
                                }}
                            >
                                <Text style={styles.actionBtnText}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
                        <Text style={styles.addText}>+ 배송지 추가</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* 기본 주소 수정 모달 */}
            <Modal visible={baseModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>기본 주소 수정</Text>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>주소</Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    value={newBaseAddress}
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
                                value={newBaseDetail}
                                onChangeText={setNewBaseDetail}
                            />
                        </View>
                        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveBase}>
                            <Text style={styles.saveBtnText}>저장하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setBaseModalVisible(false)}
                        >
                            <Text style={styles.cancelBtnText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* 배송지 추가/수정 모달 */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>
                            {isEditMode ? "배송지 수정" : "새 배송지 추가"}
                        </Text>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>수령인</Text>
                            <TextInput
                                style={styles.input}
                                value={recipientName}
                                onChangeText={setRecipientName}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>전화번호</Text>
                            <TextInput
                                style={styles.input}
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
                                value={addressDetail}
                                onChangeText={setAddressDetail}
                            />
                        </View>
                        <TouchableOpacity style={styles.saveBtn} onPress={handleAddOrUpdate}>
                            <Text style={styles.saveBtnText}>
                                {isEditMode ? "수정하기" : "저장하기"}
                            </Text>
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
                            if (baseModalVisible) {
                                setNewBaseAddress(data.address);
                            } else {
                                setAddress(data.address);
                            }
                            setPostcodeVisible(false);
                        }}
                    />
                    <TouchableOpacity
                        style={{ padding: 16, backgroundColor: '#eee', alignItems: 'center' }}
                        onPress={() => setPostcodeVisible(false)}
                    >
                        <Text>닫기</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>

            {/* 삭제 확인 모달 */}
            <Modal visible={confirmDeleteVisible} animationType="fade" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>삭제 확인</Text>
                        <Text style={{ fontSize: 15, color: '#333', marginBottom: 20, textAlign: 'center' }}>
                            정말 삭제하시겠습니까?
                        </Text>
                        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                            <Text style={styles.saveBtnText}>삭제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setConfirmDeleteVisible(false)}
                        >
                            <Text style={styles.cancelBtnText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
