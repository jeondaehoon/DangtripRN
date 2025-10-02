import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffffff',
    padding: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000ff',
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
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 6,
    marginBottom: 14,
  },
  inputIcon: {
    marginRight: 8,
    marginLeft: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: '#222',
  },
  inputRight: {
    fontSize: 15,
    color: '#bbb',
    marginLeft: 8,
  },
  inputRightIcon: {
    marginLeft: 8,
  },
  picker: {
    flex: 1,
    height: 40,
    marginLeft: 2,
    backgroundColor: 'transparent',
  },
  selectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 2,
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
    borderColor: '#4e7fff', // 파란색
    backgroundColor: '#e6f0ff', // 연파랑
  },
  selectText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  selectTextActive: {
    color: '#4e7fff', // 파란색
    fontWeight: 'bold',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#4e7fff', // 파란색
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});