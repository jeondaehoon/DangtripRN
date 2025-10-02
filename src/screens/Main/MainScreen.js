import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StatusBar, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../../screens/Main/styles';
import { getRequestWithToken } from '../../util/api';

export default function MainScreen({ route, navigation }) {
  const { token, userId } = route.params;
  const insets = useSafeAreaInsets();
  const currentTab = '홈';

  const [nickname, setNickname] = useState('');
  const [dogs, setDogs] = useState([]);
  const [promos, setPromos] = useState([]);
  const [walks, setWalks] = useState([]);

  const BASE_URL = Platform.OS === 'android'
      ? 'http://192.168.45.62:8080'
      : 'http://localhost:8080';

  const getImageSource = (item) => {
    if (!item.imageUrl || item.imageUrl.trim() === "") {
      return require('../../../assets/images/FreefitAppLogo.png');
    }
    const url = item.imageUrl.startsWith('http')
        ? item.imageUrl
        : `${BASE_URL}${item.imageUrl}`;
    return { uri: url };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data with token:', token);
        const res = await getRequestWithToken(`/nickname/${userId}`, token);
        setNickname(res);

        const dogData = await getRequestWithToken(`/doginfo/${userId}`, token);
        setDogs(Array.isArray(dogData) ? dogData : dogData ? [dogData] : []);

        const promoData = await getRequestWithToken('/promos', token);
        setPromos(promoData);

        const lat = 37.6300742;
        const lon = 127.0720532;
        const walksData = await getRequestWithToken(`/walks?lat=${lat}&lon=${lon}`, token);
        setWalks(walksData);

      } catch (err) {
        console.error('서버 데이터 로드 실패:', err);
      }
    };

    fetchData();
  }, [userId, token]);

  return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor="#4e7fff" />
        <View style={styles.screen}>
          {/* 상단 헤더 */}
          <View style={[styles.hero, { paddingTop: 0 }]}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <View>
                  <Text style={styles.greetSmall}>안녕하세요,</Text>
                  <Text style={styles.greetLarge}>
                    환영합니다. {nickname ? `${nickname}님` : `${userId}님`}
                  </Text>
                </View>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity activeOpacity={0.9}>
                  <Ionicons name="notifications-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* 검색창 */}
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#9aa0a6" />
              <TextInput
                  style={styles.searchInput}
                  placeholder="장소, 카페, 산책로 검색"
                  placeholderTextColor="#9aa0a6"
                  editable={false}
              />
              <Ionicons name="options-outline" size={18} color="#9aa0a6" />
            </View>
          </View>

          {/* 메인 콘텐츠 */}
          <ScrollView
              style={styles.content}
              contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 80 }]}
              showsVerticalScrollIndicator={false}
          >
            {/* 반려견 현황 */}
            <View style={styles.dogRow}>
              {dogs.length > 0 ? (
                  dogs.map(dog => (
                      <TouchableOpacity
                          key={dog.dogId}
                          style={styles.dogCard}
                          activeOpacity={0.8}
                          onPress={() => navigation.navigate('Dogdetail', { token, dogId: dog.dogId })}
                      >
                        <View style={[
                          styles.dogAvatar,
                          dog.dogGender === 'female' ? styles.dogAvatarPink : styles.dogAvatarBlue,
                        ]}>
                          <Ionicons
                              name={dog.dogGender === 'female' ? 'female' : 'male'}
                              size={14}
                              color={dog.dogGender === 'female' ? '#b0175b' : '#1a73e8'}
                          />
                        </View>
                        <View style={styles.dogInfo}>
                          <Text style={styles.dogName}>{dog.dogName}</Text>
                          <Text style={styles.dogSub}>{dog.dogAge}살, {dog.breedName}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#9aa0a6" />
                      </TouchableOpacity>
                  ))
              ) : (
                  <Text style={{ paddingHorizontal: 16, color: '#888' }}>등록된 반려견이 없습니다.</Text>
              )}
            </View>

            {/* 추천 프로모션 */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.promoRow}
            >
              {promos.map(promo => (
                  <View key={promo.promoId} style={styles.promoCard}>
                    <View style={styles.promoBadge}>
                      <Text style={styles.promoBadgeText}>{promo.tag}</Text>
                    </View>
                    <Text style={styles.promoTitle}>{promo.title}</Text>
                    <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
                    <View style={styles.promoBottomRow}>
                      <View style={styles.promoAvatar}>
                        <MaterialCommunityIcons name="paw" size={16} color="#4e7fff" />
                      </View>
                      <Text style={styles.promoMeta}>
                        유효기간: {promo.validUntil ? promo.validUntil.substring(0, 10) : '상시'}
                      </Text>
                    </View>
                  </View>
              ))}
            </ScrollView>

            {/* 빠른 탐색 */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>빠른 탐색</Text>
              <TouchableOpacity activeOpacity={0.9}>
                <Text style={styles.sectionAction}>전체보기</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.quickGrid}>
              {[
                { id: 'q1', icon: 'paw-outline', label: '산책로' },
                { id: 'q2', icon: 'cafe-outline', label: '카페' },
                { id: 'q3', icon: 'school-outline', label: '훈련' },
                { id: 'q4', icon: 'cart-outline', label: '쇼핑' },
                { id: 'q5', icon: 'medkit-outline', label: '병원' },
                { id: 'q6', icon: 'chatbubble-ellipses-outline', label: '커뮤니티' },
                { id: 'q7', icon: 'ticket-outline', label: '쿠폰' },
                { id: 'q8', icon: 'ellipsis-horizontal-circle-outline', label: '더보기' },
              ].map(item => (
                  <TouchableOpacity
                      key={item.id}
                      style={styles.quickItem}
                      activeOpacity={0.8}
                      onPress={() => {
                        switch(item.label) {
                          case '산책로': navigation.navigate('WalkScreen', { userId, nickname, token }); break;
                          case '카페': navigation.navigate('CafeScreen', { userId, nickname, token }); break;
                          case '병원': navigation.navigate('HospitalScreen', { userId, nickname, token }); break;
                          case '훈련': navigation.navigate('TrainingScreen', { userId, nickname, token }); break;
                          case '쇼핑': navigation.navigate('ShoppingScreen', { userId, nickname, token }); break;
                          case '커뮤니티': navigation.navigate('CommunityScreen', { userId, nickname, token }); break;
                          case '쿠폰': navigation.navigate('CouponScreen', { userId, nickname, token }); break;
                          default: console.log(`${item.label} 눌림`);
                        }
                      }}
                  >
                    <View style={styles.quickIconWrap}>
                      <Ionicons name={item.icon} size={22} color="#4e7fff" />
                    </View>
                    <Text style={styles.quickLabel}>{item.label}</Text>
                  </TouchableOpacity>
              ))}
            </View>

            {/* 근처 산책로 */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>근처 산책로</Text>
              <TouchableOpacity>
                <Text style={styles.sectionAction}>더보기</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
              {walks.length > 0 ? walks.map(item => (
                  <TouchableOpacity
                      key={item.id}
                      style={styles.card}
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('WalkDetail', { id: item.id, token, lat: 37.6300742, lon: 127.0720532 })}
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
              )) : <Text style={{ paddingLeft: 16, color: '#888' }}>근처 산책로가 없습니다.</Text>}
            </ScrollView>

            <View style={styles.spacerLarge} />
          </ScrollView>

          {/* 하단 탭바 */}
          <View style={[styles.tabbar, { height: 64, paddingBottom: Math.max(4, insets.bottom), bottom: 12 }]}>
            {/* 홈 */}
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MainScreen')}>
              <Ionicons name="home" size={22} color={currentTab === '홈' ? "#4e7fff" : "#9aa0a6"} />
              <Text style={currentTab === '홈' ? styles.tabLabelActive : styles.tabLabel}>홈</Text>
            </TouchableOpacity>
            {/* 탐색 */}
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('ExploreScreen', { userId, token })}
            >
              <Ionicons name="map-outline" size={22} color={currentTab === '탐색' ? "#4e7fff" : "#9aa0a6"} />
              <Text style={currentTab === '탐색' ? styles.tabLabelActive : styles.tabLabel}>탐색</Text>
            </TouchableOpacity>
            {/* + */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                  style={styles.circleBtn}
                  onPress={() => navigation.navigate("WalkStartScreen", { userId, token })}
              >
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
            {/* 찜 */}
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('WishlistScreen')}>
              <Ionicons name="heart-outline" size={22} color={currentTab === '찜' ? "#4e7fff" : "#9aa0a6"} />
              <Text style={currentTab === '찜' ? styles.tabLabelActive : styles.tabLabel}>찜</Text>
            </TouchableOpacity>
            {/* 마이 */}
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MyScreen', { userId, token, nickname })}>
              <Ionicons name="person-outline" size={22} color={currentTab === '마이' ? "#4e7fff" : "#9aa0a6"} />
              <Text style={currentTab === '마이' ? styles.tabLabelActive : styles.tabLabel}>마이</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
}
