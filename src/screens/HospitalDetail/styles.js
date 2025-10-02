import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    // 뒤로가기 버튼
    backBtn: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },

    // 제목/카테고리
    infoHeader: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111',
        marginBottom: 2,
    },
    subInfo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },

    // 액션 버튼
    actionsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f6ff',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 12,
        marginBottom: 5,
    },
    actionText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: '#4e7fff',
    },

    // 대표 이미지
    mainImage: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        backgroundColor: '#f0f0f0',
        marginBottom: 16,
    },

    // 상세 정보 박스
    detailBox: {
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: '#fafafa',
        borderRadius: 12,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333',
    },

    // 설명 박스
    descBox: {
        marginHorizontal: 16,
        marginBottom: 30,
        padding: 16,
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    desc: {
        fontSize: 15,
        lineHeight: 24,
        color: '#333',
    },
    descTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        color: '#111',
    },
});
