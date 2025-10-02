import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from './styles';
import { getRequestWithToken } from "../../util/api";

export default function TrainingDetail({ route, navigation }) {
    const { id, token } = route.params;
    const [training, setTraining] = useState(null);
    const [playing, setPlaying] = useState(false);

    const BASE_URL = Platform.OS === 'android'
        ? 'http://192.168.45.62:8080'
        : 'http://localhost:8080';

    const extractYoutubeId = (url) => {
        if (!url) return null;
        const trimmed = url.trim();
        if (trimmed.length === 11 && !trimmed.includes("http")) {
            return trimmed;
        }
        const parts = trimmed.split("v=");
        if (parts.length > 1) {
            return parts[1].split("&")[0].trim();
        }

        return null;
    };

    useEffect(() => {
        const fetchTrainingDetail = async () => {
            try {
                const res = await getRequestWithToken(`/trainingdetail/${id}`, token);
                setTraining(res);
            } catch (err) {
                console.error("훈련 상세 불러오기 실패:", err);
            }
        };
        fetchTrainingDetail();
    }, [id, token]);

    if (!training) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>로딩 중...</Text>
            </SafeAreaView>
        );
    }

    const videoId = extractYoutubeId(training.videoUrl);
    console.log("videoUrl:", training.videoUrl);
    console.log("videoId:", videoId);

    return (
        <SafeAreaView style={styles.container} edges={['top','left','right','bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>

                <View style={styles.infoHeader}>
                    <Text style={styles.title}>{training.title}</Text>
                    <Text style={styles.subInfo}>훈련</Text>
                </View>

                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="share-social-outline" size={18} color="#4e7fff" />
                        <Text style={styles.actionText}>공유</Text>
                    </TouchableOpacity>
                </View>

                <Image
                    source={training.imageUrl
                        ? { uri: `${BASE_URL}/images/${training.imageUrl}` }
                        : require('../../../assets/images/FreefitAppLogo.png')}
                    style={styles.mainImage}
                />

                <View style={styles.detailBox}>
                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={16} color="#444" />
                        <Text style={styles.infoText}>{training.duration}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="barbell-outline" size={16} color="#444" />
                        <Text style={styles.infoText}>{training.trainingLevel}</Text>
                    </View>
                </View>

                <View style={styles.descBox}>
                    <Text style={styles.descTitle}>훈련 설명</Text>
                    <Text style={styles.desc}>
                        {training.description || "상세 설명이 없습니다."}
                    </Text>
                </View>

                {videoId && (
                    <View style={styles.videoBox}>
                        <YoutubePlayer
                            height={220}
                            play={playing}
                            videoId={videoId}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
