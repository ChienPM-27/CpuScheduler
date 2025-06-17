import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { styles } from '@/app/styles';
import { Process } from '@/app/types';

interface ProcessInputProps {
  onAddProcess: (process: Process) => void;
  existingProcessIds: string[];
}

export const ProcessInput: React.FC<ProcessInputProps> = ({
  onAddProcess,
  existingProcessIds,
}) => {
  const [processId, setProcessId] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [burstTime, setBurstTime] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const scaleAnim = new Animated.Value(1);

  const handleAddProcess = () => {
    if (!processId.trim() || !arrivalTime.trim() || !burstTime.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin process');
      return;
    }

    const arrival = parseInt(arrivalTime);
    const burst = parseInt(burstTime);

    if (isNaN(arrival) || isNaN(burst) || arrival < 0 || burst <= 0) {
      Alert.alert('Lỗi', 'Arrival time phải >= 0 và Burst time phải > 0');
      return;
    }

    if (existingProcessIds.includes(processId.trim())) {
      Alert.alert('Lỗi', 'Process ID đã tồn tại');
      return;
    }

    const newProcess: Process = {
      id: processId.trim(),
      arrivalTime: arrival,
      burstTime: burst,
    };

    // Animation
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

    onAddProcess(newProcess);
    setProcessId('');
    setArrivalTime('');
    setBurstTime('');
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.cardTitle}>✨ Thêm Process</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Process ID:</Text>
        <TextInput
          style={[
            styles.textInput,
            focusedInput === 'processId' && styles.textInputFocused,
          ]}
          value={processId}
          onChangeText={setProcessId}
          placeholder="Nhập Process ID (vd: P1)"
          placeholderTextColor="#64748b"
          onFocus={() => setFocusedInput('processId')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Arrival Time:</Text>
        <TextInput
          style={[
            styles.textInput,
            focusedInput === 'arrivalTime' && styles.textInputFocused,
          ]}
          value={arrivalTime}
          onChangeText={setArrivalTime}
          placeholder="Nhập thời gian đến"
          placeholderTextColor="#64748b"
          keyboardType="numeric"
          onFocus={() => setFocusedInput('arrivalTime')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Burst Time:</Text>
        <TextInput
          style={[
            styles.textInput,
            focusedInput === 'burstTime' && styles.textInputFocused,
          ]}
          value={burstTime}
          onChangeText={setBurstTime}
          placeholder="Nhập thời gian thực thi"
          placeholderTextColor="#64748b"
          keyboardType="numeric"
          onFocus={() => setFocusedInput('burstTime')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleAddProcess}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>➕ Thêm Process</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};