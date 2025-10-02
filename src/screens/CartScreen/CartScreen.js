import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

export default function CartScreen({ route, navigation }) {
    const { userId, token, resetCart } = route.params || {};
    const [cartItems, setCartItems] = useState([]);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    // 주문 완료 후 장바구니 초기화
    useFocusEffect(
        React.useCallback(() => {
            if (resetCart) {
                setCartItems([]);
            }
        }, [resetCart])
    );

    // 장바구니 목록 불러오기
    const fetchCart = () => {
        fetch(`${BASE_URL}/cart/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCartItems(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // 총합 계산
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 수량 증가/감소
    const updateQuantity = async (cartId, type, currentQty) => {
        const newQty = type === "plus" ? currentQty + 1 : Math.max(currentQty - 1, 1);

        try {
            const response = await fetch(`${BASE_URL}/cartupdate/${cartId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: newQty }),
            });

            if (response.ok) {
                setCartItems(cartItems.map(item =>
                    item.cartId === cartId ? { ...item, quantity: newQty } : item
                ));
            } else {
                Alert.alert("오류", "수량 변경 실패");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("에러", "네트워크 오류 발생");
        }
    };

    // 삭제
    const removeItem = async (cartId) => {
        try {
            const response = await fetch(`${BASE_URL}/cartdelete/${cartId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setCartItems(cartItems.filter(item => item.cartId !== cartId));
                Alert.alert("알림", "장바구니에서 삭제되었습니다.");
            } else {
                Alert.alert("오류", "삭제 실패");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("에러", "네트워크 오류 발생");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.cartId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                        <Image source={{ uri: `${BASE_URL}/images/${item.imageUrl}` }} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
                            <View style={styles.qtyRow}>
                                <TouchableOpacity onPress={() => updateQuantity(item.cartId, "minus", item.quantity)}>
                                    <Ionicons name="remove-circle-outline" size={22} color="#4e7fff" />
                                </TouchableOpacity>
                                <Text style={styles.qtyText}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => updateQuantity(item.cartId, "plus", item.quantity)}>
                                    <Ionicons name="add-circle-outline" size={22} color="#4e7fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItem(item.cartId)}>
                            <Ionicons name="trash-outline" size={22} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* 총합 + 구매하기 버튼 */}
            <View style={styles.footer}>
                <Text style={styles.totalText}>총 {totalPrice.toLocaleString()}원</Text>
                <TouchableOpacity
                    style={styles.buyBtn}
                    onPress={() => navigation.navigate("OrderScreen", { cartItems, userId, token })}
                >
                    <Text style={styles.buyText}>구매하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
