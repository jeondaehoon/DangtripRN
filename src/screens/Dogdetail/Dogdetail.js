import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { getRequestWithToken, putRequestWithToken, deleteRequestWithToken } from '../../util/api';
import DogNoteModalDetail from "../Dogdetail/DogNoteModal";

const { width, height } = Dimensions.get('window');

export default function DogDetail({ route, navigation }) {
    const { token, dogId } = route.params;
    const [dog, setDog] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        dogName: '',
        dogAge: '',
        dogGender: '',
        breedName: '',
        dogNote: '',
        hasDog: ''
    });

    const [statusModalVisible, setStatusModalVisible] = useState(false);

    useEffect(() => {
        const fetchDogDetail = async () => {
            try {
                const res = await getRequestWithToken(`/dogdetail/${dogId}`, token);
                if (Array.isArray(res) && res.length > 0) {
                    setDog(res[0]);
                    setForm(res[0]);
                }
            } catch (err) {
                console.error('반려견 상세 불러오기 실패:', err);
            }
        };
        fetchDogDetail();
    }, [dogId, token]);

    const handleUpdate = async () => {
        try {
            await putRequestWithToken(`/update`, form, token);
            Alert.alert('성공', '반려견 정보가 수정되었습니다.');
            setEditMode(false);
            setDog(form);
        } catch (err) {
            Alert.alert('오류', '수정 실패');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            '삭제 확인',
            '정말로 이 반려견 정보를 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteRequestWithToken(`/doginfo/delete/${dogId}`, token);
                            Alert.alert('삭제 완료', '반려견 정보가 삭제되었습니다.');
                            navigation.goBack();
                        } catch (err) {
                            Alert.alert('오류', '삭제 실패');
                            console.error(err);
                        }
                    }
                }
            ]
        );
    };

    if (!dog) return (
        <View style={{ flex: 1, backgroundColor: '#667eea', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.loading}>로딩중...</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {/* 배경 */}
            <View style={styles.backgroundGradient} />

            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>반려견 상세</Text>
                <View style={{ width: 44 }} />
            </View>

            {/* 본문 */}
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <View style={styles.profileCard}>
                    <View style={styles.statusIndicator} />

                    {/* 아바타 */}
                    <View style={[
                        styles.avatar,
                        dog.dogGender === 'female' ? styles.avatarPink : styles.avatarBlue
                    ]}>
                        <Ionicons
                            name={dog.dogGender === 'female' ? 'female' : 'male'}
                            size={56}
                            color="#fff"
                        />
                    </View>

                    {/* 이름 */}
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={form.dogName}
                            onChangeText={text => setForm({ ...form, dogName: text })}
                            placeholder="반려견 이름"
                            placeholderTextColor="#9ca3af"
                        />
                    ) : (
                        <View style={styles.infoRow}>
                            <Ionicons name="paw" size={20} color="#6366f1" />
                            <Text style={styles.infoText}>{dog.dogName}</Text>
                        </View>
                    )}

                    {/* 나이 */}
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={form.dogAge?.toString()}
                            onChangeText={text => setForm({ ...form, dogAge: text })}
                            placeholder="나이"
                            placeholderTextColor="#9ca3af"
                            keyboardType="numeric"
                        />
                    ) : (
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar" size={20} color="#6366f1" />
                            <Text style={styles.infoText}>{dog.dogAge}살</Text>
                        </View>
                    )}

                    {/* 품종 */}
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={form.breedName}
                            onChangeText={text => setForm({ ...form, breedName: text })}
                            placeholder="품종"
                            placeholderTextColor="#9ca3af"
                        />
                    ) : (
                        <View style={styles.infoRow}>
                            <Ionicons name="paw" size={20} color="#6366f1" />
                            <Text style={styles.infoText}>{dog.breedName}</Text>
                        </View>
                    )}

                    {/* 건강 상태 */}
                    {editMode ? (
                        <TouchableOpacity
                            style={styles.infoRow}
                            onPress={() => setStatusModalVisible(true)}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="heart" size={20} color="#6366f1" />
                            <Text
                                selectable={false}
                                allowFontScaling={false}
                                style={[styles.infoText, { color: form.dogNote ? '#000' : '#9ca3af' }]}
                            >
                                {form.dogNote && form.dogNote.trim() !== ""
                                    ? form.dogNote
                                    : "상태를 등록해주세요"}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.infoRow}>
                            <Ionicons name="heart" size={20} color="#6366f1" />
                            <Text style={styles.infoText}>
                                {dog.dogNote && dog.dogNote.trim() !== ""
                                    ? dog.dogNote
                                    : "상태가 등록되지 않았습니다"}
                            </Text>
                        </View>
                    )}

                    {/* 등록 여부 */}
                    <View style={styles.infoRow}>
                        <Ionicons name="shield-checkmark" size={20} color="#6366f1" />
                        <Text style={styles.infoText}>
                            {dog.hasDog === 'Y' ? '등록 완료' : '미등록'}
                        </Text>
                    </View>

                    {/* 버튼 */}
                    {editMode ? (
                        <>
                            <TouchableOpacity style={styles.primaryBtn} onPress={handleUpdate}>
                                <Text style={styles.btnText}>저장하기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.dangerBtn, { backgroundColor: '#6b7280' }]}
                                onPress={() => setEditMode(false)}
                            >
                                <Text style={styles.btnText}>취소</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.primaryBtn} onPress={() => setEditMode(true)}>
                                <Text style={styles.btnText}>정보 수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dangerBtn} onPress={handleDelete}>
                                <Text style={styles.btnText}>삭제</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>

            {/* 선택 모달 */}
            <DogNoteModalDetail
                isVisible={statusModalVisible}
                onClose={() => setStatusModalVisible(false)}
                onSelect={(selectedNote) => {
                    setForm({ ...form, dogNote: selectedNote });
                    setStatusModalVisible(false);
                }}
                defaultValue={form.dogNote || ""}
            />
        </View>
    );
}