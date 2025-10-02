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
        paddingHorizontal: 18,
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
    formContainer: {
        flex: 1,
        padding: 18,
    },
    inputGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#444',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    /* 대표 사진 */
    imageUploadBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        marginBottom: 12,
        overflow: 'hidden',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholderText: {
        color: '#aaa',
        marginTop: 6,
        fontSize: 14,
    },
    imageWrapperLarge: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    removeImageBtnLarge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 14,
        elevation: 3,
        padding: 2,
    },
    /* 추가 사진 썸네일 */
    imageUploadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    uploadImage: {
        width: 90,
        height: 90,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    addImageBtn: {
        width: 90,
        height: 90,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4e7fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eef3ff',
        marginBottom: 8,
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 8,
        marginBottom: 8,
    },
    removeImageBtn: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
    },
    /* 태그 */
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4e7fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        margin: 4,
        backgroundColor: '#fff',
    },
    tagSelected: {
        backgroundColor: '#4e7fff',
    },
    tagText: {
        fontSize: 13,
        color: '#4e7fff',
    },
    tagTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    /* 버튼 */
    submitButton: {
        marginTop: 12,
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4e7fff',
        paddingVertical: 14,
        borderRadius: 12,
        elevation: 3,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 6,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        color: '#111',
    },

    dayButton: {
        borderWidth: 1,
        borderColor: '#4e7fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    daySelected: {
        backgroundColor: '#4e7fff',
    },
    dayText: {
        color: '#4e7fff',
        fontSize: 14,
    },
    dayTextSelected: {
        color: '#fff',
        fontSize: 14,
    },

});
