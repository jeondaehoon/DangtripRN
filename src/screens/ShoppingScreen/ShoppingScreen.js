import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, TextInput, FlatList, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { getRequestWithToken } from "../../util/api";

export default function ShoppingScreen({ route, navigation }) {
    const { userId, nickname, token } = route.params;
    const insets = useSafeAreaInsets();

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    // 광고 배너
    const banner = require('../../../assets/images/쇼핑광고배너.jpg');

    // 상태
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [showAllRankings, setShowAllRankings] = useState(false);

    // 이미지 경로 조립
    const getImageSource = (fileName) => {
        const url = fileName ? `${BASE_URL}/images/${encodeURIComponent(fileName)}` : null;
        return fileName
            ? { uri: url }
            : require('../../../assets/images/FreefitAppLogo.png');
    };

    // 카테고리 불러오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getRequestWithToken("/shopping/categories", token);
                setCategories(res);
            } catch (err) {
                console.error("카테고리 불러오기 실패:", err);
            }
        };
        fetchCategories();
    }, [token]);

    // 카테고리 클릭 시 상품 불러오기
    const handleCategoryPress = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const res = await getRequestWithToken(`/shopping/products?categoryId=${categoryId}`, token);
            setProducts(res);
        } catch (err) {
            console.error("상품 불러오기 실패:", err);
        }
    };

    // 랭킹 상품 불러오기
    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const res = await getRequestWithToken("/shopping/rankings", token);
                setTopProducts(res);
            } catch (err) {
                console.error("랭킹 불러오기 실패:", err);
            }
        };
        fetchTopProducts();
    }, [token]);

    // 상품 카드
    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ShoppingDetail", {
                product: item,
                userId: userId,
                token: token
            })}
        >
            <Image source={getImageSource(item.imageUrl)} style={styles.productImage} />

            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.productDesc} numberOfLines={1}>{item.description}</Text>
            <Text style={styles.productPrice}>{item.price.toLocaleString()}원</Text>

            <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.reviewCount}>({item.reviewsCount})</Text>
            </View>
        </TouchableOpacity>
    );

    // 랭킹 보여줄 개수 조절
    const visibleRankings = showAllRankings ? topProducts : topProducts.slice(0, 5);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor="#4e7fff" />
            <View style={styles.screen}>
                {/* 상단 헤더 */}
                <View style={styles.hero}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.greetSmall}>안녕하세요,</Text>
                            <Text style={styles.greetLarge}>
                                환영합니다. {nickname ? `${nickname}님` : `${userId}님`}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.headerRight}>
                            <Ionicons name="cart-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* 검색창 */}
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={18} color="#9aa0a6" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="상품 검색"
                            placeholderTextColor="#9aa0a6"
                        />
                        <Ionicons name="options-outline" size={18} color="#9aa0a6" />
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 120 }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 광고 배너 */}
                    <Image source={banner} style={styles.banner} />

                    {/* 카테고리 버튼 */}
                    <View style={styles.categoryGrid}>
                        {categories.map(cat => (
                            <TouchableOpacity
                                key={cat.categoryId}
                                style={[
                                    styles.categoryBtn,
                                    selectedCategory === cat.categoryId && { backgroundColor: '#eef3ff' }
                                ]}
                                onPress={() => handleCategoryPress(cat.categoryId)}
                            >
                                <Text style={styles.categoryText}>{cat.categoryName}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* TOP 랭킹 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>가장 많이 팔린 상품 TOP 10</Text>
                        {topProducts.length > 5 && (
                            <TouchableOpacity onPress={() => setShowAllRankings(!showAllRankings)}>
                                <Text style={styles.sectionAction}>
                                    {showAllRankings ? "접기" : "더보기"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.rankList}>
                        {visibleRankings.map((item, index) => (
                            <TouchableOpacity
                                key={item.productId}
                                style={styles.rankCard}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate("ShoppingDetail", { product: item })}
                            >
                                <Text style={styles.rankBadge}>{index + 1}</Text>
                                <Image source={getImageSource(item.imageUrl)} style={styles.rankImage} />
                                <View style={styles.rankInfo}>
                                    <Text style={styles.rankName} numberOfLines={1} ellipsizeMode="tail">
                                        {item.name}
                                    </Text>
                                    <Text style={styles.rankSales}>{item.salesCount}개 판매</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* 상품 리스트 */}
                    <FlatList
                        data={products}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.productId.toString()}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingTop: 16 }}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
