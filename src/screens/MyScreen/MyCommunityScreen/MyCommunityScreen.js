import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./myCommunityStyles";

export default function MyCommunityScreen({ route, navigation }) {
    const { token, userId } = route.params; // 로그인 시 전달받은 userId, token
    const [activeTab, setActiveTab] = useState("posts");
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const BASE_URL =
        Platform.OS === "android"
            ? "http://192.168.45.62:8080"
            : "http://localhost:8080";

    // 내 글 불러오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/community/myposts/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setPosts(res.data);
            } catch (err) {
                console.error("내 글 불러오기 실패:", err);
            }
        };
        fetchPosts();
    }, [userId, token]);

    // 내 댓글 불러오기
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/community/mycomments/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setComments(res.data);
            } catch (err) {
                console.error("내 댓글 불러오기 실패:", err);
            }
        };
        fetchComments();
    }, [userId, token]);

    // 내 글 카드
    const renderPost = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("PostDetailScreen", {
                    postId: item.postId,
                    token: token,
                })
            }
        >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPreview} numberOfLines={2}>
                {item.content}
            </Text>
            <View style={styles.cardFooter}>
                <Text style={styles.cardDate}>{item.createdAt}</Text>
                <View style={styles.footerIcons}>
                    <Ionicons name="heart-outline" size={16} color="#e53935" />
                    <Text style={styles.footerText}>{item.likeCount}</Text>
                    <Ionicons
                        name="chatbubble-outline"
                        size={16}
                        color="#4e7fff"
                        style={{ marginLeft: 12 }}
                    />
                    <Text style={styles.footerText}>{item.commentCount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    // 내 댓글 카드
    const renderComment = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("PostDetailScreen", {
                    postId: item.postId,
                    token: token,
                })
            }
        >
            <View
                style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}
            >
                <Ionicons
                    name="chatbubble-outline"
                    size={18}
                    color="#4e7fff"
                    style={{ marginRight: 6 }}
                />
                <Text style={styles.cardPreview}>{item.content}</Text>
            </View>
            <Text style={styles.cardSub}>↳ {item.postTitle}</Text>
            <Text style={styles.cardDate}>{item.createdAt}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>내 커뮤니티 활동</Text>
            </View>

            {/* 탭 */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "posts" && styles.tabActive]}
                    onPress={() => setActiveTab("posts")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "posts" && styles.tabTextActive,
                        ]}
                    >
                        내 글
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === "comments" && styles.tabActive,
                    ]}
                    onPress={() => setActiveTab("comments")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "comments" && styles.tabTextActive,
                        ]}
                    >
                        내 댓글
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 리스트 */}
            {activeTab === "posts" ? (
                <View style={styles.contentWrapper}>
                    <FlatList
                        data={posts}
                        keyExtractor={(item) => item.postId.toString()}
                        renderItem={renderPost}
                    />
                </View>
            ) : (
                <View style={styles.contentWrapper}>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.commentId.toString()}
                        renderItem={renderComment}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}
