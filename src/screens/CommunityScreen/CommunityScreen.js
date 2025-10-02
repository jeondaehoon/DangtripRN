import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { timeAgo } from '../../util/timeAgo';

const TABS = ['전체', '질문', '후기', '자유게시판', '산책모임', '1:1 질문'];

export default function CommunityScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('전체');
    const [postsList, setPostsList] = useState([]);
    const [groupsList, setGroupsList] = useState([]);
    const [fabOpen, setFabOpen] = useState(false);
    const { userId, nickname, token } = route.params || {};

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';


    useEffect(() => {
        console.log("CommunityScreen 받은 token:", token);
        if (activeTab === '산책모임') {
            fetch(`${BASE_URL}/walkgroups/list`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => setGroupsList(data))
                .catch(err => console.error("에러:", err));
        } else {
            const categoryParam = activeTab === '전체' ? '' : `?category=${activeTab}`;
            fetch(`${BASE_URL}/postsList${categoryParam}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setPostsList(data))
                .catch(err => console.error(err));
        }
    }, [activeTab]);

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>커뮤니티</Text>
            </View>

            {/* 탭 영역 */}
            <View style={styles.tabRow}>
                {TABS.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={styles.tabItem}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab}
                        </Text>
                        {activeTab === tab && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            {/* 피드 영역 */}
            <ScrollView style={styles.feed}>
                {activeTab === '산책모임' ? (
                    groupsList.map(group => (
                        <View key={group.groupId} style={styles.groupCard}>
                            <Text style={styles.groupTitle}>{group.title}</Text>
                            <View style={styles.groupRow}>
                                <Ionicons name="location-outline" size={16} color="#4e7fff" />
                                <Text style={styles.groupMeta}>{group.location}</Text>
                            </View>

                            {/* 닉네임 표시 */}
                            <View style={styles.groupRow}>
                                <Ionicons name="person-outline" size={16} color="#4e7fff" />
                                <Text style={styles.groupMeta}>{group.nickname}</Text>
                            </View>

                            {/* 참여 인원 */}
                            <View style={styles.groupRow}>
                                <Ionicons name="people-outline" size={16} color="#4e7fff" />
                                <Text style={styles.groupMeta}>참여인원: {group.memberCount}명</Text>
                            </View>

                            {/* 태그 */}
                            {group.tags && (
                                <View style={styles.groupRow}>
                                    <Ionicons name="pricetag-outline" size={16} color="#4e7fff" />
                                    <Text style={styles.groupMeta}>{group.tags}</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                style={styles.groupButton}
                                onPress={() =>
                                    navigation.navigate('WalkGroupDetailScreen', {
                                        groupId: group.groupId,
                                        nickname,
                                        userId,
                                        token,
                                    })
                                }
                            >
                                <Text style={styles.groupButtonText}>모임 보기</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    postsList
                        .filter(post => activeTab === "전체" || post.category === activeTab)
                        .map(post => (
                            <TouchableOpacity
                                key={post.postId}
                                onPress={() => {
                                    if (post.category === "1:1 질문") {
                                        navigation.navigate("OneToOneDetailScreen", {
                                            postId: post.postId,
                                            token,
                                        });
                                    } else {
                                        navigation.navigate("PostDetailScreen", {
                                            postId: post.postId,
                                            token,
                                        });
                                    }
                                }}
                            >
                                <View style={styles.postCard}>
                                    <View style={styles.postHeader}>
                                        <Ionicons name="person-circle-outline" size={28} color="#4e7fff" />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.postUser}>{post.nickname}</Text>
                                            <Text style={styles.postTime}>{timeAgo(post.createdAt)}</Text>
                                        </View>
                                        <Text style={styles.postCategory}>{post.category}</Text>
                                    </View>

                                    <Text style={styles.postContent} numberOfLines={2}>
                                        {post.content}
                                    </Text>

                                    <View style={styles.postFooter}>
                                        <Ionicons name="heart-outline" size={18} color="#444" />
                                        <Text style={styles.postMeta}>{post.likeCount}</Text>
                                        <Ionicons
                                            name="chatbubble-outline"
                                            size={18}
                                            color="#444"
                                            style={{ marginLeft: 12 }}
                                        />
                                        <Text style={styles.postMeta}>{post.commentCount}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                )}
            </ScrollView>

            {/* FAB 버튼 */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setFabOpen(!fabOpen)}
            >
                <Ionicons name={fabOpen ? "close" : "add"} size={28} color="#fff" />
            </TouchableOpacity>

            {fabOpen && (
                <View style={styles.fabMenu}>
                    <TouchableOpacity
                        style={styles.fabItem}
                        onPress={() => {
                            setFabOpen(false);
                            navigation.navigate("WritePostScreen", { userId, nickname, token });
                        }}
                    >
                        <Ionicons name="create-outline" size={18} color="#fff" />
                        <Text style={styles.fabItemText}>글쓰기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.fabItem}
                        onPress={() => {
                            setFabOpen(false);
                            navigation.navigate("WalkGroupScreen", { userId, nickname, token });
                        }}
                    >
                        <Ionicons name="people-outline" size={18} color="#fff" />
                        <Text style={styles.fabItemText}>모임 만들기</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}
