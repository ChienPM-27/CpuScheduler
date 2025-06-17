import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { styles } from '@/app/styles';
import { Process } from '@/app/types';

interface ProcessListProps {
  processes: Process[];
  onRemoveProcess: (id: string) => void;
  onSimulate: () => void;
  onClearAll: () => void;
}

export const ProcessList: React.FC<ProcessListProps> = ({
  processes,
  onRemoveProcess,
  onSimulate,
  onClearAll,
}) => {
  if (processes.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateIcon}>📝</Text>
        <Text style={styles.emptyStateText}>
          Chưa có process nào được thêm.{'\n'}
          Hãy thêm process đầu tiên để bắt đầu!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>📋 Danh sách Processes ({processes.length})</Text>
      
      {processes.map((process, index) => (
        <Animated.View key={process.id} style={styles.processCard}>
          <View style={styles.processCardHeader}>
            <Text style={styles.processId}>{process.id}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onRemoveProcess(process.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteButtonText}>🗑️ Xóa</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.processDetails}>
            <View style={styles.processDetailItem}>
              <Text style={styles.processDetailLabel}>Arrival Time</Text>
              <Text style={styles.processDetailValue}>{process.arrivalTime}</Text>
            </View>
            <View style={styles.processDetailItem}>
              <Text style={styles.processDetailLabel}>Burst Time</Text>
              <Text style={styles.processDetailValue}>{process.burstTime}</Text>
            </View>
          </View>
        </Animated.View>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.successButton}
          onPress={onSimulate}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>🚀 Chạy Simulation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dangerButton}
          onPress={onClearAll}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>🗑️ Xóa Tất Cả</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};