import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Platform, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

export default function ShoppingDetail({ route, navigation }) {
    const { product, userId, token } = route.params;
    const [selectedImage, setSelectedImage] = useState(0);

    // 서버 기본 주소
    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    // 이미지 경로 생성
    const getImageSource = (fileName) => {
        const url = fileName ? `${BASE_URL}/images/${encodeURIComponent(fileName)}` : null;
        return fileName
            ? { uri: url }
            : require('../../../assets/images/FreefitAppLogo.png');
    };

    // 이미지 배열 처리
    const images = product.images ?? [product.imageUrl];

    // 장바구니 추가 함수
    const handleAddToCart = async () => {
        try {
            const response = await fetch(`${BASE_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    productId: product.productId,
                    quantity: 1
                }),
            });

            if (response.ok) {
                Alert.alert('알림', '장바구니에 추가되었습니다!');
            } else {
                Alert.alert('오류', '장바구니 추가 실패');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('에러', '네트워크 오류 발생');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 상품 이미지 */}
                <Image
                    source={getImageSource(images[selectedImage])}
                    style={[styles.mainImage, { marginTop: 10 }]}
                />

                {/* 썸네일 리스트 */}
                {images.length > 1 && (
                    <FlatList
                        data={images}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.thumbnailList}
                        keyExtractor={(_, idx) => idx.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => setSelectedImage(index)}>
                                <Image
                                    source={getImageSource(item)}
                                    style={[
                                        styles.thumbnail,
                                        selectedImage === index && { borderColor: '#4e7fff', borderWidth: 2 }
                                    ]}
                                />
                            </TouchableOpacity>
                        )}
                    />
                )}

                {/* 상품명 → 가격 → 평점 */}
                <View style={styles.infoHeader}>
                    <Text
                        style={styles.productName}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {product.name}
                    </Text>

                    <Text style={styles.productPrice}>
                        {product.price.toLocaleString()}원
                    </Text>

                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                        <Text style={styles.reviewCount}>
                            ({product.reviewsCount}개 리뷰)
                        </Text>
                    </View>
                </View>

                {/* 상세 설명 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>상품 설명</Text>
                    <Text style={styles.sectionDesc}>{product.description}</Text>
                </View>
            </ScrollView>

            {/* 하단 버튼 */}
            <View style={styles.footer}>
                {/* 장바구니 담기 */}
                <TouchableOpacity
                    style={styles.cartBtn}
                    onPress={handleAddToCart}
                >
                    <Ionicons name="cart-outline" size={18} color="#333" />
                    <Text style={styles.cartText}>장바구니</Text>
                </TouchableOpacity>

                {/* 바로 구매 > 장바구니 페이지로 이동 */}
                <TouchableOpacity
                    style={styles.buyBtn}
                    onPress={async () => {
                        await handleAddToCart();
                        navigation.navigate("CartScreen", { userId, token });
                    }}
                >
                    <Text style={styles.buyText}>바로 구매</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
