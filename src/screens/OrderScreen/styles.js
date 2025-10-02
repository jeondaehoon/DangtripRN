import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    section: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    itemInfo: { flex: 1 },
    itemName: { fontSize: 16, fontWeight: '600' },
    itemPrice: { fontSize: 15, color: '#4e7fff', marginTop: 4 },

    totalText: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 8,
        textAlign: 'right',
        color: '#111',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        marginBottom: 10,
    },

    paymentRow: {
        flexDirection: 'row',
        gap: 12,
    },
    payOption: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    paySelected: {
        borderColor: '#4e7fff',
        backgroundColor: '#e8f0ff',
    },
    payText: {
        fontSize: 15,
        color: '#333',
    },
    payTextActive: {
        fontSize: 15,
        fontWeight: '700',
        color: '#4e7fff',
    },

    footer: {
        borderTopWidth: 1,
        borderColor: '#eee',
        padding: 16,
        backgroundColor: '#fafafa',
    },
    orderBtn: {
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    orderText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },

    selectAddressBtn: {
        borderWidth: 1,
        borderColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    selectAddressText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4e7fff',
    },

});
