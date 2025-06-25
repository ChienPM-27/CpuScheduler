// components/ProcessInput.tsx
import { styles } from '@/app/styles';
import { Process } from '@/app/types';
import React, { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Algorithm, AlgorithmSelector } from './AlgorithmSelector';

interface ProcessInputProps {
  onAddProcess: (process: Process) => void;
  existingProcessIds: string[];
  selectedAlgorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
  timeQuantum?: number;
  onTimeQuantumChange?: (timeQuantum: number) => void;
}

export const ProcessInput: React.FC<ProcessInputProps> = ({
  onAddProcess,
  existingProcessIds,
  selectedAlgorithm,
  onAlgorithmChange,
  timeQuantum = 2,
  onTimeQuantumChange,
}) => {
  const [processId, setProcessId] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [burstTime, setBurstTime] = useState('');
  const [priority, setPriority] = useState('');
  const [inputFocused, setInputFocused] = useState<string | null>(null);

  const handleAddProcess = () => {
    // Validation
    if (!processId.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập Process ID');
      return;
    }

    if (existingProcessIds.includes(processId.trim())) {
      Alert.alert('Lỗi', `Process ID "${processId.trim()}" đã tồn tại`);
      return;
    }

    const arrivalTimeNum = parseInt(arrivalTime);
    const burstTimeNum = parseInt(burstTime);
    const priorityNum = priority ? parseInt(priority) : undefined;

    if (isNaN(arrivalTimeNum) || arrivalTimeNum < 0) {
      Alert.alert('Lỗi', 'Arrival Time phải là số nguyên không âm');
      return;
    }

    if (isNaN(burstTimeNum) || burstTimeNum <= 0) {
      Alert.alert('Lỗi', 'Burst Time phải là số nguyên dương');
      return;
    }

    if (priority && (isNaN(priorityNum as number) || (priorityNum as number) < 0)) {
      Alert.alert('Lỗi', 'Priority phải là số nguyên không âm');
      return;
    }

    const newProcess: Process = {
      id: processId.trim(),
      arrivalTime: arrivalTimeNum,
      burstTime: burstTimeNum,
      priority: priorityNum,
    };

    onAddProcess(newProcess);

    // Clear form
    setProcessId('');
    setArrivalTime('');
    setBurstTime('');
    setPriority('');
  };

  const handleTimeQuantumChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0 && onTimeQuantumChange) {
      onTimeQuantumChange(num);
    }
  };

  return (
    <View>
      {/* Algorithm Selector */}
      <AlgorithmSelector
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={onAlgorithmChange}
      />

      {/* Time Quantum Input for Round Robin */}
      {selectedAlgorithm === 'RoundRobin' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⏱️ Time Quantum</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Time Quantum (ms)</Text>
            <TextInput
              style={[
                styles.textInput,
                inputFocused === 'timeQuantum' && styles.textInputFocused,
              ]}
              value={timeQuantum.toString()}
              onChangeText={handleTimeQuantumChange}
              placeholder="Nhập time quantum..."
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              onFocus={() => setInputFocused('timeQuantum')}
              onBlur={() => setInputFocused(null)}
            />
          </View>
        </View>
      )}

      {/* Process Input Form */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>➕ Thêm Process</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Process ID</Text>
          <TextInput
            style={[
              styles.textInput,
              inputFocused === 'processId' && styles.textInputFocused,
            ]}
            value={processId}
            onChangeText={setProcessId}
            placeholder="Ví dụ: P1, P2, P3..."
            placeholderTextColor="#64748b"
            onFocus={() => setInputFocused('processId')}
            onBlur={() => setInputFocused(null)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Arrival Time</Text>
          <TextInput
            style={[
              styles.textInput,
              inputFocused === 'arrivalTime' && styles.textInputFocused,
            ]}
            value={arrivalTime}
            onChangeText={setArrivalTime}
            placeholder="Thời điểm process đến..."
            placeholderTextColor="#64748b"
            keyboardType="numeric"
            onFocus={() => setInputFocused('arrivalTime')}
            onBlur={() => setInputFocused(null)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Burst Time</Text>
          <TextInput
            style={[
              styles.textInput,
              inputFocused === 'burstTime' && styles.textInputFocused,
            ]}
            value={burstTime}
            onChangeText={setBurstTime}
            placeholder="Thời gian thực thi..."
            placeholderTextColor="#64748b"
            keyboardType="numeric"
            onFocus={() => setInputFocused('burstTime')}
            onBlur={() => setInputFocused(null)}
          />
        </View>

        {/* Priority input for priority scheduling (future) */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Priority (Optional)</Text>
          <TextInput
            style={[
              styles.textInput,
              inputFocused === 'priority' && styles.textInputFocused,
            ]}
            value={priority}
            onChangeText={setPriority}
            placeholder="Ưu tiên (số càng nhỏ càng cao)..."
            placeholderTextColor="#64748b"
            keyboardType="numeric"
            onFocus={() => setInputFocused('priority')}
            onBlur={() => setInputFocused(null)}
          />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleAddProcess}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>+ Thêm Process</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};