import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getRequest } from '../../util/api';

export default function DogBreedModal({ isVisible, onClose, onSelect }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [dogBreeds, setDogBreeds] = useState([]);

    useEffect(() => {
        if (isVisible) {
            getRequest('/dogbreeds')
                .then(data => {
                    if (data && data.length > 0) {
                        setDogBreeds(data);
                    } else {
                        console.warn("No dog breed data received from API.");
                        setDogBreeds([]);
                    }
                })
                .catch(err => {
                    console.error('강아지 종 가져오기 실패:', err);
                    Alert.alert('오류', '강아지 종 목록을 가져오는 데 실패했습니다.');
                });
        }
    }, [isVisible]);

    const filteredBreeds = dogBreeds.filter(breed =>
        breed.breedName && breed.breedName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {/* 검색 입력창 */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="강아지 종 검색..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {/* 검색 결과 목록 */}
                <FlatList
                    data={filteredBreeds}
                    keyExtractor={(item) => item.breedId.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.breedItem}
                            onPress={() => {
                                onSelect({ id: item.breedId, name: item.breedName });
                                onClose();
                            }}
                        >
                            <Text style={styles.breedText}>{item.breedName}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
                    )}
                />

                {/* 닫기 버튼 */}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>닫기</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}