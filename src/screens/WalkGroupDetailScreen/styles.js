import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginTop: 30,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },
    scrollContent: {
        padding: 16,
    },
    bannerImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        color: '#333',
        marginBottom: 16,
        lineHeight: 22,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 6,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 12,
    },

    tagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F0FE',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 8,
    },

    tag: {
        flexDirection: 'row',
        backgroundColor: '#E8F0FE',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 13,
        color: '#4e7fff',
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        color: '#111',
    },
    memberRow: {
        flexDirection: 'row',
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#eee',
        marginBottom: 35,
    },

    joinButton: {
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },

    joinButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    noticeBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        marginTop: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    noticeText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    galleryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 10,
    },

    galleryImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        resizeMode: 'cover',
    },


    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4e7fff',
        marginVertical: 8,
    },
    addButtonText: {
        marginLeft: 6,
        color: '#4e7fff',
        fontSize: 14,
        fontWeight: '600',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
        color: '#111',
    },
    modalInput: {
        width: '100%',
        backgroundColor: '#f2f3f5',
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        marginBottom: 16,
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 8,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    modalButtonPrimary: {
        backgroundColor: '#4e7fff',
    },
    modalButtonSecondary: {
        backgroundColor: '#eee',
    },
    modalButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    modalButtonTextSecondary: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },

    galleryScroll: {
        marginTop: 12,
        marginBottom: 12,
    },

    addPhotoBox: {
        width: 100,
        height: 100,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    addPhotoText: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },

    thumbnailWrapper: {
        position: 'relative',
        marginRight: 10,
    },

    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },

    deleteButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#ff4d4d',
        borderRadius: 12,
        padding: 4,
    },

});
