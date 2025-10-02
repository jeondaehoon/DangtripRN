import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 24,
        alignItems: 'center',
        paddingBottom: 40,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 50,
        marginTop: 40,
        letterSpacing: 1,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 18,
        textAlign: 'center',
        alignSelf: 'flex-start',
    },
    inputBox: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 16,
        padding: 6,
        borderRadius: 8,
    },
    input: {
        fontSize: 14,
        color: '#222',
        paddingVertical: 0,
        height: 40,
    },
    selectRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    selectButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingVertical: 8,
        marginHorizontal: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    selectActive: {
        borderColor: '#4e7fff',
        backgroundColor: '#e6f0ff',
    },
    selectText: {
        fontSize: 15,
        color: '#888',
        fontWeight: '500',
    },
    selectTextActive: {
        color: '#4e7fff',
        fontWeight: 'bold',
    },
    submitButton: {
        width: '100%',
        backgroundColor: '#4e7fff',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 5,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    pickerInput: {
        fontSize: 14,
        paddingVertical: 0,
        height: 40,
        color: '#222',
    },
    dogBox: {
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        position: 'relative',
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1,
    },
    addButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#4e7fff',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#4e7fff',
    },
    breedSelectText: {
        fontSize: 14,
        color: '#222',
        height: 40,
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    inputPlaceholder: {
        color: '#888',
    },
    inputText: {
        color: '#222',
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#222',
        marginBottom: 8,
    },

    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    toggleButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingVertical: 10,
        marginHorizontal: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    toggleActive: {
        borderColor: '#4e7fff',
        backgroundColor: '#e6f0ff',
    },

    toggleText: {
        fontSize: 15,
        color: '#888',
        fontWeight: '500',
    },

    toggleTextActive: {
        color: '#4e7fff',
        fontWeight: 'bold',
    },

    // Modal style(breed)
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#111',
    },
    searchInput: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    breedItem: {
        paddingVertical: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    breedText: {
        fontSize: 16,
        color: '#333',
    },
    closeButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#4e7fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
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
