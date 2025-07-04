import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Algorithm } from '../components/AlgorithmSelector';
import { GanttChart } from '../components/GanttChart';
import { ProcessInput } from '../components/ProcessInput';
import { ProcessList } from '../components/ProcessList';
import { ResultsTable } from '../components/ResultsTable';
import { FCFS } from './algorithms/fcfs';
import { RoundRobin } from './algorithms/roundrobin';
import { SJF } from './algorithms/sjf';
import { SRTF } from './algorithms/srtf';
import { styles } from './styles';
import { FCFSResult, Process, RoundRobinResult, SJFResult, SRTFResult } from './types';

type AllResults = FCFSResult | SJFResult | SRTFResult | RoundRobinResult;

export default function Index() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [result, setResult] = useState<AllResults | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('FCFS');
  const [timeQuantum, setTimeQuantum] = useState<number>(2);
  
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
    console.log('Index: Received request to remove process:', id);
    console.log('Index: Current processes before removal:', processes.map(p => ({ id: p.id, arrivalTime: p.arrivalTime, burstTime: p.burstTime })));
    
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
            console.log('Index: User confirmed removal of process:', id);
            
            setProcesses(prevProcesses => {
              const processToRemove = prevProcesses.find(p => p.id === id);
              console.log('Index: Process to remove:', processToRemove);
              
              const newProcesses = prevProcesses.filter(p => p.id !== id);
              console.log('Index: Processes after filtering:', newProcesses.map(p => ({ id: p.id, arrivalTime: p.arrivalTime, burstTime: p.burstTime })));
              
              if (newProcesses.length === prevProcesses.length) {
                console.warn('Index: WARNING - No process was removed! ID might not match.');
                console.warn('Index: Available IDs:', prevProcesses.map(p => p.id));
                console.warn('Index: Searching for ID:', id);
                console.warn('Index: ID type:', typeof id);
              }
              
              return newProcesses;
            });
            
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
      let simulationResult: AllResults;
      
      switch (selectedAlgorithm) {
        case 'FCFS':
          simulationResult = FCFS(processes);
          break;
        case 'SJF':
          simulationResult = SJF(processes);
          break;
        case 'SRTF':
          simulationResult = SRTF(processes);
          break;
        case 'RoundRobin':
          if (timeQuantum <= 0) {
            Alert.alert('Lỗi', 'Time quantum phải lớn hơn 0');
            return;
          }
          simulationResult = RoundRobin(processes, timeQuantum);
          break;
        default:
          simulationResult = FCFS(processes);
          break;
      }
      
      setResult(simulationResult);
      
      // Show success message
      Alert.alert(
        'Thành công! 🎉',
        `Đã hoàn thành simulation với thuật toán ${selectedAlgorithm} cho ${processes.length} processes`,
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

  const handleAlgorithmChange = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
    // Clear results when algorithm changes
    if (result) {
      setResult(null);
    }
  };

  const getAlgorithmDescription = (algorithm: Algorithm): string => {
    switch (algorithm) {
      case 'FCFS':
        return 'Processes được thực thi theo thứ tự đến trước, phục vụ trước. Thuật toán đơn giản nhất nhưng có thể gây ra hiện tượng Convoy Effect khi process có burst time dài đến trước.';
      case 'SJF':
        return 'Chọn process có burst time ngắn nhất để thực thi trước. Giảm thiểu average waiting time nhưng có thể gây starvation cho processes có burst time dài.';
      case 'SRTF':
        return 'Phiên bản preemptive của SJF. Process đang chạy có thể bị ngắt nếu có process mới đến với remaining time ngắn hơn. Tối ưu về average waiting time.';
      case 'RoundRobin':
        return `Mỗi process được cấp phát một time quantum (${timeQuantum}ms) để thực thi. Sau khi hết time quantum, process sẽ được đưa vào cuối hàng đợi. Đảm bảo fairness và phản hồi nhanh.`;
      default:
        return '';
    }
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

        {/* Process Input and List in Same Row */}
        <View style={styles.twoColumnContainer}>
          {/* Process Input Component with Algorithm Selector */}
          <View style={styles.leftColumn}>
            <ProcessInput
              onAddProcess={handleAddProcess}
              existingProcessIds={existingProcessIds}
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={handleAlgorithmChange}
              timeQuantum={timeQuantum}
              onTimeQuantumChange={setTimeQuantum}
            />
          </View>

          {/* Process List Component */}
          <View style={styles.rightColumn}>
            <ProcessList
              processes={processes}
              onRemoveProcess={handleRemoveProcess}
              onSimulate={handleSimulate}
              onClearAll={handleClearAll}
            />
          </View>
        </View>

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
              💡 Thuật toán {selectedAlgorithm}:
            </Text>
            <Text style={[styles.legendText, { fontSize: 14, lineHeight: 20 }]}>
              {getAlgorithmDescription(selectedAlgorithm)}
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