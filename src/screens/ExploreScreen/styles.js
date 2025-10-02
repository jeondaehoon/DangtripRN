import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    // 지도 위 레이어
    topOverlay: {
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
        color: '#202124',
    },
    categoryFilterContainer: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-around',
    },
    categoryButton: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 14,
        marginRight: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    categoryButtonActive: {
        backgroundColor: '#4e7fff',
    },
    categoryButtonInactive: {
        backgroundColor: '#eef3ff',
    },
    categoryButtonTextActive: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 13,
    },
    categoryButtonTextInactive: {
        color: '#4e7fff',
        fontWeight: '600',
        fontSize: 13,
    },
    // 카드 리스트
    cardList: {
        position: 'absolute',
        bottom: 20,
        marginBottom: 50,
    },
    cardListContainer: {
        paddingHorizontal: 10,
    },
    card: {
        width: width * 0.7,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginRight: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    cardType: {
        fontSize: 12,
        color: '#555',
        marginBottom: 2,
    },
    cardRating: {
        fontSize: 12,
        color: '#555',
        marginBottom: 2,
    },
    cardAddr: {
        fontSize: 12,
        color: '#555',
    },
});
