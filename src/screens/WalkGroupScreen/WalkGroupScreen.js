import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Modal, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import locations from '../../data/locations.json';
import styles from './styles';

export default function WalkGroupScreen({ navigation, route }) {
    const { userId, nickname, token } = route.params || {};

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    // 일정 관련 state
    const [selectedDays, setSelectedDays] = useState([]);   // 여러 요일 선택
    const [time, setTime] = useState(new Date());
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    const tags = [
        { label: '소형견만 가능', icon: 'paw-outline' },
        { label: '대형견만 가능', icon: 'paw-outline' },
        { label: '소심이', icon: 'alert-circle-outline' },
        { label: '활발', icon: 'flash-outline' },
        { label: '초보 보호자', icon: 'happy-outline' },
        { label: '베테랑 보호자', icon: 'school-outline' },
        { label: '아침 산책', icon: 'sunny-outline' },
        { label: '저녁 산책', icon: 'moon-outline' },
        { label: '주말 모임', icon: 'calendar-outline' },
        { label: '실내 가능', icon: 'home-outline' },
        { label: '첫만남 환영', icon: 'hand-left-outline' },
        { label: '정기 모임', icon: 'repeat-outline' },
        { label: '근처 동네', icon: 'map-outline' },
    ];

    const days = ["월요일","화요일","수요일","목요일","금요일","토요일","일요일","매일"];

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleAddImage = () => {
        Alert.alert('사진 추가', '어디서 가져올까요?', [
            {
                text: '카메라',
                onPress: () => {
                    launchCamera({ mediaType: 'photo', quality: 0.8 }, res => {
                        if (res.assets) {
                            const uris = res.assets.map(a => a.uri);
                            setImages([uris[0]]);
                        }
                    });
                },
            },
            {
                text: '갤러리',
                onPress: () => {
                    launchImageLibrary({ mediaType: 'photo', quality: 0.8, selectionLimit: 1 }, res => {
                        if (res.assets) {
                            const uris = res.assets.map(a => a.uri);
                            setImages([uris[0]]);
                        }
                    });
                },
            },
            { text: '취소', style: 'cancel' },
        ]);
    };

    const meetingDays = selectedDays.join(", ");
    const meetingTime = `${time.getHours() < 12 ? "오전" : "오후"} ${time.getHours() % 12 || 12}시 ${time.getMinutes().toString().padStart(2, "0")}분`;

    const handleConfirmTime = (selected) => {
        setTimePickerVisible(false);
        if (selected) setTime(selected);
    };

    const handleCreate = async () => {
        if (!title || !location) {
            Alert.alert("필수 입력", "모임 이름과 위치는 반드시 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("walkGroup", {
            string: JSON.stringify({
                title,
                description,
                location,
                detailAddress,
                meetingDays,
                meetingTime,
                tags: selectedTags,
                creatorId: userId,
            }),
            type: "application/json",
        });

        if (images.length > 0) {
            formData.append("image", {
                uri: images[0],
                type: "image/jpeg",
                name: "walkgroup.jpg",
            });
        }

        try {
            const response = await fetch(`${BASE_URL}/walkgroups/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                Alert.alert("성공", "새 산책모임이 생성되었습니다.");
                navigation.goBack();
            } else {
                const errorText = await response.text();
                console.log("에러 응답:", errorText);
                Alert.alert("실패", "모임 생성에 실패했습니다.");
            }
        } catch (err) {
            console.error("모임 생성 오류:", err);
            Alert.alert("에러", "네트워크 오류가 발생했습니다.");
        }
    };

    const cities = [...new Set(locations.map(item => item.city))];
    const districts = selectedCity
        ? [...new Set(locations.filter(item => item.city === selectedCity).map(item => item.district))]
        : [];
    const neighborhoods = selectedDistrict
        ? [...new Set(locations.filter(item => item.city === selectedCity && item.district === selectedDistrict).map(item => item.neighborhood))]
        : [];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>산책모임 만들기</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.formContainer}>
                {/* 대표 사진 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>대표 사진</Text>
                    <View style={styles.imageUploadBox}>
                        {images.length > 0 ? (
                            <View style={styles.imageWrapperLarge}>
                                <Image source={{ uri: images[0] }} style={styles.previewImage} />
                                <TouchableOpacity
                                    style={styles.removeImageBtnLarge}
                                    onPress={() => setImages([])}
                                >
                                    <Ionicons name="close-circle" size={28} color="red" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.imagePlaceholder} onPress={handleAddImage}>
                                <Ionicons name="camera-outline" size={40} color="#aaa" />
                                <Text style={styles.imagePlaceholderText}>사진 추가</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* 모임 이름 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>모임 이름</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="예: 노원 강아지 아침 산책"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* 모임 위치 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>모임 위치</Text>
                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ fontSize: 16, color: location ? '#000' : '#999' }}>
                            {location || "위치를 선택해주세요"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 위치 선택 모달 */}
                <Modal visible={modalVisible} animationType="slide">
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (step === 1) setModalVisible(false);
                                    else if (step === 2) {
                                        setStep(1);
                                        setSelectedCity('');
                                    } else if (step === 3) {
                                        setStep(2);
                                        setSelectedDistrict('');
                                    }
                                }}
                            >
                                <Ionicons name="arrow-back" size={24} color="#111" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>
                                {step === 1 && "시/도 선택"}
                                {step === 2 && `${selectedCity} - 구 선택`}
                                {step === 3 && `${selectedDistrict} - 동 선택`}
                            </Text>
                            <View style={{ width: 24 }} />
                        </View>

                        {step === 1 && (
                            <FlatList
                                data={cities}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.listItem}
                                        onPress={() => {
                                            setSelectedCity(item);
                                            setStep(2);
                                        }}
                                    >
                                        <Ionicons name="location-outline" size={20} color="#4e7fff" style={{ marginRight: 8 }} />
                                        <Text style={styles.listItemText}>{item}</Text>
                                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                                    </TouchableOpacity>
                                )}
                            />
                        )}

                        {step === 2 && (
                            <FlatList
                                data={districts}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.listItem}
                                        onPress={() => {
                                            setSelectedDistrict(item);
                                            setStep(3);
                                        }}
                                    >
                                        <Ionicons name="business-outline" size={20} color="#4e7fff" style={{ marginRight: 8 }} />
                                        <Text style={styles.listItemText}>{item}</Text>
                                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                                    </TouchableOpacity>
                                )}
                            />
                        )}

                        {step === 3 && (
                            <FlatList
                                data={neighborhoods}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.listItem}
                                        onPress={() => {
                                            const full = `${selectedCity} ${selectedDistrict} ${item}`;
                                            setLocation(full);
                                            setModalVisible(false);
                                            setStep(1);
                                        }}
                                    >
                                        <Ionicons name="home-outline" size={20} color="#4e7fff" style={{ marginRight: 8 }} />
                                        <Text style={styles.listItemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </SafeAreaView>
                </Modal>

                {/* 상세 주소 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>상세 주소</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="예: OOO 공원"
                        value={detailAddress}
                        onChangeText={setDetailAddress}
                    />
                </View>

                {/* 모임 요일 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>모임 요일</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 }}>
                        {days.map(day => (
                            <TouchableOpacity
                                key={day}
                                style={[
                                    styles.dayButton,
                                    selectedDays.includes(day) && styles.daySelected
                                ]}
                                onPress={() => toggleDay(day)}
                            >
                                <Text style={selectedDays.includes(day) ? styles.dayTextSelected : styles.dayText}>
                                    {day}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 모임 시간 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>모임 시간</Text>
                    <TouchableOpacity onPress={() => setTimePickerVisible(true)} style={styles.inputBox}>
                        <Text style={{ fontSize: 16, color: '#000' }}>
                            {meetingTime}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ marginLeft: 16, marginBottom: 10, color: '#555' }}>
                    설정된 일정: 매주 {meetingDays || "요일 선택 안 함"} {meetingTime}
                </Text>

                {/* 모임 설명 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>모임 설명</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="모임에 대한 소개를 작성해주세요"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                {/* 태그 선택 */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>태그 선택</Text>
                    <View style={styles.tagsContainer}>
                        {tags.map(tag => (
                            <TouchableOpacity
                                key={tag.label}
                                style={[styles.tag, selectedTags.includes(tag.label) && styles.tagSelected]}
                                onPress={() => toggleTag(tag.label)}
                            >
                                <Ionicons
                                    name={tag.icon}
                                    size={16}
                                    color={selectedTags.includes(tag.label) ? '#fff' : '#4e7fff'}
                                    style={{ marginRight: 4 }}
                                />
                                <Text
                                    style={[
                                        styles.tagText,
                                        selectedTags.includes(tag.label) && styles.tagTextSelected,
                                    ]}
                                >
                                    {tag.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 제출 버튼 */}
                <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                    <Text style={styles.submitButtonText}>모임 만들기</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* 시간 선택 모달 */}
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={() => setTimePickerVisible(false)}
                headerTextIOS="시간 선택"
            />
        </SafeAreaView>
    );
}
