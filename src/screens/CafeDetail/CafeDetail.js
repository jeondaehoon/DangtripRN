import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { getRequestWithToken } from "../../util/api";
import MapView, { Marker, Circle } from 'react-native-maps';

export default function CafeDetail({ route, navigation }) {
    const { id, token } = route.params;
    const [cafe, setCafe] = useState(null);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    useEffect(() => {
        const fetchCafeDetail = async () => {
            try {
                const res = await getRequestWithToken(`/cafes/${id}`, token);
                console.log('Cafe detail response:', JSON.stringify(res, null, 2));
                setCafe(res);
            } catch (err) {
                console.error('카페 상세 불러오기 실패:', err);
            }
        };
        fetchCafeDetail();
    }, [id, token]);

    if (!cafe) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>로딩 중...</Text>
            </SafeAreaView>
        );
    }

    // 지도 좌표
    const latitude = Number(cafe.lat);
    const longitude = Number(cafe.lon);
    const hasValidCoords = Number.isFinite(latitude) && Number.isFinite(longitude);

    return (
        <SafeAreaView style={styles.container} edges={['top','left','right','bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <ScrollView>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>

                {/* 헤더 */}
                <View style={styles.infoHeader}>
                    <Text style={styles.title}>{cafe.title}</Text>
                    <Text style={styles.subInfo}>카페</Text>
                </View>

                {/* 액션 버튼 */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="location-outline" size={18} color="#4e7fff" />
                        <Text style={styles.actionText}>위치보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="share-social-outline" size={18} color="#4e7fff" />
                        <Text style={styles.actionText}>공유</Text>
                    </TouchableOpacity>
                </View>

                {/* 대표 이미지 */}
                <Image
                    source={cafe.imageUrl
                        ? { uri: `${BASE_URL}/images/${cafe.imageUrl}` }
                        : require('../../../assets/images/FreefitAppLogo.png')}
                    style={styles.mainImage}
                />

                {/* 상세 정보 박스 */}
                <View style={styles.detailBox}>
                    <View style={styles.infoRow}>
                        <Ionicons name="star-outline" size={16} color="#444" />
                        <Text style={styles.infoText}>평점 {cafe.rating}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={16} color="#444" />
                        <Text style={styles.infoText}>{cafe.address}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={16} color="#444" />
                        <Text style={styles.infoText}>영업시간: {cafe.openingHours}</Text>
                    </View>
                </View>

                {/* 설명 */}
                <View style={styles.descBox}>
                    <Text style={styles.descTitle}>카페 소개</Text>
                    <Text style={styles.desc}>
                        {cafe.description || "상세 설명이 없습니다."}
                    </Text>
                </View>

                {/* 지도 */}
                {hasValidCoords && (
                    <View
                        style={{
                            height: 250,
                            marginHorizontal: 16,
                            marginBottom: 30,
                            borderRadius: 12,
                            overflow: 'hidden',
                        }}
                    >
                        <MapView
                            style={{ flex: 1 }}
                            region={{
                                latitude,
                                longitude,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002,
                            }}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            zoomEnabled={true}
                            scrollEnabled={true}
                            rotateEnabled={true}
                            pitchEnabled={true}
                            mapType="standard"
                        >
                            <Circle
                                center={{ latitude, longitude }}
                                radius={100}
                                fillColor="rgba(255, 0, 0, 0.3)"
                                strokeColor="red"
                                strokeWidth={2}
                            />
                            <Marker
                                coordinate={{ latitude, longitude }}
                                title={cafe.title}
                                description={cafe.address}
                                pinColor="red"
                            />
                        </MapView>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
