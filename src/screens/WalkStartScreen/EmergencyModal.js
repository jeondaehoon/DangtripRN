import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import styles from "./emergencyModalStyles";

export default function EmergencyModal({ visible, onClose, symptoms, onSaveAndExit }) {
    const [step, setStep] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedSymptom, setSelectedSymptom] = useState(null);

    const resetState = () => {
        setStep(1);
        setSearch("");
        setSelectedSymptom(null);
    };

    useEffect(() => {
        if (!visible) resetState();
    }, [visible]);

    const filteredSymptoms = (symptoms || []).filter((item) =>
        item.name.includes(search)
    );

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Text style={styles.title}>응급 상황 확인</Text>
                        <Text style={styles.subtitle}>
                            현재 응급상황입니까? 또는 아이의 상태가 이상합니까?
                        </Text>
                    </>
                );
            case 2:
                return (
                    <>
                        <TextInput
                            style={styles.search}
                            placeholder="증상 검색 (예: 기침, 출혈)"
                            value={search}
                            onChangeText={setSearch}
                        />
                        <FlatList
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            data={filteredSymptoms}
                            keyExtractor={(item) => item.symptom_id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.symptomCard}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSelectedSymptom(item);
                                        setStep(3);
                                    }}
                                >
                                    <Text style={styles.symptomText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <View style={styles.stepContainer}>
                                    <Text style={styles.emptyText}>일치하는 증상이 없습니다.</Text>
                                    <TouchableOpacity
                                        style={styles.button}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            setSelectedSymptom({
                                                symptom_id: 0,
                                                name: "기타",
                                                description: "사용자 입력",
                                                action_guide: "상태를 기록하고 필요 시 병원 방문하세요",
                                                severity: "경미",
                                            });
                                            setStep(3);
                                        }}
                                    >
                                        <Text style={styles.buttonText}>기타 증상 입력</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <Text style={styles.title}>{selectedSymptom?.name}</Text>
                        <Text style={styles.description}>{selectedSymptom?.description}</Text>
                    </>
                );
            case 4:
                return (
                    <>
                        <Text style={styles.title}>즉시 대처 방법</Text>
                        <Text style={styles.description}>{selectedSymptom?.action_guide}</Text>
                    </>
                );
            case 5:
                return selectedSymptom?.severity === "경미" ? (
                    <>
                        <Text style={styles.title}>경미 증상</Text>
                        <Text style={styles.description}>
                            산책을 즉시 중단하고 집으로 복귀하세요.
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>위급 증상</Text>
                        <Text style={styles.description}>
                            위급 상황입니다. 사진을 남겨두는 것이 좋습니다.
                        </Text>
                    </>
                );
            default:
                return null;
        }
    };

    const renderStepFooter = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSecondary]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>아니오</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
                            <Text style={styles.buttonText}>예</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 3:
                return (
                    <TouchableOpacity style={styles.button} onPress={() => setStep(4)}>
                        <Text style={styles.buttonText}>다음</Text>
                    </TouchableOpacity>
                );
            case 4:
                return (
                    <TouchableOpacity style={styles.button} onPress={() => setStep(5)}>
                        <Text style={styles.buttonText}>다음</Text>
                    </TouchableOpacity>
                );
            case 5:
                if (selectedSymptom?.severity === "경미") {
                    return (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                onSaveAndExit(selectedSymptom);
                                onClose();
                            }}
                        >
                            <Text style={styles.buttonText}>저장 후 종료</Text>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonSecondary]}
                                onPress={onClose}
                            >
                                <Text style={styles.buttonText}>아니오</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    onSaveAndExit(selectedSymptom);
                                    onClose();
                                }}
                            >
                                <Text style={styles.buttonText}>예 (촬영)</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
            default:
                return null;
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        {step > 1 && (
                            <TouchableOpacity onPress={() => setStep(step - 1)}>
                                <Text style={styles.navBtn}>← 뒤로</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.navBtn}>✕ 닫기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.stepBody}>{renderStepContent()}</View>

                    <View style={styles.footer}>{renderStepFooter()}</View>
                </View>
            </View>
        </Modal>
    );
}
