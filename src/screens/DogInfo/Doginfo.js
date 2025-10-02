import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import debounce from 'lodash.debounce';
import DogBreedModal from '../../screens/DogInfo/DogBreedModaal';
import DogNoteModal from '../../screens/DogInfo/DogNoteModal';
import styles from './styles';
import { postRequest } from "../../util/api";

export default function Doginfo({ navigation, route }) {
    const { userId } = route.params;

    const [nickName, setNickName] = useState('');
    const [dogs, setDogs] = useState([
        { id: uuid.v4(), name: '', breedId: null, breedName: '', age: '', weight: '', gender: 'male', note: '', personality: '', hasDog: '' }
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
    const [currentDogId, setCurrentDogId] = useState(null);
    const [hasDog, setHasDog] = useState(null);

    const addDog = () => {
        setDogs([
            ...dogs,
            { id: uuid.v4(), name: '', breedId: null, breedName: '', age: '', weight: '', gender: 'male', note: '', personality: '' }
        ]);
    };

    const removeDog = (id) => {
        setDogs(dogs.filter(dog => dog.id !== id));
    };

    const updateDog = (id, key, value) => {
        setDogs(dogs.map(dog => {
            if (dog.id === id) {
                if (key === 'breed') {
                    return { ...dog, breedId: value.id, breedName: value.name };
                }
                return { ...dog, [key]: value };
            }
            return dog;
        }));
    };

    const openBreedModal = (dogId) => {
        setCurrentDogId(dogId);
        setIsModalVisible(true);
    };

    const handleSelectBreed = (breedInfo) => {
        if (currentDogId) {
            updateDog(currentDogId, 'breed', breedInfo);
        }
        setIsModalVisible(false);
    };

    const openNoteModal = (dogId) => {
        setCurrentDogId(dogId);
        setIsNoteModalVisible(true);
    };

    const handleSelectNote = (note) => {
        if (currentDogId) {
            updateDog(currentDogId, 'note', note);
        }
        setIsNoteModalVisible(false);
    };

    const [nickNameMessage, setNickNameMessage] = useState('');
    const [isNickNameValid, setIsNickNameValid] = useState(false);

    const checkNickName = async (nick) => {
        if (nick.length < 2) {
            setNickNameMessage('닉네임은 최소 2글자 이상이어야 합니다.');
            setIsNickNameValid(false);
            return;
        }

        try {
            const res = await postRequest('/checknickName', { nickName: nick });
            if (res.exists) {
                setNickNameMessage('이미 존재하는 닉네임입니다.');
                setIsNickNameValid(false);
            } else {
                setNickNameMessage('사용 가능한 닉네임입니다.');
                setIsNickNameValid(true);
            }
        } catch (err) {
            console.error(err);
            setNickNameMessage('닉네임 중복 체크에 실패했습니다.');
            setIsNickNameValid(false);
        }
    };

    const debouncedCheckNickName = useCallback(
        debounce((text) => checkNickName(text), 500),
        []
    );

    const handleNext = async () => {
        if (!isNickNameValid) {
            Alert.alert("알림", "사용 가능한 닉네임을 입력해주세요.");
            return;
        }

        const isDogInfoValid = dogs.every(dog => dog.name && dog.breedId);
        if (!isDogInfoValid) {
            Alert.alert("알림", "반려견 이름과 견종을 모두 입력해주세요.");
            return;
        }

        const payload = {
            userId: userId,
            nickName: nickName,
            dogs: dogs.map(dog => ({
                dogId: dog.id,
                userId: userId,
                nickName: nickName,
                dogName: dog.name,
                breedId: dog.breedId,
                breedName: dog.breedName,
                dogAge: dog.age ? parseInt(dog.age) : null,
                dogWeight: dog.weight ? parseFloat(dog.weight) : null,
                dogGender: dog.gender,
                dogNote: dog.note,
                dogPersonality: dog.personality,
                hasDog: dog.hasDog,
            }))
        };

        try {
            const res = await postRequest('/saveDogInfo', payload);
            const success = res === true || res.success === true;

            Alert.alert(
                success ? '저장 성공' : '저장 실패',
                success ? '반려견 정보가 저장되었습니다.' : '정보 저장에 실패했습니다.',
                [{ text: '확인', onPress: () => success && navigation.navigate('MainScreen', { userId, dogs }) }]
            );

        } catch (error) {
            console.error('반려견 정보 저장 오류:', error);
            Alert.alert('알림', '서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.logo}>댕크립</Text>
            <Text style={styles.title}>추가 정보를 입력해주세요.</Text>

            {/* 사용자 닉네임 */}
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="사용자 닉네임"
                    value={nickName}
                    onChangeText={(text) => {
                        setNickName(text);
                        debouncedCheckNickName(text);
                    }}
                />
                {nickNameMessage !== '' && (
                    <Text style={{ color: isNickNameValid ? 'green' : 'red', marginTop: 4 }}>
                        {nickNameMessage}
                    </Text>
                )}
            </View>

            {/* 강아지 정보 반복 */}
            {dogs.map((dog) => (
                <View key={dog.id} style={styles.dogBox}>
                    {dogs.length > 1 && (
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeDog(dog.id)}
                        >
                            <Ionicons name="close-circle" size={24} color="gray" />
                        </TouchableOpacity>
                    )}

                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="반려견 이름"
                            value={dog.name}
                            onChangeText={(text) => updateDog(dog.id, 'name', text)}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => openBreedModal(dog.id)}
                    >
                        <Text style={[styles.breedSelectText, dog.breedName ? styles.inputText : styles.inputPlaceholder]}>
                            {dog.breedName || '종 선택'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="반려견 나이"
                            keyboardType="number-pad"
                            value={dog.age}
                            onChangeText={(text) => updateDog(dog.id, 'age', text)}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="반려견 몸무게 (kg)"
                            keyboardType="number-pad"
                            value={dog.weight}
                            onChangeText={(text) => updateDog(dog.id, 'weight', text)}
                        />
                    </View>
                    <View style={styles.selectRow}>
                        <TouchableOpacity
                            style={[styles.selectButton, dog.gender === 'male' && styles.selectActive]}
                            onPress={() => updateDog(dog.id, 'gender', 'male')}
                        >
                            <Text style={[styles.selectText, dog.gender === 'male' && styles.selectTextActive]}>남자</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectButton, dog.gender === 'female' && styles.selectActive]}
                            onPress={() => updateDog(dog.id, 'gender', 'female')}
                        >
                            <Text style={[styles.selectText, dog.gender === 'female' && styles.selectTextActive]}>여자</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => openNoteModal(dog.id)}
                    >
                        <Text style={[styles.breedSelectText, dog.note ? styles.inputText : styles.inputPlaceholder]}>
                            {dog.note || "건강 정보를 등록해주세요"}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="[선택] 성격 / 훈련 수준"
                            value={dog.personality}
                            onChangeText={(text) => updateDog(dog.id, 'personality', text)}
                        />
                    </View>
                    {/* 강아지 등록 여부 */}
                    <View style={styles.toggleRow}>
                        <TouchableOpacity
                            style={[styles.toggleButton, dog.hasDog === "Y" && styles.toggleActive]}
                            onPress={() => updateDog(dog.id, 'hasDog', 'Y')}
                        >
                            <Text style={[styles.toggleText, dog.hasDog === "Y" && styles.toggleTextActive]}>반려동물 등록</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.toggleButton, dog.hasDog === "N" && styles.toggleActive]}
                            onPress={() => updateDog(dog.id, 'hasDog', 'N')}
                        >
                            <Text style={[styles.toggleText, dog.hasDog === "N" && styles.toggleTextActive]}>미등록</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <TouchableOpacity
                style={[styles.submitButton, styles.addButton]}
                onPress={addDog}
            >
                <Text style={[styles.submitButtonText, styles.addButtonText]}>+ 추가</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleNext}
            >
                <Text style={styles.submitButtonText}>다음</Text>
            </TouchableOpacity>

            <DogBreedModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSelect={handleSelectBreed}
            />
            <DogNoteModal
                isVisible={isNoteModalVisible}
                onClose={() => setIsNoteModalVisible(false)}
                onSelect={handleSelectNote}
                defaultValue={dogs.find(d => d.id === currentDogId)?.note || ""}
            />
        </ScrollView>
    );
}
