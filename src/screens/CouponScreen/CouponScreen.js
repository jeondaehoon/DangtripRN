import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import couponStyles from './couponStyles';

export default function CouponScreen({ route, navigation }) {
    const { userId, token } = route.params;
    const insets = useSafeAreaInsets();
    const [coupons, setCoupons] = useState([]);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    useEffect(() => {
        fetch(`${BASE_URL}/available/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCoupons(data))
            .catch(err => console.error('쿠폰 불러오기 실패', err));
    }, [userId, token]);

    const handleIssue = (couponId) => {
        fetch(`${BASE_URL}/issue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, couponId })
        })
            .then(res => res.json())
            .then(() => {
                Alert.alert('쿠폰 발급 완료');
                setCoupons(coupons.filter(c => c.couponId !== couponId));
            })
            .catch(err => console.error('쿠폰 발급 실패', err));
    };

    return (
        <SafeAreaView style={couponStyles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor="#4e7fff" />
            <View style={couponStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={couponStyles.headerTitle}>쿠폰 발급</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={[couponStyles.contentContainer, { paddingBottom: insets.bottom + 20 }]} showsVerticalScrollIndicator={false}>
                {coupons.length > 0 ? (
                    coupons.map(coupon => (
                        <View key={coupon.couponId} style={couponStyles.couponCard}>
                            <View style={couponStyles.couponHeader}>
                                <Text style={couponStyles.couponTitle}>{coupon.title}</Text>
                                <Text style={couponStyles.couponTag}>{coupon.tag}</Text>
                            </View>
                            <Text style={couponStyles.couponDesc}>{coupon.description}</Text>
                            <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#4e7fff',
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        borderRadius: 10
                                    }}
                                    activeOpacity={0.8}
                                    onPress={() => handleIssue(coupon.couponId)}
                                >
                                    <Text style={{ color: '#fff', fontWeight: '700' }}>발급 받기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={couponStyles.emptyText}>발급 가능한 쿠폰이 없습니다.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
