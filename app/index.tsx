import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import { styles } from './styles';
import { Process, FCFSResult } from './types';
import { FCFS } from './algorithms/fcfs';
import { ProcessInput } from '../components/ProcessInput';
import { ProcessList } from '../components/ProcessList';
import { ResultsTable } from '../components/ResultsTable';
import { GanttChart } from '../components/GanttChart';

export default function Index() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [result, setResult] = useState<FCFSResult | null>(null);
  
  // Animation refs
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    // Header animation on mount
    Animated.parallel([
      Animated.timing(headerFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAddProcess = (newProcess: Process) => {
    setProcesses(prevProcesses => [...prevProcesses, newProcess]);
    // Clear results when adding new process
    if (result) {
      setResult(null);
    }
  };

  const handleRemoveProcess = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc chắn muốn xóa process ${id}?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setProcesses(prevProcesses => prevProcesses.filter(p => p.id !== id));
            // Clear results when removing process
            if (result) {
              setResult(null);
            }
          },
        },
      ]
    );
  };

  const handleSimulate = () => {
    if (processes.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng thêm ít nhất một process để chạy simulation');
      return;
    }

    try {
      const simulationResult = FCFS(processes);
      setResult(simulationResult);
      
      // Show success message
      Alert.alert(
        'Thành công! 🎉',
        `Đã hoàn thành simulation cho ${processes.length} processes`,
        [{ text: 'OK', style: 'default' }]
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi chạy simulation. Vui lòng thử lại.');
      console.error('Simulation error:', error);
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Xác nhận xóa tất cả',
      'Bạn có chắc chắn muốn xóa tất cả processes và kết quả?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa tất cả',
          style: 'destructive',
          onPress: () => {
            setProcesses([]);
            setResult(null);
          },
        },
      ]
    );
  };

  const existingProcessIds = processes.map(p => p.id);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: headerFadeAnim,
              transform: [{ translateY: headerSlideAnim }]
            }
          ]}
        >
          <Text style={styles.headerTitle}>
            🖥️ CPU SCHEDULER SIMULATOR
          </Text>
          <View style={{
            width: 60,
            height: 4,
            backgroundColor: '#3b82f6',
            borderRadius: 2,
            marginTop: 12,
          }} />
        </Animated.View>

        {/* Process Input Component */}
        <ProcessInput
          onAddProcess={handleAddProcess}
          existingProcessIds={existingProcessIds}
        />

        {/* Process List Component */}
        <ProcessList
          processes={processes}
          onRemoveProcess={handleRemoveProcess}
          onSimulate={handleSimulate}
          onClearAll={handleClearAll}
        />

        {/* Results Section */}
        {result && (
          <>
            {/* Results Table Component */}
            <ResultsTable result={result} />

            {/* Gantt Chart Component */}
            <GanttChart result={result} />
          </>
        )}

        {/* Legend Section */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>📚 Chú Thích:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <View style={{ width: '48%', marginBottom: 8 }}>
              <Text style={styles.legendText}>• AT: Arrival Time</Text>
            </View>
            <View style={{ width: '48%', marginBottom: 8 }}>
              <Text style={styles.legendText}>• BT: Burst Time</Text>
            </View>
            <View style={{ width: '48%', marginBottom: 8 }}>
              <Text style={styles.legendText}>• CT: Completion Time</Text>
            </View>
            <View style={{ width: '48%', marginBottom: 8 }}>
              <Text style={styles.legendText}>• TAT: Turnaround Time</Text>
            </View>
          </View>
          <Text style={styles.legendText}>• WT: Waiting Time = TAT - BT</Text>
          <Text style={styles.legendText}>• TAT: Turnaround Time = CT - AT</Text>
          
          {/* Algorithm Explanation */}
          <View style={{
            marginTop: 16,
            padding: 16,
            backgroundColor: '#334155',
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: '#3b82f6',
          }}>
            <Text style={[styles.legendText, { color: '#3b82f6', fontWeight: '700', marginBottom: 8 }]}>
              💡 Thuật toán FCFS:
            </Text>
            <Text style={[styles.legendText, { fontSize: 14, lineHeight: 20 }]}>
              Processes được thực thi theo thứ tự đến trước, phục vụ trước. 
              Thuật toán đơn giản nhất nhưng có thể gây ra hiện tượng Convoy Effect 
              khi process có burst time dài đến trước.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 20,
          marginTop: 20,
        }}>
          <Text style={{
            color: '#64748b',
            fontSize: 14,
            fontWeight: '500',
          }}>
            Made with ❤️ by ChienPM-27
          </Text>
          <Text style={{
            color: '#475569',
            fontSize: 12,
            marginTop: 4,
          }}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}