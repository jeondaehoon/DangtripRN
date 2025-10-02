import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, Platform, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from './styles';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function ExploreScreen({ route, navigation }) {
    const { token, userId } = route.params;
    const mapRef = useRef(null);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState({
        latitude: 37.6300742,
        longitude: 127.0720532,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [activeCategory, setActiveCategory] = useState('전체');

    // 장소 데이터 로드
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/explore/places`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPlaces(res.data);
                setFilteredPlaces(res.data);
            } catch (err) {
                console.error("장소 로드 실패:", err);
            }
        };
        fetchPlaces();
    }, [token]);

    // 검색 + 카테고리 필터링
    useEffect(() => {
        const filtered = places.filter(place => {
            const matchesKeyword = place.title.includes(searchKeyword);
            const matchesCategory = activeCategory === '전체' || place.type === activeCategory;
            return matchesKeyword && matchesCategory;
        });
        setFilteredPlaces(filtered);
    }, [searchKeyword, activeCategory, places]);

    const focusOnPlace = (place) => {
        if(mapRef.current){
            mapRef.current.animateToRegion({
                latitude: place.lat,
                longitude: place.lon,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 500);
        }
    };

    return (
        <View style={styles.container}>
            {/* 지도 */}
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={userLocation}
                showsUserLocation={true}
            >
                {filteredPlaces.map(place => (
                    <Marker
                        key={`${place.type}-${place.id}`}
                        coordinate={{ latitude: place.lat, longitude: place.lon }}
                        anchor={{ x: 0.5, y: 1 }}
                    >
                        {place.type === 'WALK' && <Image source={require('../../../assets/Icon/Trail_marker.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />}
                        {place.type === 'CAFE' && <Image source={require('../../../assets/Icon/cafe_marker.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />}
                        {place.type === 'HOSPITAL' && <Image source={require('../../../assets/Icon/hospital_marker.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />}
                    </Marker>
                ))}
            </MapView>

            {/* 검색창 + 카테고리 버튼 레이어 */}
            <View style={styles.topOverlay}>
                {/* 검색창 */}
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#aaa" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="검색어 입력"
                        value={searchKeyword}
                        onChangeText={setSearchKeyword}
                    />
                </View>

                {/* 카테고리 필터 */}
                <View style={styles.categoryFilterContainer}>
                    {['전체', 'WALK', 'CAFE', 'HOSPITAL'].map(cat => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setActiveCategory(cat)}
                            style={[
                                styles.categoryButton,
                                activeCategory === cat ? styles.categoryButtonActive : styles.categoryButtonInactive
                            ]}
                        >
                            <Text style={activeCategory === cat ? styles.categoryButtonTextActive : styles.categoryButtonTextInactive}>
                                {cat === 'WALK' ? '산책로' : cat === 'CAFE' ? '카페' : cat === 'HOSPITAL' ? '병원' : '전체'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* 하단 카드 리스트 */}
            <FlatList
                data={filteredPlaces}
                horizontal
                style={styles.cardList}
                contentContainerStyle={styles.cardListContainer}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => `${item.type}-${item.id}`} // type+id로 유니크
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => focusOnPlace(item)}
                    >
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardType}>{item.type === 'WALK' ? '산책로' : item.type === 'CAFE' ? '카페' : '병원'}</Text>
                        <Text style={styles.cardRating}>평점: {item.rating}</Text>
                        <Text style={styles.cardAddr}>{item.address}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
