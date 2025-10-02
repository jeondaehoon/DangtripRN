import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
        color: '#000',
    },

    body: { padding: 20 },

    noticeBox: { marginBottom: 24 },
    noticeMain: { fontSize: 15, color: '#333', marginBottom: 8 },
    noticeBlue: { fontSize: 13, color: '#4e7fff', marginBottom: 4 },
    noticeRed: { fontSize: 13, color: '#e53935' },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
        color: '#111',
    },

    baseAddressBox: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
        backgroundColor: '#fafafa',
    },
    baseAddressText: { fontSize: 15, color: '#333', marginBottom: 4 },
    baseAddressDetail: { fontSize: 14, color: '#666' },
    editBtn: {
        backgroundColor: '#4e7fff',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    editBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },

    addressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    addressName: { fontSize: 15, fontWeight: '600', marginBottom: 4, color: '#111' },
    addressText: { fontSize: 13, color: '#333' },
    defaultAddress: { backgroundColor: '#f0f6ff' },
    defaultText: { fontSize: 12, color: '#4e7fff', marginTop: 4 },

    actionCol: {
        flexDirection: 'column',
        gap: 6,
    },
    actionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    updateBtn: { backgroundColor: '#4e7fff' },
    deleteBtn: { backgroundColor: '#e53935', marginTop: 6 },
    actionBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },

    footer: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 16 },
    addBtn: {
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    addText: { fontSize: 16, fontWeight: '600', color: '#fff' },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: { width: '90%', backgroundColor: '#fff', borderRadius: 12, padding: 20 },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#111',
    },
    formGroup: { marginBottom: 14 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#333' },
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
    searchBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
    saveBtn: {
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 14,
        marginTop: 10,
        alignItems: 'center',
    },
    saveBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
    cancelBtn: {
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    cancelBtnText: { fontSize: 15, fontWeight: '600', color: '#333' },
});
