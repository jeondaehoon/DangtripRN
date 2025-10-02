import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function OrderScreen({ route, navigation }) {
    const { cartItems, userId, token } = route.params;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [payment, setPayment] = useState('card');
    const [sameAsUser, setSameAsUser] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleOrder = async () => {
        const finalName = selectedAddress ? selectedAddress.recipientName : name;
        const finalPhone = selectedAddress ? selectedAddress.phone : phone;
        const finalAddress = selectedAddress ? selectedAddress.address : address;
        const finalAddressDetail = selectedAddress ? selectedAddress.addressDetail : addressDetail;

        if (!finalName || !finalPhone || !finalAddress) {
            Alert.alert("알림", "배송 정보를 모두 입력해주세요.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    items: cartItems.map(item => ({
                        productId: item.id,
                        productName: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    name: finalName,
                    phone: finalPhone,
                    address: finalAddress,
                    addressDetail: finalAddressDetail,
                    payment,
                    totalPrice
                })
            });

            if (response.ok) {
                Alert.alert("주문 완료", "주문이 접수되었습니다!");
                navigation.navigate("MainScreen", { userId, token, resetCart: true });
            } else {
                Alert.alert("오류", "주문 처리 실패");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("에러", "네트워크 오류 발생");
        }
    };


    const fetchUserInfo = async () => {
        try {
            const res = await fetch(`${BASE_URL}/userinfo/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setName(data.name || '');
            setPhone(data.phone || '');
            setAddress(data.address || '');
            setAddressDetail(data.addressDetail || '');
        } catch (e) {
            console.error(e);
            Alert.alert("오류", "회원 정보를 불러오지 못했습니다.");
        }
    };

    const handleCheckSame = async () => {
        const newValue = !sameAsUser;
        setSameAsUser(newValue);

        if (newValue) {
            await fetchUserInfo();
        } else {
            setName('');
            setPhone('');
            setAddress('');
            setAddressDetail('');
        }
    };

    const handleSelectAddress = (addressObj) => {
        setSelectedAddress(addressObj);
        setName(addressObj.recipientName);
        setPhone(addressObj.phone);
        setAddress(addressObj.address);
        setAddressDetail(addressObj.addressDetail);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>주문 상품</Text>
                    {cartItems.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <Image source={{ uri: `${BASE_URL}/images/${item.imageUrl}` }} style={styles.itemImage} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>{item.price.toLocaleString()}원 x {item.quantity}</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.totalText}>총 {totalPrice.toLocaleString()}원</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>배송 정보</Text>

                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
                        onPress={handleCheckSame}
                    >
                        <Ionicons
                            name={sameAsUser ? "checkbox-outline" : "square-outline"}
                            size={22}
                            color="#4e7fff"
                        />
                        <Text style={{ marginLeft: 8 }}>회원 정보와 동일</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.selectAddressBtn}
                        onPress={() =>
                            navigation.navigate("DeliveryAddressScreen", {
                                userId,
                                token,
                                onSelectAddress: handleSelectAddress,
                            })
                        }
                    >
                        <Text style={styles.selectAddressText}>
                            {selectedAddress ? "다른 배송지 선택" : "배송지 선택"}
                        </Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="이름"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="전화번호"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="주소"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="상세주소"
                        value={addressDetail}
                        onChangeText={setAddressDetail}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>결제 방법</Text>
                    <View style={styles.paymentRow}>
                        <TouchableOpacity
                            style={[styles.payOption, payment === 'card' && styles.paySelected]}
                            onPress={() => setPayment('card')}
                        >
                            <Text style={payment === 'card' ? styles.payTextActive : styles.payText}>카드 결제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.payOption, payment === 'bank' && styles.paySelected]}
                            onPress={() => setPayment('bank')}
                        >
                            <Text style={payment === 'bank' ? styles.payTextActive : styles.payText}>계좌 이체</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.orderBtn} onPress={handleOrder}>
                    <Text style={styles.orderText}>결제하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
