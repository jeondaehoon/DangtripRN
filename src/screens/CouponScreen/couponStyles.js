import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#4e7fff',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    contentContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#f8f9fb',
    },
    couponCard: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
    },
    couponHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    couponTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },
    couponTag: {
        fontSize: 11,
        fontWeight: '700',
        color: '#4e7fff',
        backgroundColor: '#e8f0fe',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    couponDesc: {
        fontSize: 13,
        color: '#5f6368',
        marginBottom: 8,
    },
    couponFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    couponValid: {
        fontSize: 12,
        color: '#888',
    },
    couponStatus: {
        fontSize: 12,
        fontWeight: '700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        overflow: 'hidden',
    },
    available: {
        backgroundColor: '#e8f0fe',
        color: '#4e7fff',
    },
    used: {
        backgroundColor: '#f8d7da',
        color: '#b0175b',
    },
    expired: {
        backgroundColor: '#f5f5f5',
        color: '#888',
    },
    emptyText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 40,
    },
});
