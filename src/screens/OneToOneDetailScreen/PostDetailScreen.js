import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import { timeAgo } from "../../util/timeAgo";

export default function PostDetailScreen({ route }) {
    const { postId, token, category } = route.params;
    const insets = useSafeAreaInsets();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
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

    // 게시글 상세 불러오기
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
            })
            .catch((err) => console.error("게시글 상세 조회 실패:", err))
            .finally(() => setLoading(false));
    }, []);

    // 댓글 불러오기
    useEffect(() => {
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
    }, []);

    // 댓글 등록
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

    // 답글 등록
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

    // 좋아요 토글
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

    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    // 재귀적으로 답글 렌더링
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
                    {replyTo === r.commentId && (
                        <View style={styles.replyInputRow}>
                            <TextInput
                                style={styles.replyInput}
                                placeholder="답글을 입력하세요..."
                                value={replyContent}
                                onChangeText={setReplyContent}
                            />
                            <TouchableOpacity
                                style={styles.replyButtonSubmit}
                                onPress={() => submitReply(r.commentId)}
                            >
                                <Text style={styles.replyButtonText}>등록</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {r.replies && r.replies.length > 0 && renderReplies(r.replies, depth + 1)}
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
                {post && (
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1, padding: 16 }} keyboardShouldPersistTaps="handled">
                            {/* 게시글 헤더 */}
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

                            {/* 제목 / 본문 */}
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

                            {/* 댓글 */}
                            <View style={styles.commentSection}>
                                <Text style={styles.commentTitle}>댓글</Text>
                                {comments.map((c, idx) => (
                                    <View key={idx} style={styles.commentItem}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Ionicons
                                                name="person-circle-outline"
                                                size={32}
                                                color="#bbb"
                                                style={{ alignSelf: "flex-start", marginTop: -2 }}
                                            />
                                            <View style={{ marginLeft: 8, flex: 1 }}>
                                                <Text style={styles.commentAuthor}>{c.nickname}</Text>
                                                <Text style={styles.commentText}>{c.content}</Text>
                                                <Text style={styles.commentTime}>{timeAgo(c.createdAt)}</Text>
                                                <TouchableOpacity onPress={() => setReplyTo(c.commentId)}>
                                                    <Text style={styles.replyButton}>답글 달기</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {replyTo === c.commentId && (
                                            <View style={styles.replyInputRow}>
                                                <TextInput
                                                    style={styles.replyInput}
                                                    placeholder="답글을 입력하세요..."
                                                    value={replyContent}
                                                    onChangeText={setReplyContent}
                                                />
                                                <TouchableOpacity
                                                    style={styles.replyButtonSubmit}
                                                    onPress={() => submitReply(c.commentId)}
                                                >
                                                    <Text style={styles.replyButtonText}>등록</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {c.replies && c.replies.length > 0 && renderReplies(c.replies, 1)}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        {/* 댓글 입력창 */}
                        <View style={styles.commentInputRow}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="댓글을 입력하세요..."
                                value={newComment}
                                onChangeText={setNewComment}
                            />
                            <TouchableOpacity style={styles.commentButton} onPress={submitComment}>
                                <Text style={styles.commentButtonText}>등록</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
