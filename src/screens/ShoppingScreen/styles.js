import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#4e7fff',
    },
    screen: {
        flex: 1,
        backgroundColor: '#f8f9fb',
    },
    hero: {
        backgroundColor: '#4e7fff',
        paddingTop: 18,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerRight: {
        padding: 8,
    },
    greetSmall: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
    },
    greetLarge: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 2,
    },
    searchBar: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 42,
    },
    searchInput: {
        flex: 1,
        marginHorizontal: 8,
        color: '#202124',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: 18,
    },
    sectionHeader: {
        marginTop: 18,
        marginBottom: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#202124',
    },
    sectionAction: {
        fontSize: 12,
        color: '#4e7fff',
        fontWeight: '700',
    },
    cardRow: {
        paddingLeft: 16,
        paddingRight: 4,
    },
    card: {
        width: 240,
        borderRadius: 14,
        backgroundColor: '#fff',
        marginRight: 12,
    },
    cardImage: {
        height: 120,
        backgroundColor: '#eef3ff',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        overflow: 'hidden',
    },
    cardImageImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardChip: {
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: '#111827',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    cardChipText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    cardBody: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111',
        marginBottom: 6,
    },
    cardMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardMetaText: {
        marginLeft: 4,
        color: '#5f6368',
        fontSize: 12,
        marginRight: 8,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#d0d5dc',
        marginRight: 8,
    },
    // 광고 배너
    banner: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 12,
        resizeMode: 'cover',
    },

    // 카테고리 버튼 영역 (2줄, 4열)
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 12,
        marginBottom: 20,
    },
    categoryBtn: {
        width: '22%', // 4개씩 딱 맞게
        alignItems: 'center',
        marginBottom: 20,
    },
    categoryText: {
        marginTop: 6,
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },

    // 상품 카드
    productCard: {
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 4,
    },
    productImage: {
        width: '100%',
        height: 140,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#f0f0f0',
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111',
        marginTop: 6,
        marginBottom: 2,
        textAlign: 'left',
    },
    productDesc: {
        fontSize: 13,
        color: '#444',
        marginBottom: 4,
        textAlign: 'left',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111',
        marginBottom: 4,
        textAlign: 'left',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        color: '#333',
        marginLeft: 4,
    },
    reviewCount: {
        fontSize: 12,
        color: '#888',
        marginLeft: 2,
    },

    // 랭킹 리스트 (카드형)
    rankList: {
        marginTop: 12,
        paddingHorizontal: 12,
    },
    rankCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    rankBadge: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4e7fff',
        marginRight: 12,
        width: 24,
        textAlign: 'center',
    },
    rankImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    rankInfo: {
        flex: 1,
    },
    rankName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111',
    },
    rankSales: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
});
