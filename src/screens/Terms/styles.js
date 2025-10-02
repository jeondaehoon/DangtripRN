import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffffff', 
  },

  topArea: {
    width: '100%',
    marginTop: 80,
    paddingHorizontal: 30,
  },

  image: {
    width: 90,
    height: 90,
    marginBottom: 18,
    alignSelf: 'flex-start',
    marginLeft: 0,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 0,
    color: '#222',
    marginBottom: 10,
    lineHeight: 38,
  },

  middleArea: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 250,
  },

  checkboxWrapper: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 20,
  paddingVertical: 8,
  },
  checkbox: {
    width: 20,        
    height: 20,       
    borderWidth: 2,
    borderColor: '#4e7fff',
    borderRadius: 10,  
    marginRight: 12,  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 2,
    shadowColor: '#4e7fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  checked: {
    backgroundColor: '#4e7fff',
    borderColor: '#4e7fff',
  },
  label: {
    fontSize: 16,
    color: '#222',
    fontWeight: '400',
    marginBottom: 0,
    lineHeight: 22,
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,      
    fontWeight: 'bold',
  },


  bottomArea: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 50,
  },

  button: {
    backgroundColor: '#4e7fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#4e7fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: 320,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});
