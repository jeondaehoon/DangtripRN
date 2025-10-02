import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loading: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#667eea',
        fontWeight: '600',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 40,
        backgroundColor: '#667eea',
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        flex: 1,
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#667eea',
    },

    profileCard: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        margin: 20,
        borderRadius: 28,
        padding: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 4,
    },
    avatarBlue: {
        backgroundColor: '#667eea',
        borderColor: '#4f46e5',
    },
    avatarPink: {
        backgroundColor: '#f5576c',
        borderColor: '#ec4899',
    },

    name: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1e293b',
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: -0.5,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'rgba(99, 102, 241, 0.08)',
        borderRadius: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.15)',
    },
    infoText: {
        marginLeft: 16,
        fontSize: 18,
        color: '#374151',
        fontWeight: '700',
        letterSpacing: 0.2,
    },

    input: {
        borderWidth: 2,
        borderColor: '#e5e7eb',
        padding: 12,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginBottom: 10,
        width: '100%',
        fontSize: 14,
        color: '#1f2937',
        fontWeight: '600',
    },
    primaryBtn: {
        backgroundColor: '#667eea',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    dangerBtn: {
        backgroundColor: '#f5576c',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    btnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    badge: {
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 25,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    badgeText: {
        color: '#6366f1',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 0.5,
    },

    divider: {
        height: 2,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        marginVertical: 24,
        width: '100%',
        borderRadius: 1,
    },

    statusIndicator: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#10b981',
        borderWidth: 3,
        borderColor: '#fff',
    },

    floatingActionButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#667eea',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    //modalcss
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '85%',
        maxHeight: '60%'
    },
    statusItem: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    statusText: {
        fontSize: 16,
        color: '#333',
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
        fontSize: 14,
    },
    closeButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#667eea',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Modal style(note)
    largeWrapper: {
        marginBottom: 8,
    },
    largeCategory: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    largeText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    expandedLargeText: {
        color: '#4e7fff',
    },
    middleWrapper: {
        marginLeft: 16,
        marginTop: 6,
    },
    middleCategory: {
        paddingVertical: 8,
    },
    middleText: {
        fontSize: 16,
        color: '#444',
    },
    expandedMiddleText: {
        color: '#4e7fff',
    },
    smallWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 16,
        marginTop: 6,
    },
    smallItem: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#4e7fff',
        backgroundColor: '#fff',
        marginRight: 8,
        marginBottom: 8,
    },
    smallText: {
        color: '#4e7fff',
        fontSize: 14,
    },
    searchResultItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    searchResultText: {
        fontSize: 16,
        color: '#222',
    },
});

