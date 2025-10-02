import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fb',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },

    /* 탭 영역 */
    tabRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 14,
        color: '#666',
    },
    tabTextActive: {
        color: '#4e7fff',
        fontWeight: '700',
    },
    tabIndicator: {
        height: 2,
        backgroundColor: '#4e7fff',
        width: '60%',          // 글자 밑에만 표시
        marginTop: 6,
        alignSelf: 'center',
        borderRadius: 2,
    },

    /* 피드 */
    feed: {
        flex: 1,
        padding: 16,
    },
    postCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 2,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    postUser: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
    },
    postTime: {
        fontSize: 12,
        color: '#888',
    },
    postCategory: {
        fontSize: 12,
        color: '#4e7fff',
        fontWeight: '600',
    },
    postContent: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postMeta: {
        fontSize: 12,
        color: '#444',
        marginLeft: 4,
    },

    /* 산책모임 카드 */
    groupCard: {
        backgroundColor: '#E8F0FE',
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
        marginBottom: 8,
    },
    groupRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    groupMeta: {
        fontSize: 13,
        color: '#333',
        marginLeft: 6,
    },
    groupButton: {
        marginTop: 10,
        backgroundColor: '#4e7fff',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    groupButtonText: {
        color: '#fff',
        fontWeight: '600',
    },

    /* FAB */
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#4e7fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        marginBottom: 55,
    },
    fabMenu: {
        position: 'absolute',
        right: 20,
        bottom: 130,
        alignItems: 'flex-end',
    },
    fabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4e7fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 10,
        elevation: 4,
    },
    fabItemText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 6,
        fontSize: 13,
    },
});
