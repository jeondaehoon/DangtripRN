import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { getRequestWithToken } from "../../util/api";

export default function TrainingScreen({ route, navigation }) {
    const { userId, nickname, token } = route.params;

    const [trainings, setTrainings] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = ['기초 훈련', '문제 행동 교정', '사회화', '심화 훈련'];

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    // API 요청
    const fetchTrainings = async (category = null) => {
        try {
            const url = category
                ? `/trainings?category=${encodeURIComponent(category)}`
                : '/trainings';
            const res = await getRequestWithToken(url, token);
            setTrainings(res);
        } catch (err) {
            console.error("훈련 불러오기 실패:", err);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, [token]);

    const getImageSource = (item) => {
        const url = item.imageUrl ? `${BASE_URL}/images/${item.imageUrl}` : null;
        return item.imageUrl
            ? { uri: url }
            : require('../../../assets/images/FreefitAppLogo.png');
    };

    const renderTrainingCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('TrainingDetail', { id: item.id, token })}
        >
            <Image source={getImageSource(item)} style={styles.cardImage} resizeMode="contain"/>
            <View style={styles.cardBody}>
                <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardMetaRow}>
                    <Ionicons name="time-outline" size={14} color="#4e7fff" />
                    <Text style={styles.cardMetaText}>{item.duration}</Text>
                    <View style={styles.dot} />
                    <Ionicons name="barbell-outline" size={14} color="#4e7fff" />
                    <Text style={styles.cardMetaText}>{item.trainingLevel}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor="#4e7fff" />
            <View style={styles.screen}>

                {/* 헤더 */}
                <View style={styles.hero}>
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
                            placeholder="훈련 검색 (앉아, 기다려...)"
                            placeholderTextColor="#9aa0a6"
                            editable={false}
                        />
                        <Ionicons name="options-outline" size={18} color="#9aa0a6" />
                    </View>
                </View>

                {/* 카테고리 칩 */}
                <View style={styles.categoryRow}>
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryChip,
                                selectedCategory === cat && styles.categoryChipActive
                            ]}
                            onPress={() => {
                                setSelectedCategory(cat);
                                fetchTrainings(cat);
                            }}
                        >
                            <Text
                                style={[
                                    styles.categoryChipText,
                                    selectedCategory === cat && styles.categoryChipTextActive
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 훈련 리스트*/}
                <FlatList
                    data={trainings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderTrainingCard}
                    numColumns={1}   // ✅ 한 열에 하나씩
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </SafeAreaView>
    );
}
