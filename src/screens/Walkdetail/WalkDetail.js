import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { getRequestWithToken } from "../../util/api";
import MapView, { Marker } from 'react-native-maps';
import { Circle } from 'react-native-maps';

export default function WalkDetail({ route, navigation }) {
    const { id, token, lat, lon } = route.params;
    const [walk, setWalk] = useState(null);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    useEffect(() => {
        const fetchWalkDetail = async () => {
            try {
                const res = await getRequestWithToken(`/walks/${id}?lat=${lat}&lon=${lon}`, token);
                console.log('Walk detail response:', JSON.stringify(res, null, 2));
                setWalk(res);
            } catch (err) {
                console.error('산책로 상세 불러오기 실패:', err);
            }
        };
        fetchWalkDetail();
    }, [id, token, lat, lon]);

    if (!walk) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>로딩 중...</Text>
            </SafeAreaView>
        );
    }

    const latitude = Number(walk.lat);
    const longitude = Number(walk.lon);
    const hasValidCoords = Number.isFinite(latitude) && Number.isFinite(longitude);
    console.log('Map coordinates:', { latitude, longitude, hasValidCoords });

    // 임시 테스트용 서울 시청 좌표
    const testLat = 37.5665;
    const testLon = 126.9780;

    return (
        <SafeAreaView style={styles.container} edges={['top','left','right','bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <ScrollView>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>

                <View style={styles.infoHeader}>
                    <Text style={styles.title}>{walk.title}</Text>
                    <Text style={styles.subInfo}>산책로</Text>
                </View>

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

                <Image
                    source={walk.imageUrl
                        ? { uri: `${BASE_URL}${walk.imageUrl}` }
                        : require('../../../assets/images/FreefitAppLogo.png')}
                    style={styles.mainImage}
                />

                <View style={styles.detailBox}>
                    <View style={styles.infoRow}>
                        <Ionicons name="star-outline" size={16} color="#444" />
                        <Text style={styles.infoText}>평점 {walk.rating}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="walk-outline" size={16} color="#444" />
                        <Text style={styles.infoText}>코스 길이 {walk.distanceKm} km</Text>
                    </View>
                    {typeof walk.distanceCalc === 'number' && (
                        <View style={styles.infoRow}>
                            <Ionicons name="navigate-outline" size={16} color="#444" />
                            <Text style={styles.infoText}>
                                내 위치로부터 {walk.distanceCalc ? `${walk.distanceCalc.toFixed(1)} km` : "정보 없음"}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.descBox}>
                    <Text style={styles.descTitle}>산책로 소개</Text>
                    <Text style={styles.desc}>
                        {walk.description || "상세 설명이 없습니다."}
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
                            initialRegion={{
                                latitude,
                                longitude,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002,
                            }}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            zoomEnabled={true}
                            zoomControlEnabled={true}
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
                                title={walk.title}
                                description={walk.description}
                                pinColor="red"
                                opacity={1}
                                tracksViewChanges={false}
                            />
                        </MapView>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
