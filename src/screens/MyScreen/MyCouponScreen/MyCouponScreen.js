import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./myCouponStyles";

export default function MyCouponScreen({ route, navigation }) {
    const { token, userId } = route.params;
    const [coupons, setCoupons] = useState([]);

    const BASE_URL =
        Platform.OS === "android"
            ? "http://192.168.45.62:8080"
            : "http://localhost:8080";

    // 쿠폰 데이터 불러오기
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/mypage/mycoupons/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setCoupons(res.data);
            } catch (err) {
                console.error("쿠폰 불러오기 실패:", err);
            }
        };

        fetchCoupons();
    }, [userId, token]);

    const renderCoupon = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.card,
                item.used ? styles.cardUsed : styles.cardActive,
            ]}
            onPress={() =>
                navigation.navigate("ShoppingScreen", {
                    token: token,
                    userId: userId,
                })
            }
        >
            <View style={styles.statusBar(item.used)} />
            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>
                    유효기간: {item.validUntil}
                </Text>
            </View>
            {item.used ? (
                <Ionicons name="close-outline" size={28} color="#999" />
            ) : (
                <Ionicons name="checkmark-outline" size={28} color="#4e7fff" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>내 쿠폰함</Text>
            </View>

            {/* 본문 */}
            <View style={styles.contentWrapper}>
                <FlatList
                    data={coupons}
                    keyExtractor={(item) => item.couponId.toString()}
                    renderItem={renderCoupon}
                />
            </View>
        </SafeAreaView>
    );
}
