import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput } from "react-native";
import styles from "./styles";
import { getRequest, postRequestWithToken } from "../../util/api";

export default function DogNoteModal({ isVisible, onClose, onSelect, userId, token, defaultValue }) {
    const [expandedLarge, setExpandedLarge] = useState(null);
    const [expandedMiddle, setExpandedMiddle] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState({ large: [], middle: {}, small: {} });
    const [selectedNote, setSelectedNote] = useState(defaultValue);

    useEffect(() => {
        if (isVisible) {
            setSelectedNote(defaultValue);
        }
    }, [defaultValue, isVisible]);

    // 카테고리 불러오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getRequest("/categories");

                const large = res.filter(c => c.levelNo === 1);
                const middle = {};
                const small = {};

                res.forEach(c => {
                    if (c.levelNo === 2) {
                        if (!middle[c.parentId]) middle[c.parentId] = [];
                        middle[c.parentId].push({ categoryId: c.categoryId, name: c.name });
                    }
                    if (c.levelNo === 3) {
                        if (!small[c.parentId]) small[c.parentId] = [];
                        small[c.parentId].push(c.name);
                    }
                });

                setCategories({ large, middle, small });
            } catch (err) {
                console.error("카테고리 불러오기 실패:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSelectSmall = async (large, middle, small) => {
        try {
            console.log(`선택된 경로: ${large.name} > ${middle.name} > ${small}`);

            if (userId && token) {
                await postRequestWithToken(
                    `/doginfo/${userId}/note`,
                    { note: small },
                    token
                );
            }

            setSelectedNote(small);
            onSelect(small);
            onClose();
        } catch (err) {
            console.error("노트 저장 실패:", err);
        }
    };

    const allItems = [];
    categories.large.forEach((large) => {
        categories.middle[large.categoryId]?.forEach((middle) => {
            categories.small[middle.categoryId]?.forEach((small) => {
                allItems.push({
                    path: `${large.name} > ${middle.name} > ${small}`,
                    large,
                    middle,
                    small,
                });
            });
        });
    });

    const filteredItems = allItems.filter((item) =>
        item.path.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                {/* 타이틀 */}
                <Text style={styles.modalTitle}>건강 정보</Text>

                {/* 검색창 */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="검색 (예: 췌장염, 심부전)"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* 검색 모드 */}
                    {searchQuery.length > 0 ? (
                        filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <TouchableOpacity
                                    key={`${item.large.categoryId}-${item.middle.categoryId}-${item.small}`}
                                    onPress={() => handleSelectSmall(item.large, item.middle, item.small)}
                                    style={[
                                        styles.searchResultItem,
                                        selectedNote === item.small && { backgroundColor: "#e6f0ff" }
                                    ]}
                                >
                                    <Text style={[
                                        styles.searchResultText,
                                        selectedNote === item.small && { color: "#4e7fff", fontWeight: "bold" }
                                    ]}>
                                        {item.path}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
                        )
                    ) : (
                        // 트리 탐색 모드
                        categories.large.map((large) => (
                            <View key={large.categoryId} style={styles.largeWrapper}>
                                {/* 대분류 */}
                                <TouchableOpacity
                                    onPress={() =>
                                        setExpandedLarge(
                                            expandedLarge === large.categoryId ? null : large.categoryId
                                        )
                                    }
                                    style={styles.largeCategory}
                                >
                                    <Text
                                        style={[
                                            styles.largeText,
                                            expandedLarge === large.categoryId && styles.expandedLargeText,
                                        ]}
                                    >
                                        {large.name}
                                    </Text>
                                </TouchableOpacity>

                                {/* 중분류 */}
                                {expandedLarge === large.categoryId &&
                                    categories.middle[large.categoryId]?.map((middle) => (
                                        <View key={middle.categoryId} style={styles.middleWrapper}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setExpandedMiddle(
                                                        expandedMiddle === middle.categoryId ? null : middle.categoryId
                                                    )
                                                }
                                                style={styles.middleCategory}
                                            >
                                                <Text
                                                    style={[
                                                        styles.middleText,
                                                        expandedMiddle === middle.categoryId &&
                                                        styles.expandedMiddleText,
                                                    ]}
                                                >
                                                    {middle.name}
                                                </Text>
                                            </TouchableOpacity>

                                            {/* 소분류 */}
                                            {expandedMiddle === middle.categoryId && (
                                                <View style={styles.smallWrapper}>
                                                    {categories.small[middle.categoryId]?.map((small, i) => (
                                                        <TouchableOpacity
                                                            key={i}
                                                            onPress={() =>
                                                                handleSelectSmall(large, middle, small)
                                                            }
                                                            style={[
                                                                styles.smallItem,
                                                                selectedNote === small && { backgroundColor: "#e6f0ff" }
                                                            ]}
                                                        >
                                                            <Text style={[
                                                                styles.smallText,
                                                                selectedNote === small && { color: "#4e7fff", fontWeight: "bold" }
                                                            ]}>
                                                                {small}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    ))}
                            </View>
                        ))
                    )}
                </ScrollView>

                {/* 닫기 버튼 */}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>닫기</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
