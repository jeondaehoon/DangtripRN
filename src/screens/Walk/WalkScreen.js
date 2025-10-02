import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { getRequestWithToken } from "../../util/api";
import { Platform } from 'react-native';

export default function WalkScreen({ route, navigation }) {
    const { userId, nickname, token } = route.params;
    const insets = useSafeAreaInsets();
    const [nearWalks, setNearWalks] = useState([]);
    const [popularWalks, setPopularWalks] = useState([]);
    const [recommendWalks, setRecommendWalks] = useState([]);
    const [nightWalks, setNightWalks] = useState([]);

    useEffect(() => {
        const fetchWalks = async () => {
            try {
                const lat = 37.6300742;
                const lon = 127.0720532;

                // 거리순 산책로
                const near = await getRequestWithToken(`/walks/near?lat=${lat}&lon=${lon}`, token);
                setNearWalks(near);

                // 인기 산책로
                const popular = await getRequestWithToken('/walks/popular', token);
                setPopularWalks(popular);

                // 추천 산책로
                const recommend = await getRequestWithToken('/walks/recommend', token);
                setRecommendWalks(recommend);

                // 야간 산책로
                const night = await getRequestWithToken('/walks/night', token);
                setNightWalks(night);

            } catch (err) {
                console.error("산책로 불러오기 실패:", err);
            }
        };
        fetchWalks();
    }, [token]);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    const getImageSource = (item) => {
        const url = item.imageUrl ? `${BASE_URL}${item.imageUrl}` : null;
        return item.imageUrl
            ? { uri: url }
            : require('../../../assets/images/FreefitAppLogo.png');
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor="#4e7fff" />
            <View style={styles.screen}>

                {/* 상단 헤더 */}
                <View style={[styles.hero, { paddingTop: 0 }]}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.greetSmall}>안녕하세요,</Text>
                            <Text style={styles.greetLarge}>
                                환영합니다. {nickname ? `${nickname}님` : `${userId}님`}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.headerRight}>
                            <Ionicons name="notifications-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* 검색창 */}
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={18} color="#9aa0a6" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="산책로 검색"
                            placeholderTextColor="#9aa0a6"
                            editable={false}
                        />
                        <Ionicons name="options-outline" size={18} color="#9aa0a6" />
                    </View>
                </View>

                {/* 본문 */}
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 120 }]}
                    showsVerticalScrollIndicator={false}
                >

                    {/* 근처 산책로 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>근처 산책로</Text>
                        <TouchableOpacity><Text style={styles.sectionAction}>더보기</Text></TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
                        {nearWalks.length > 0 ? (
                            nearWalks.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.card}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('WalkDetail', {
                                        id: item.id,
                                        token,
                                        lat: 37.6300742,
                                        lon: 127.0720532
                                    })}
                                >
                                    <View style={styles.cardImage}>
                                        <Image source={getImageSource(item)} style={styles.cardImageImg} />
                                        <View style={styles.cardChip}>
                                            <Text style={styles.cardChipText}>{item.tag}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardBody}>
                                        <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
                                        <View style={styles.cardMetaRow}>
                                            <Ionicons name="star" size={14} color="#f4b400" />
                                            <Text style={styles.cardMetaText}>{item.rating}</Text>
                                            <View style={styles.dot} />
                                            <Text style={styles.cardMetaText}>코스 {item.distanceKm} km</Text>
                                            {item.distanceCalc && (
                                                <>
                                                    <View style={styles.dot} />
                                                    <Text style={styles.cardMetaText}>도착까지 {item.distanceCalc.toFixed(1)} km</Text>
                                                </>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ paddingLeft: 16, color: '#888' }}>근처 산책로가 없습니다.</Text>
                        )}
                    </ScrollView>

                    {/* 인기 산책로 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>인기 산책로</Text>
                        <TouchableOpacity><Text style={styles.sectionAction}>전체보기</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
                        {popularWalks.length > 0 ? (
                            popularWalks.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.card}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('WalkDetail', {
                                        id: item.id,
                                        token,
                                        lat: 37.6300742,
                                        lon: 127.0720532
                                    })}
                                >
                                    <View style={styles.cardImage}>
                                        <Image source={getImageSource(item)} style={styles.cardImageImg} />
                                        <View style={styles.cardChip}>
                                            <Text style={styles.cardChipText}>{item.tag}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardBody}>
                                        <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
                                        <View style={styles.cardMetaRow}>
                                            <Ionicons name="star" size={14} color="#f4b400" />
                                            <Text style={styles.cardMetaText}>{item.rating}</Text>
                                            <View style={styles.dot} />
                                            <Text style={styles.cardMetaText}>코스 {item.distanceKm} km</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ paddingLeft: 16, color: '#888' }}>인기 산책로가 없습니다.</Text>
                        )}
                    </ScrollView>

                    {/* 추천 산책로 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>추천 산책로</Text>
                        <TouchableOpacity><Text style={styles.sectionAction}>전체보기</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
                        {recommendWalks.length > 0 ? (
                            recommendWalks.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.card}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('WalkDetail', {
                                        id: item.id,
                                        token,
                                        lat: 37.6300742,
                                        lon: 127.0720532
                                    })}
                                >
                                    <View style={styles.cardImage}>
                                        <Image source={getImageSource(item)} style={styles.cardImageImg} />
                                        <View style={styles.cardChip}>
                                            <Text style={styles.cardChipText}>{item.tag}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardBody}>
                                        <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
                                        <View style={styles.cardMetaRow}>
                                            <Ionicons name="star" size={14} color="#f4b400" />
                                            <Text style={styles.cardMetaText}>{item.rating}</Text>
                                            <View style={styles.dot} />
                                            <Text style={styles.cardMetaText}>코스 {item.distanceKm} km</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ paddingLeft: 16, color: '#888' }}>추천 산책로가 없습니다.</Text>
                        )}
                    </ScrollView>

                    {/* 야간 산책로 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>야간 산책로</Text>
                        <TouchableOpacity><Text style={styles.sectionAction}>전체보기</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
                        {nightWalks.length > 0 ? (
                            nightWalks.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.card}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('WalkDetail', {
                                        id: item.id,
                                        token,
                                        lat: 37.6300742,
                                        lon: 127.0720532
                                    })}
                                >
                                    <View style={styles.cardImage}>
                                        <Image source={getImageSource(item)} style={styles.cardImageImg} />
                                        <View style={styles.cardChip}>
                                            <Text style={styles.cardChipText}>{item.tag}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardBody}>
                                        <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
                                        <View style={styles.cardMetaRow}>
                                            <Ionicons name="star" size={14} color="#f4b400" />
                                            <Text style={styles.cardMetaText}>{item.rating}</Text>
                                            <View style={styles.dot} />
                                            <Text style={styles.cardMetaText}>코스 {item.distanceKm} km</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ paddingLeft: 16, color: '#888' }}>야간 산책로가 없습니다.</Text>
                        )}
                    </ScrollView>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
