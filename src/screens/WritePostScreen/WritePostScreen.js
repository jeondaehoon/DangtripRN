import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Platform, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';

//BASE_URL 설정
const BASE_URL =
    Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

const CATEGORIES = ['질문', '후기', '자유게시판', '1:1 질문'];

const GUIDE_TEXT = {
    질문: " 질문 작성 가이드\n- 질문 배경을 간단히 설명해주세요\n- 반려견 정보(나이, 견종, 상태)를 포함하면 좋아요\n- 구체적으로 묻고 싶은 포인트를 정리해주세요",
    후기: " 후기 작성 가이드\n- 방문한 날짜/시간대를 적어주세요\n- 좋았던 점과 아쉬웠던 점을 함께 적어주세요\n- 반려견이 이용하기 편했는지도 알려주세요",
    자유게시판: " 자유게시판 작성 가이드\n- 오늘 있었던 일이나 반려견 자랑을 자유롭게 공유하세요\n- 사진 첨부도 환영합니다 🐶",
    '1:1 질문': "" +
        " 1:1 질문 작성 가이드\n- 앱 오류 신고, 개선 요청, 계정 문제 등을 적어주세요\n- 언제, 어디서, 어떤 문제가 있었는지 구체적으로 알려주세요\n- 스크린샷 첨부 가능",
};

export default function WritePostScreen({ navigation, route }) {
    const { userId, token, nickname } = route.params || {};
    const [selectedCategory, setSelectedCategory] = useState('질문');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [secretPassword, setSecretPassword] = useState('');

    // 이미지 추가 (카메라 / 갤러리)
    const handleAddImage = () => {
        Alert.alert('사진 추가', '어디서 가져올까요?', [
            {
                text: '카메라',
                onPress: () => {
                    launchCamera({ mediaType: 'photo', quality: 0.8 }, res => {
                        if (res.assets) {
                            const uris = res.assets.map(a => a.uri);
                            setImages(prev => [...prev, ...uris]);
                        }
                    });
                },
            },
            {
                text: '갤러리',
                onPress: () => {
                    launchImageLibrary(
                        { mediaType: 'photo', quality: 0.8, selectionLimit: 0 },
                        res => {
                            if (res.assets) {
                                const uris = res.assets.map(a => a.uri);
                                setImages(prev => [...prev, ...uris]);
                            }
                        },
                    );
                },
            },
            { text: '취소', style: 'cancel' },
        ]);
    };

    // 글 등록
    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('알림', '제목과 내용을 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('category', selectedCategory);
        formData.append('title', title);
        formData.append('content', content);
        if (selectedCategory === '1:1 질문') {
            formData.append('isPrivate', 'Y');
            formData.append('postPassword', secretPassword);
        } else {
            formData.append('isPrivate', 'N');
        }

        images.forEach((uri, index) => {
            formData.append('images', {
                uri,
                type: 'image/jpeg',
                name: `img_${Date.now()}_${index}.jpg`,
            });
        });

        try {
            const res = await fetch(`${BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const text = await res.text();
            if (text === 'true') {
                Alert.alert('완료', '게시글이 등록되었습니다.');
                navigation.goBack();
            } else {
                Alert.alert('에러', '등록 실패');
            }
        } catch (e) {
            console.error(e);
            Alert.alert('네트워크 오류', '서버와 연결 실패');
        }
    };

    return (
        <View style={styles.safeArea}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>글쓰기</Text>
                <TouchableOpacity onPress={handleSubmit}>
                    <Ionicons name="checkmark" size={24} color="#4e7fff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>
                {/* 카테고리 선택 */}
                <View style={styles.categoryRow}>
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryItem,
                                selectedCategory === cat && styles.categoryItemActive,
                            ]}
                            onPress={() => setSelectedCategory(cat)}>
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === cat && styles.categoryTextActive,
                                ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 가이드 */}
                <View style={styles.guideBox}>
                    <Text style={styles.guideText}>{GUIDE_TEXT[selectedCategory]}</Text>
                </View>

                {/* 비밀글 비밀번호 */}
                {selectedCategory === '1:1 질문' && (
                    <TextInput
                        style={styles.secretInput}
                        placeholder="비밀번호 입력"
                        secureTextEntry
                        value={secretPassword}
                        onChangeText={setSecretPassword}
                    />
                )}

                {/* 제목 */}
                <TextInput
                    style={styles.titleInput}
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* 내용 */}
                <TextInput
                    style={styles.contentInput}
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChangeText={setContent}
                    multiline
                />

                {/* 이미지 업로드 */}
                <View style={styles.imageUploadRow}>
                    {images.map((img, i) => (
                        <View key={i} style={styles.imageWrapper}>
                            <Image source={{ uri: img }} style={styles.uploadImage} />
                            <TouchableOpacity
                                style={styles.removeImageBtn}
                                onPress={() =>
                                    setImages(prev => prev.filter((_, idx) => idx !== i))
                                }>
                                <Ionicons name="close-circle" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addImageBtn} onPress={handleAddImage}>
                        <Ionicons name="camera-outline" size={24} color="#4e7fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
