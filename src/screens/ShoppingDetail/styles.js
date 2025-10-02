import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    mainImage: { width: '100%', height: width, resizeMode: 'cover' },
    thumbnailList: { marginVertical: 10, paddingHorizontal: 10 },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 10,
        resizeMode: 'cover',
        backgroundColor: '#f2f2f2',
    },

    // 상품명 → 가격 → 평점 세로 배치
    infoHeader: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        marginBottom: 6,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4e7fff',
        marginBottom: 6,
    },

    ratingRow: { flexDirection: 'row', alignItems: 'center' },
    ratingText: { fontSize: 14, fontWeight: '600', marginLeft: 4 },
    reviewCount: { fontSize: 12, color: '#666', marginLeft: 4 },

    section: { paddingHorizontal: 16, marginTop: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
    sectionDesc: { fontSize: 14, lineHeight: 22, color: '#333' },

    benefitRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
    benefitCard: { alignItems: 'center' },
    benefitText: { fontSize: 12, color: '#333', marginTop: 6 },

    footer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 35,
    },
    cartBtn: {
        flex: 1,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingVertical: 14,
    },
    cartText: { fontSize: 15, fontWeight: '600', color: '#333', marginLeft: 6 },
    buyBtn: {
        flex: 1,
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
    },
    buyText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});
