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

    /* 섹션 헤더 */
    sectionHeader: {
        marginTop: 18,
        marginBottom: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    /* 카테고리 칩 */
    categoryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    categoryChip: {
        backgroundColor: '#eef3ff',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e3e9ff',
    },
    categoryChipText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4e7fff',
    },
    categoryChipActive: {
        backgroundColor: '#4e7fff',
        borderColor: '#4e7fff',
    },
    categoryChipTextActive: {
        color: '#fff',
        fontWeight: '700',
    },

    /* 훈련 카드 */
    cardRow: {
        paddingLeft: 16,
        paddingRight: 4,
        flexDirection: 'row',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        flex: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#eef3ff',
    },
    cardImageImg: {
        width: '50%',
        height: '50%',
        resizeMode: 'cover',
    },
    cardChip: {
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: '#00704a',
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
        marginHorizontal: 6,
    },
});
