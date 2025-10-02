import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import { timeAgo } from "../../util/timeAgo";

export default function OneToOneDetailScreen({ route }) {
    const { postId, token } = route.params;
    const insets = useSafeAreaInsets();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [inputPw, setInputPw] = useState("");
    const [verified, setVerified] = useState(false);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);

    const BASE_URL =
        Platform.OS === "android"
            ? "http://192.168.45.62:8080"
            : "http://localhost:8080";

    useEffect(() => {
        fetch(`${BASE_URL}/posts/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (res) => {
                const text = await res.text();
                if (!res.ok) throw new Error(`서버 오류: ${res.status} - ${text}`);
                const data = JSON.parse(text);
                setPost(data);
                setLikeCount(data.likeCount);
                setLiked(data.likedByUser);
                if (data.postPassword) setShowPasswordModal(true);
                else setVerified(true);
            })
            .catch((err) => console.error("게시글 상세 조회 실패:", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (verified) {
            const fetchComments = () => {
                fetch(`${BASE_URL}/posts/${postId}/selectcomments`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then((res) => res.json())
                    .then(setComments)
                    .catch((err) => console.error("댓글 불러오기 실패:", err));
            };
            fetchComments();
            const interval = setInterval(fetchComments, 1000);
            return () => clearInterval(interval);
        }
    }, [verified]);

    const submitComment = () => {
        if (!newComment.trim()) return;
        fetch(`${BASE_URL}/posts/${postId}/insertcomment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: newComment }),
        })
            .then((res) => res.json())
            .then((ok) => {
                if (ok) setNewComment("");
            })
            .catch((err) => console.error("댓글 등록 실패:", err));
    };

    const submitReply = (parentCommentId) => {
        if (!replyContent.trim()) return;
        fetch(`${BASE_URL}/posts/${postId}/insertreply`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: replyContent, parentId: parentCommentId }),
        })
            .then((res) => res.json())
            .then((ok) => {
                if (ok) {
                    setReplyContent("");
                    setReplyTo(null);
                }
            })
            .catch((err) => console.error("답글 등록 실패:", err));
    };

    const toggleLike = () => {
        fetch(`${BASE_URL}/posts/${postId}/like`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((ok) => {
                if (ok) {
                    setLiked(!liked);
                    setLikeCount((prev) => prev + (liked ? -1 : 1));
                }
            })
            .catch((err) => console.error("좋아요 토글 실패:", err));
    };

    const checkPassword = () => {
        if (inputPw === post.postPassword) {
            setVerified(true);
            setShowPasswordModal(false);
        } else {
            Alert.alert("오류", "비밀번호가 틀렸습니다.");
        }
    };

    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    const renderReplies = (replies, depth = 1) => {
        return replies.map((r, idx) => (
            <View key={idx} style={[styles.replyItem, { marginLeft: depth * 20 }]}>
                <Ionicons
                    name="person-circle-outline"
                    size={26}
                    color="#ccc"
                    style={{ alignSelf: "flex-start", marginTop: -2 }}
                />
                <View style={{ marginLeft: 8, flex: 1 }}>
                    <Text style={styles.replyAuthor}>{r.nickname}</Text>
                    <Text style={styles.replyText}>{r.content}</Text>
                    <Text style={styles.replyTime}>{timeAgo(r.createdAt)}</Text>
                </View>
            </View>
        ));
    };

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            >
                <Modal visible={showPasswordModal} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitle}>비밀번호 입력</Text>
                            <TextInput
                                placeholder="비밀번호"
                                secureTextEntry
                                value={inputPw}
                                onChangeText={setInputPw}
                                style={styles.modalInput}
                            />
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: "#4e7fff" }]}
                                onPress={checkPassword}
                            >
                                <Text style={styles.modalButtonText}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {verified && post && (
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1, padding: 16 }}>
                            <View style={styles.postHeader}>
                                <Ionicons
                                    name="person-circle-outline"
                                    size={40}
                                    color="#4e7fff"
                                    style={{ alignSelf: "flex-start", marginTop: -2 }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.postUser}>{post.nickname}</Text>
                                    <Text style={styles.postTime}>{timeAgo(post.createdAt)}</Text>
                                </View>
                            </View>
                            <Text style={styles.postTitle}>{post.title}</Text>
                            {post.imageUrl && (
                                <Image source={{ uri: `${BASE_URL}/images/${post.imageUrl}` }} style={styles.postImage} />
                            )}
                            <Text style={styles.postContent}>{post.content}</Text>

                            {/* 좋아요 버튼 */}
                            <View style={styles.likeRow}>
                                <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
                                    <Ionicons
                                        name={liked ? "heart" : "heart-outline"}
                                        size={24}
                                        color={liked ? "#ff4d4d" : "#555"}
                                    />
                                    <Text style={styles.likeCount}>{likeCount}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* 댓글 섹션 */}
                            <View style={styles.commentSection}>
                                <Text style={styles.commentTitle}>댓글</Text>
                                {comments.map((c, idx) => (
                                    <View key={idx} style={styles.commentItem}>
                                        <Text style={styles.commentAuthor}>{c.nickname}</Text>
                                        <Text style={styles.commentText}>{c.content}</Text>
                                        <Text style={styles.commentTime}>{timeAgo(c.createdAt)}</Text>
                                        {c.replies && renderReplies(c.replies)}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
