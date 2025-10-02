import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fb',
        paddingTop: 40,
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
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fb',
    },
    categoryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    categoryItem: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginRight: 8,
        marginBottom: 8,
    },
    categoryItemActive: {
        backgroundColor: '#4e7fff',
    },
    categoryText: {
        fontSize: 13,
        color: '#555',
    },
    categoryTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
    guideBox: {
        backgroundColor: '#eef3ff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#d0d7ff',
    },
    guideText: {
        fontSize: 13,
        color: '#333',
        lineHeight: 20,
    },
    titleInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    contentInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    imageUploadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
    },
    uploadImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 8,
    },
    addImageBtn: {
        width: 70,
        height: 70,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4e7fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eef3ff',
    },

    secretInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        marginTop: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#4e7fff',
    },

    imageWrapper: {
        position: 'relative',
        marginRight: 8,
    },

    removeImageBtn: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
    },

});
