import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    itemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
    itemInfo: { flex: 1 },
    itemName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    itemPrice: { fontSize: 15, color: '#4e7fff', marginBottom: 6 },
    qtyRow: { flexDirection: 'row', alignItems: 'center' },
    qtyText: { marginHorizontal: 8, fontSize: 16, fontWeight: '600' },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fafafa',
    },
    totalText: { fontSize: 18, fontWeight: '700', color: '#333' },
    buyBtn: {
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buyText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
