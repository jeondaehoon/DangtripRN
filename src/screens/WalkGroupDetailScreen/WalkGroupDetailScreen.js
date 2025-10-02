import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    Modal,
    TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';

export default function WalkGroupDetailScreen({ navigation, route }) {
    const { groupId, token } = route.params || {};
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);

    const [noticeModalVisible, setNoticeModalVisible] = useState(false);
    const [galleryModalVisible, setGalleryModalVisible] = useState(false);

    const [noticeInput, setNoticeInput] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [notices, setNotices] = useState([]);
    const [gallery, setGallery] = useState([]);


    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    const getImageSource = (item) => {
        const url = item.imageUrl ? `${BASE_URL}/images/${item.imageUrl}` : null;
        return item.imageUrl
            ? { uri: url }
            : require('../../../assets/images/FreefitAppLogo.png');
    };

    useEffect(() => {
        const fetchGroupDetail = async () => {
            try {
                const response = await fetch(`${BASE_URL}/walkgroups/${groupId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setGroup(data);
                }
            } catch (error) {
                console.error("API 요청 에러:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroupDetail();
    }, [groupId]);

    useEffect(() => {
        fetchNotices();
        fetchGallery();
    }, [groupId]);

    const fetchNotices = async () => {
        try {
            const res = await fetch(`${BASE_URL}/walkgroups/${groupId}/selectnotice`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setNotices(data);
        } catch (err) { }
    };

    const fetchGallery = async () => {
        try {
            const res = await fetch(`${BASE_URL}/walkgroups/${groupId}/selectgallery`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setGallery(data);
        } catch (err) { }
    };

    const saveNotice = async () => {
        try {
            const res = await fetch(`${BASE_URL}/walkgroups/${groupId}/notice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ notice: noticeInput }),
            });

            if (res.ok) {
                alert('공지사항 등록 완료');
                setNoticeInput("");
                setNoticeModalVisible(false);
                fetchNotices();
            }
        } catch (err) {
            console.error('공지사항 등록 에러:', err);
        }
    };

    const uploadImages = async () => {
        const formData = new FormData();
        selectedImages.forEach((uri, index) => {
            formData.append('images', {
                uri,
                type: 'image/jpeg',
                name: `img_${Date.now()}_${index}.jpg`,
            });
        });

        try {
            const res = await fetch(`${BASE_URL}/walkgroups/${groupId}/gallery`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (res.ok) {
                alert('사진 등록 완료');
                setSelectedImages([]);
                setGalleryModalVisible(false);
                fetchGallery();
            }
        } catch (err) {
            console.error('사진 등록 에러:', err);
        }
    };

    const pickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 0,
        });

        if (!result.didCancel && result.assets && result.assets.length > 0) {
            setSelectedImages(prev => [
                ...prev,
                ...result.assets.map(asset => asset.uri),
            ]);
        }
    };

    const [joining, setJoining] = useState(false);

    const joinChatRoom = async () => {
        if (joining) return;
        setJoining(true);
        console.log("=== joinChatRoom 시작 ===", groupId, token);

        try {
            const res = await fetch(`${BASE_URL}/chat/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ groupId }),
            });

            const text = await res.text();
            console.log("응답 상태:", res.status, "응답 OK:", res.ok);
            console.log("응답 내용:", text);

            if (res.ok) {
                const data = JSON.parse(text);
                navigation.navigate("ChatScreen", {
                    groupId: data.roomId,
                    token,
                    groupTitle: group.title,
                });
            } else {
                alert(`참여 실패: ${res.status}`);
            }
        } catch (err) {
            console.error("참여하기 에러:", err);
            alert("참여 중 오류 발생");
        } finally {
            setJoining(false);
        }
    };


    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#4e7fff" />
            </View>
        );
    }

    if (!group) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>그룹 정보를 불러오지 못했습니다.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{group.title}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}>
                {group.imageUrl && (
                    <Image
                        source={getImageSource(group)}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                )}

                {group.description && <Text style={styles.description}>{group.description}</Text>}

                {group.location && (
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={18} color="#4e7fff" />
                        <Text style={styles.infoText}>{group.location}</Text>
                    </View>
                )}
                {group.detailAddress && (
                    <View style={styles.infoRow}>
                        <Ionicons name="home-outline" size={18} color="#4e7fff" />
                        <Text style={styles.infoText}>{group.detailAddress}</Text>
                    </View>
                )}

                {group.meetingDays && group.meetingTime && (
                    <View style={styles.infoRow}>
                        <Ionicons name="calendar-outline" size={18} color="#4e7fff" />
                        <Text style={styles.infoText}>
                            {group.meetingDays} / {group.meetingTime}
                        </Text>
                    </View>
                )}

                <View style={styles.infoRow}>
                    <Ionicons name="people-outline" size={18} color="#4e7fff" />
                    <Text style={styles.infoText}>참여자 {group.memberCount || 0}명</Text>
                </View>

                {group.tags && group.tags.length > 0 && (
                    <View style={styles.tagContainer}>
                        {group.tags.map((tag, idx) => (
                            <View key={idx} style={styles.tag}>
                                <Ionicons
                                    name={tag.iconName || 'pricetag-outline'}
                                    size={16}
                                    color="#4e7fff"
                                    style={{ marginRight: 4 }}
                                />
                                <Text style={styles.tagText}>{tag.tagName}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <Text style={styles.sectionTitle}>공지사항</Text>
                {notices.map((n, idx) => (
                    <View key={idx} style={styles.noticeBox}>
                        <Text style={styles.noticeText}>{n.content}</Text>
                    </View>
                ))}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setNoticeModalVisible(true)}
                >
                    <Ionicons name="add-circle-outline" size={20} color="#4e7fff" />
                    <Text style={styles.addButtonText}>공지사항 등록</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>최근 사진</Text>
                <View style={styles.galleryRow}>
                    {gallery.map((g, idx) => (
                        <Image
                            key={idx}
                            source={getImageSource(g)}
                            style={styles.galleryImage}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setGalleryModalVisible(true)}
                >
                    <Ionicons name="add-circle-outline" size={20} color="#4e7fff" />
                    <Text style={styles.addButtonText}>사진 등록</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.joinButton} onPress={joinChatRoom}>
                    <Text style={styles.joinButtonText}>참여하기</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={noticeModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>공지사항 등록</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="공지 내용을 입력하세요"
                            value={noticeInput}
                            onChangeText={setNoticeInput}
                        />
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonPrimary]}
                                onPress={saveNotice}
                            >
                                <Text style={styles.modalButtonText}>등록</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonSecondary]}
                                onPress={() => setNoticeModalVisible(false)}
                            >
                                <Text style={styles.modalButtonTextSecondary}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={galleryModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>사진 등록</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.galleryScroll}
                        >
                            <TouchableOpacity style={styles.addPhotoBox} onPress={pickImage}>
                                <Ionicons name="camera-outline" size={32} color="#999" />
                                <Text style={styles.addPhotoText}>추가</Text>
                            </TouchableOpacity>

                            {selectedImages.map((uri, idx) => (
                                <View key={idx} style={styles.thumbnailWrapper}>
                                    <Image source={{ uri }} style={styles.thumbnail} />
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() =>
                                            setSelectedImages(prev =>
                                                prev.filter((_, i) => i !== idx)
                                            )
                                        }
                                    >
                                        <Ionicons name="close" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonPrimary]}
                                onPress={uploadImages}
                            >
                                <Text style={styles.modalButtonText}>등록</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonSecondary]}
                                onPress={() => {
                                    setGalleryModalVisible(false);
                                    setSelectedImages([]);
                                }}
                            >
                                <Text style={styles.modalButtonTextSecondary}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
