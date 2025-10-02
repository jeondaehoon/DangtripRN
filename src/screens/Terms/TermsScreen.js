import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import styles from './styles';

export default function StartScreen({ navigation, route }) {
  const { userId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const toggleAll = () => {
    const newChecked = !checkedAll;
    setCheckedAll(newChecked);
    setChecked2(newChecked);
    setChecked3(newChecked);
  };

  return (
      <View style={styles.container}>
        <View style={styles.topArea}>
          <Image
              source={require('../../../assets/images/hand.png')}
              style={styles.image}
          />
          <Text style={styles.title}>
            댕트립에{'\n'}오신 것을 환영합니다.
          </Text>
        </View>

        <View style={styles.middleArea}>
          <TouchableOpacity
              onPress={toggleAll}
              style={styles.checkboxWrapper}
          >
            <View style={[styles.checkbox, checkedAll && styles.checked]}>
              {checkedAll && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={[styles.label, { fontWeight: 'bold', color: '#4e7fff' }]}>
              전체 동의
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => setChecked2(!checked2)}
              style={styles.checkboxWrapper}
              activeOpacity={0.7}
          >
            <View style={[styles.checkbox, checked2 && styles.checked]}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { fontWeight: 'bold' }]}>
                댕트립 이용 약관 및{'\n'}개인 정보 보호를 위한 백서에 동의합니다.
              </Text>
              <Text style={[styles.label, { fontSize: 13, color: '#e74c3c', marginTop: 2 }]}>
                (필수)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => setChecked3(!checked3)}
              style={styles.checkboxWrapper}
              activeOpacity={0.7}
          >
            <View style={[styles.checkbox, checked3 && styles.checked]}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { fontWeight: 'bold' }]}>
                사용 통계 및 오류 보고서를{'\n'}댕트립에 전송하여 개선에 참여합니다.
              </Text>
              <Text style={[styles.label, { fontSize: 13, color: '#888', marginTop: 2 }]}>
                (선택)
              </Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.bottomArea}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!checked2) {
                  setModalVisible(true);
                  return;
                }
                navigation.navigate('Doginfo', { userId });
              }}
          >
            <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>

          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>필수 동의가 필요합니다</Text>
                <Text style={styles.modalMessage}>
                  댕트립 이용 약관 및 개인정보 보호에 동의해주세요.
                </Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
  );
}
