import React, { useEffect, useState, useRef } from "react";
import {
    View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./styles";

export default function ChatScreen({ route, navigation }) {
    const { groupId, userId, groupTitle } = route.params;
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const stompRef = useRef(null);
    const triedSockJSRef = useRef(false);

    // 서버 IP — 실제 PC 내부 IP로 바꿔
    const SERVER_HOST = Platform.OS === "android" ? "192.168.45.62:8080" : "localhost:8080";
    const wsUrl = `ws://${SERVER_HOST}/ws`;
    const sockJsUrl = `http://${SERVER_HOST}/ws`; // SockJS uses http endpoint

    // 유틸: STOMP client 생성 (pure ws)
    const createWsClient = () => {
        console.log("[STOMP] createWsClient -> wsUrl:", wsUrl);
        const client = new Client({
            brokerURL: wsUrl,
            debug: (m) => console.log("🐛 STOMP DEBUG:", m),
            reconnectDelay: 5000,
        });
        return client;
    };

    // 유틸: STOMP client 생성 (SockJS fallback)
    const createSockJsClient = () => {
        console.log("[STOMP] createSockJsClient -> sockJsUrl:", sockJsUrl);
        const client = new Client({
            webSocketFactory: () => new SockJS(sockJsUrl),
            debug: (m) => console.log("🐛 STOMP DEBUG (SockJS):", m),
            reconnectDelay: 5000,
        });
        return client;
    };

    useEffect(() => {
        // 1) 시도: pure WebSocket
        let client = createWsClient();
        stompRef.current = client;

        client.onConnect = () => {
            console.log("✅ STOMP 연결 성공 (WS)");
            subscribeToRoom(client);
        };

        client.onStompError = (frame) => {
            console.error("❌ STOMP 프로토콜 에러:", frame);
        };

        client.onWebSocketError = (evt) => {
            console.warn("⚠️ WS 연결 에러:", evt);
            // fallback 시도 (SockJS) — 단 한 번만
            if (!triedSockJSRef.current) {
                triedSockJSRef.current = true;
                console.log("[STOMP] WS 실패 -> SockJS 폴백 시도");
                // deactivate current (안정적으로 해제)
                try { client.deactivate(); } catch(e) { /* ignore */ }
                // create SockJS client
                client = createSockJsClient();
                stompRef.current = client;
                client.onConnect = () => {
                    console.log("✅ STOMP 연결 성공 (SockJS)");
                    subscribeToRoom(client);
                };
                client.onWebSocketError = (e) => {
                    console.error("❌ SockJS도 실패:", e);
                };
                client.activate();
            }
        };

        // activate initial WS attempt
        client.activate();

        return () => {
            try {
                stompRef.current && stompRef.current.deactivate();
            } catch (e) { /* ignore */ }
        };
    }, [groupId]);

    const subscribeToRoom = (client) => {
        try {
            const sub = client.subscribe(`/topic/chat/${groupId}`, (msg) => {
                try {
                    const body = JSON.parse(msg.body);
                    console.log("📩 받은 메시지:", body);
                    setMessages((prev) => [...prev, body]);
                } catch (err) {
                    console.error("❌ 메시지 파싱 오류:", err);
                }
            });
            console.log("[STOMP] 구독 완료:", `/topic/chat/${groupId}`, "subId:", sub ? sub.id : "n/a");
        } catch (e) {
            console.error("[STOMP] 구독 실패:", e);
        }
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessage = {
            userId,
            content: input,
            roomId: groupId,
            createdAt: new Date().toISOString(),
        };

        try {
            const client = stompRef.current;
            if (client && client.connected) {
                client.publish({
                    destination: `/app/chat/${groupId}`,
                    body: JSON.stringify(newMessage),
                });
                console.log("🚀 보낸 메시지 (서버 전송):", newMessage);
            } else {
                console.warn("⚠️ 연결 없음 — 로컬에만 추가:", newMessage);
            }
        } catch (err) {
            console.error("❌ 메시지 전송 실패:", err);
        }

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageBubble, item.userId === userId ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{groupTitle || "채팅방"}</Text>
            </View>

            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
                <FlatList data={messages} keyExtractor={(_, i) => i.toString()} renderItem={renderItem} contentContainerStyle={styles.messageList} />

                <View style={styles.inputRow}>
                    <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="메시지를 입력하세요" />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <Ionicons name="send" size={20} color={!input.trim() ? "#aaa" : "#fff"} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
