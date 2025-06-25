// components/AlgorithmSelector.tsx
import { styles } from '@/app/styles';
import React, { useState } from 'react';
import {
    Animated,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export type Algorithm = 'FCFS' | 'SJF' | 'SRTF' | 'RoundRobin';

interface AlgorithmSelectorProps {
  selectedAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
}

const algorithms: { value: Algorithm; label: string; description: string }[] = [
  {
    value: 'FCFS',
    label: 'First Come First Served (FCFS)',
    description: 'Processes được thực thi theo thứ tự đến trước, phục vụ trước'
  },
  {
    value: 'SJF',
    label: 'Shortest Job First (SJF)',
    description: 'Thực thi process có burst time ngắn nhất trước'
  },
  {
    value: 'SRTF',
    label: 'Shortest Remaining Time First (SRTF)',
    description: 'Preemptive SJF - chọn process có thời gian còn lại ngắn nhất'
  },
  {
    value: 'RoundRobin',
    label: 'Round Robin (RR)',
    description: 'Mỗi process được thực thi trong time quantum, sau đó chuyển sang process tiếp theo'
  }
];

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setIsDropdownOpen(true);
  };

  const handleAlgorithmSelect = (algorithm: Algorithm) => {
    onAlgorithmChange(algorithm);
    setIsDropdownOpen(false);
  };

  const selectedAlgorithmData = algorithms.find(alg => alg.value === selectedAlgorithm);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>⚙️ Chọn Thuật Toán</Text>
      
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.algorithmSelector}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <View style={styles.algorithmSelectorContent}>
            <View style={styles.algorithmSelectorLeft}>
              <Text style={styles.algorithmSelectorTitle}>
                {selectedAlgorithmData?.label}
              </Text>
              <Text style={styles.algorithmSelectorDescription}>
                {selectedAlgorithmData?.description}
              </Text>
            </View>
            <Text style={styles.algorithmSelectorArrow}>▼</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn Thuật Toán CPU Scheduling</Text>
            
            {algorithms.map((algorithm) => (
              <TouchableOpacity
                key={algorithm.value}
                style={[
                  styles.algorithmOption,
                  selectedAlgorithm === algorithm.value && styles.algorithmOptionSelected
                ]}
                onPress={() => handleAlgorithmSelect(algorithm.value)}
                activeOpacity={0.7}
              >
                <View style={styles.algorithmOptionContent}>
                  <Text style={[
                    styles.algorithmOptionTitle,
                    selectedAlgorithm === algorithm.value && styles.algorithmOptionTitleSelected
                  ]}>
                    {algorithm.label}
                  </Text>
                  <Text style={[
                    styles.algorithmOptionDescription,
                    selectedAlgorithm === algorithm.value && styles.algorithmOptionDescriptionSelected
                  ]}>
                    {algorithm.description}
                  </Text>
                </View>
                {selectedAlgorithm === algorithm.value && (
                  <Text style={styles.algorithmOptionCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsDropdownOpen(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCloseButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};