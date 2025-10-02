import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    addressName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    addressText: { fontSize: 14, color: '#333' },
    defaultAddress: { backgroundColor: '#f0f6ff' },
    defaultText: { fontSize: 12, color: '#4e7fff', marginTop: 4 },

    footer: {
        borderTopWidth: 1,
        borderColor: '#eee',
        padding: 16,
        backgroundColor: '#fafafa',
    },
    addBtn: {
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    addText: { fontSize: 16, fontWeight: '600', color: '#fff' },

    // 모달 스타일
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#111',
    },
    formGroup: {
        marginBottom: 14,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: '#fafafa',
    },
    searchBtn: {
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    saveBtn: {
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 14,
        marginTop: 10,
        alignItems: 'center',
    },
    saveBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    cancelBtn: {
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    cancelBtnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
});
