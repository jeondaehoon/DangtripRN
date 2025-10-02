import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import getKmaDateTime from "./getKmaDateTime";

const { width } = Dimensions.get("window");

export default function WeatherCarousel() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const serviceKey =
                    "71dddaeb95321b720927afdd4e70cccd8461f3a34ed65a5c5a4f7b3707697fe8";
                const { baseDate, baseTime } = getKmaDateTime();
                const nx = 60,
                    ny = 127;

                const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

                const res = await fetch(url);
                const json = await res.json();

                // 서비스 키 오류 확인
                if (json?.response?.header?.resultCode === "30") {
                    console.error("기상청 API 오류: 서비스 키가 유효하지 않습니다.");
                    return;
                }

                const items = json?.response?.body?.items?.item ?? [];
                if (items.length === 0) {
                    console.error("기상청 API 응답이 비어있음:", json);
                    return;
                }

                const temperature = items.find((i) => i.category === "TMP")?.fcstValue;
                const humidity = items.find((i) => i.category === "REH")?.fcstValue;
                const sky = items.find((i) => i.category === "SKY")?.fcstValue;
                const rain = items.find((i) => i.category === "PTY")?.fcstValue;

                const getSkyStatus = (code) => {
                    switch (code) {
                        case "1":
                            return "맑음";
                        case "3":
                            return "구름 많음";
                        case "4":
                            return "흐림";
                        default:
                            return "알 수 없음";
                    }
                };

                const getRainStatus = (code) => {
                    switch (code) {
                        case "0":
                            return "없음";
                        case "1":
                            return "비";
                        case "2":
                            return "비/눈";
                        case "3":
                            return "눈";
                        case "4":
                            return "소나기";
                        default:
                            return "알 수 없음";
                    }
                };

                const skyText = getSkyStatus(sky);
                const rainText = getRainStatus(rain);

                setCards([
                    {
                        id: "1",
                        title: "현재 기온",
                        status: `${temperature ?? "--"}°C`,
                        description: "체감 온도와 다를 수 있어요",
                        icon: "thermometer",
                    },
                    {
                        id: "2",
                        title: "현재 습도",
                        status: `${humidity ?? "--"}%`,
                        description: "쾌적한 습도",
                        icon: "water",
                    },
                    {
                        id: "3",
                        title: "현재 하늘은 이래요",
                        status: skyText,
                        description: "현재 하늘은",
                        icon: "cloud",
                    },
                    {
                        id: "4",
                        title: "현재 비/눈이 오는지 알려드릴게요",
                        status: rainText,
                        description: "강수 정보",
                        icon: "rainy",
                    },
                ]);
            } catch (e) {
                console.error("기상청 API 오류:", e);
            }
        };

        fetchWeather();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Ionicons name={item.icon} size={50} color="#fff" style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.desc}>{item.description}</Text>
        </View>
    );

    return (
        <FlatList
            data={cards}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        width: width,
        height: 140,
        borderRadius: 0,
        padding: 20,
        backgroundColor: "#4A90E2",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    icon: {
        marginBottom: 8,
    },
    title: { fontSize: 20, fontWeight: "600", color: "#fff" },
    status: { fontSize: 32, fontWeight: "bold", color: "#fff", marginVertical: 4 },
    desc: { fontSize: 14, color: "#eee" },
});
