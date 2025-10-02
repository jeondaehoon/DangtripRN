import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    PermissionsAndroid,
} from "react-native";
import MapView from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapStyles from "../../data/MapStyle.json";
import styles from "./styles";
import EmergencyModal from "./EmergencyModal";
import axios from "axios";

const DEFAULT_LOCATION = {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

export default function WalkStartScreen({ route }) {
    const { token, userId } = route.params || {};

    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [emergencyVisible, setEmergencyVisible] = useState(false);
    const [symptoms, setSymptoms] = useState([]);
    const [fabOpen, setFabOpen] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [myLocation, setMyLocation] = useState(null);

    const intervalRef = useRef(null);
    const mapRef = useRef(null);

    const BASE_URL =
        Platform.OS === "android"
            ? "http://192.168.45.62:8080"
            : "http://localhost:8080";

    useEffect(() => {
        const requestPermission = async () => {
            if (Platform.OS === "android") {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                console.log("위치 권한 상태:", granted);
            }
        };
        requestPermission();
    }, []);

    const fetchSymptoms = async () => {
        try {
            const authHeader = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/emergency`, {
                headers: { Authorization: authHeader },
            });
            setSymptoms(response.data);
            setEmergencyVisible(true);
        } catch (error) {
            console.error("데이터 불러오기 실패:", error.response?.status, error.message);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const toggleTimer = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
        } else {
            if (!startTime) {
                setStartTime(new Date().toISOString());
            }
            intervalRef.current = setInterval(() => {
                setElapsedSeconds((prev) => prev + 1);
            }, 1000);
            setIsRunning(true);
        }
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        setElapsedSeconds(0);
        setStartTime(null);
        setFabOpen(false);
    };

    const endWalk = async (symptom = null) => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        setFabOpen(false);

        const endTime = new Date().toISOString();

        const payload = {
            userId,
            startTime: startTime,
            endTime: endTime,
            duration: elapsedSeconds,
            emergency: symptom,
        };

        try {
            const response = await axios.post(`${BASE_URL}/walk/end`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("산책 + 응급 저장 성공:", response.data);
        } catch (error) {
            console.error("저장 실패:", error.response?.status, error.message);
        } finally {
            setStartTime(null);
            setElapsedSeconds(0);
        }
    };

    const moveToMyLocation = () => {
        if (myLocation && mapRef.current) {
            console.log("내 위치 이동:", myLocation);
            mapRef.current.animateToRegion(
                {
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                1000
            );
        } else {
            console.log("내 위치 없음:", myLocation);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFillObject}
                initialRegion={DEFAULT_LOCATION}
                customMapStyle={MapStyles}
                showsUserLocation={true}
                followsUserLocation={true}   // ✅ 자동 추적 켬
                showsMyLocationButton={true} // ✅ 구글맵 기본 버튼 표시
                onUserLocationChange={(e) => {
                    if (e.nativeEvent.coordinate) {
                        console.log("onUserLocationChange:", e.nativeEvent.coordinate);
                        const { latitude, longitude } = e.nativeEvent.coordinate;
                        setMyLocation({ latitude, longitude });
                    }
                }}
            />

            {/* 커스텀 내 위치 버튼 */}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 180,
                    right: 20,
                    backgroundColor: "white",
                    borderRadius: 25,
                    padding: 12,
                    elevation: 5,
                }}
                onPress={moveToMyLocation}
            >
                <Ionicons name="locate" size={28} color="#4e7fff" />
            </TouchableOpacity>

            <View style={styles.overlay}>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(elapsedSeconds)}</Text>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.circleSmall}
                        onPress={fetchSymptoms}
                    >
                        <Ionicons name="medical" size={26} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleLarge} onPress={toggleTimer}>
                        <Text style={styles.startText}>
                            {isRunning ? "일시중지" : "산책 시작"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.fabContainer}>
                        <TouchableOpacity
                            style={styles.circleSmall}
                            onPress={() => setFabOpen(!fabOpen)}
                        >
                            <Ionicons
                                name={fabOpen ? "close" : "refresh"}
                                size={26}
                                color="black"
                            />
                        </TouchableOpacity>

                        {fabOpen && (
                            <View style={styles.fabActions}>
                                <TouchableOpacity
                                    style={[
                                        styles.circleSmall,
                                        { marginBottom: 10, backgroundColor: "#3498db" },
                                    ]}
                                    onPress={resetTimer}
                                >
                                    <Ionicons name="refresh" size={22} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.circleSmall, { backgroundColor: "#e74c3c" }]}
                                    onPress={() => endWalk()}
                                >
                                    <Ionicons name="stop" size={22} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            <EmergencyModal
                visible={emergencyVisible}
                onClose={() => setEmergencyVisible(false)}
                symptoms={symptoms}
                onSaveAndExit={(symptom) => {
                    endWalk(symptom);
                }}
            />
        </View>
    );
}
