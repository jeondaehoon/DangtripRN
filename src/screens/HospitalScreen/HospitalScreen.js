import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, TextInput, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { getRequestWithToken } from "../../util/api";

export default function HospitalScreen({ route, navigation }) {
    const { userId, nickname, token } = route.params;
    const insets = useSafeAreaInsets();

    const [nearHospitals, setNearHospitals] = useState([]);
    const [popularHospitals, setPopularHospitals] = useState([]);
    const [specialHospitals, setSpecialHospitals] = useState([]);
    const [allDayHospitals, setAllDayHospitals] = useState([]);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const lat = 37.6300742;
                const lon = 127.0720532;

                // 근처 병원
                const near = await getRequestWithToken(`/hospitals/near?lat=${lat}&lon=${lon}`, token);
                setNearHospitals(near);

                // 인기 병원
                const popular = await getRequestWithToken('/hospitals/popular', token);
                setPopularHospitals(popular);

                // 전문 진료 병원
                const special = await getRequestWithToken('/hospitals/special', token);
                setSpecialHospitals(special);

                // 24시간 병원
                const allday = await getRequestWithToken('/hospitals/24hours', token);
                setAllDayHospitals(allday);

            } catch (err) {
                console.error("병원 불러오기 실패:", err);
            }
        };
        fetchHospitals();
    }, [token]);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    const getImageSource = (item) => {
        const url = item.imageUrl ? `${BASE_URL}/images/${item.imageUrl}` : null;
        return item.imageUrl
            ? { uri: url }
            : require('../../../assets/images/FreefitAppLogo.png');
    };

    const renderHospitalCard = (item, showDistance = false) => (
        <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('HospitalDetail', {
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
                <Text numberOfLines={1} style={styles.cardTitle}>{item.name}</Text>

                {/* 별점 + 영업시간 */}
                <View style={styles.cardMetaRow}>
                    <Ionicons name="star" size={14} color="#f4b400" />
                    <Text style={styles.cardMetaText}>{item.rating}</Text>

                    <View style={styles.dot} />
                    <Text style={styles.cardMetaText}>영업시간:
                        {item.openingHours ? item.openingHours : "정보 없음"}
                    </Text>
                </View>

                {/* 거리 표시 */}
                {showDistance && item.distanceCalc != null && (
                    <View style={styles.cardMetaRow}>
                        <Ionicons name="location-outline" size={14} color="#4e7fff" />
                        <Text style={styles.cardMetaText}>
                            {item.distanceCalc.toFixed(2)} km
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

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
                            placeholder="동물병원 검색"
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

                    {/* 근처 병원 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>근처 병원</Text>
                        <TouchableOpacity><Text style={styles.sectionAction}>더보기</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
                        {nearHospitals.length > 0
                            ? nearHospitals.map(item => renderHospitalCard(item, true))
                            : <Text style={{ paddingLeft: 16, color: '#888' }}>근처 병원이 없습니다.</Text>}
                    </ScrollView>

                    {/* 인기 병원 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>인기 병원</Text>
                        <TouchableOpacity><Text style={styles.sectionAction}>전체보기</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
                        {popularHospitals.length > 0
                            ? popularHospitals.map(item => renderHospitalCard(item, false))
                            : <Text style={{ paddingLeft: 16, color: '#888' }}>인기 병원이 없습니다.</Text>}
                    </ScrollView>

                    {/* 전문 진료 병원 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>전문 진료 병원</Text>
                        <TouchableOpacity><Text style={styles.sectionAction}>전체보기</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
                        {specialHospitals.length > 0
                            ? specialHospitals.map(item => renderHospitalCard(item, false))
                            : <Text style={{ paddingLeft: 16, color: '#888' }}>전문 진료 병원이 없습니다.</Text>}
                    </ScrollView>

                    {/* 24시간 병원 */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>24시간 병원</Text>
                        <TouchableOpacity><Text style={styles.sectionAction}>전체보기</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
                        {allDayHospitals.length > 0
                            ? allDayHospitals.map(item => renderHospitalCard(item, false))
                            : <Text style={{ paddingLeft: 16, color: '#888' }}>24시간 병원이 없습니다.</Text>}
                    </ScrollView>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
