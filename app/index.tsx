import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { styles } from './styles';
import { Process, FCFSResult } from './types';
import { FCFS } from './algorithms/fcfs';

export default function Index() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [processId, setProcessId] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [burstTime, setBurstTime] = useState('');
  const [result, setResult] = useState<FCFSResult | null>(null);

  const addProcess = () => {
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

    if (processes.find(p => p.id === processId.trim())) {
      Alert.alert('Lỗi', 'Process ID đã tồn tại');
      return;
    }

    const newProcess: Process = {
      id: processId.trim(),
      arrivalTime: arrival,
      burstTime: burst,
    };

    setProcesses([...processes, newProcess]);
    setProcessId('');
    setArrivalTime('');
    setBurstTime('');
  };

  const removeProcess = (id: string) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const simulate = () => {
    if (processes.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng thêm ít nhất một process');
      return;
    }

    const result = FCFS(processes);
    setResult(result);
  };

  const clearAll = () => {
    setProcesses([]);
    setResult(null);
    setProcessId('');
    setArrivalTime('');
    setBurstTime('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CPU Scheduler Simulator</Text>
          <Text style={styles.headerSubtitle}>
            Thuật toán: First Come First Served (FCFS)
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thêm Process</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Process ID:</Text>
            <TextInput
              style={styles.textInput}
              value={processId}
              onChangeText={setProcessId}
              placeholder="Nhập Process ID (vd: P1)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Arrival Time:</Text>
            <TextInput
              style={styles.textInput}
              value={arrivalTime}
              onChangeText={setArrivalTime}
              placeholder="Nhập thời gian đến"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Burst Time:</Text>
            <TextInput
              style={styles.textInput}
              value={burstTime}
              onChangeText={setBurstTime}
              placeholder="Nhập thời gian thực thi"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={addProcess}>
            <Text style={styles.primaryButtonText}>Thêm Process</Text>
          </TouchableOpacity>
        </View>

        {processes.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Danh sách Processes</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>ID</Text>
                <Text style={styles.tableHeaderText}>AT</Text>
                <Text style={styles.tableHeaderText}>BT</Text>
                <Text style={styles.tableHeaderText}>Action</Text>
              </View>

              {processes.map((process, index) => (
                <View key={process.id} style={[styles.tableRow, index % 2 === 1 && styles.tableRowEven]}>
                  <Text style={styles.tableCellText}>{process.id}</Text>
                  <Text style={styles.tableCellText}>{process.arrivalTime}</Text>
                  <Text style={styles.tableCellText}>{process.burstTime}</Text>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removeProcess(process.id)}>
                    <Text style={styles.deleteButtonText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.successButton} onPress={simulate}>
                <Text style={styles.buttonText}>Chạy Simulation</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dangerButton} onPress={clearAll}>
                <Text style={styles.buttonText}>Xóa Tất Cả</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {result && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kết Quả FCFS</Text>
            <View style={[styles.table, { marginBottom: 16 }]}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>ID</Text>
                <Text style={styles.tableHeaderText}>AT</Text>
                <Text style={styles.tableHeaderText}>BT</Text>
                <Text style={styles.tableHeaderText}>CT</Text>
                <Text style={styles.tableHeaderText}>TAT</Text>
                <Text style={styles.tableHeaderText}>WT</Text>
              </View>

              {result.processes.map((process, index) => (
                <View key={process.id} style={[styles.tableRow, index % 2 === 1 && styles.tableRowEven]}>
                  <Text style={styles.tableCellText}>{process.id}</Text>
                  <Text style={styles.tableCellText}>{process.arrivalTime}</Text>
                  <Text style={styles.tableCellText}>{process.burstTime}</Text>
                  <Text style={styles.tableCellText}>{process.completionTime}</Text>
                  <Text style={styles.tableCellText}>{process.turnaroundTime}</Text>
                  <Text style={styles.tableCellText}>{process.waitingTime}</Text>
                </View>
              ))}
            </View>

            <View style={styles.ganttContainer}>
              <Text style={styles.ganttLabel}>Gantt Chart:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.ganttScrollView}>
                  {result.ganttChart.map((segment, index) => (
                    <View key={index} style={styles.ganttItem}>
                      <View style={styles.ganttBlock}>
                        <Text style={styles.ganttBlockText}>{segment.processId}</Text>
                      </View>
                      <View style={styles.ganttTimeContainer}>
                        <Text style={styles.ganttTimeText}>{segment.startTime}</Text>
                        <Text style={styles.ganttTimeText}>{segment.endTime}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.statsContainer}>
              <Text style={styles.statsTitle}>Thống Kê:</Text>
              <Text style={styles.statsText}>
                • Thời gian chờ trung bình: {result.averageWaitingTime.toFixed(2)} đơn vị
              </Text>
              <Text style={styles.statsText}>
                • Thời gian hoàn thành trung bình: {result.averageTurnaroundTime.toFixed(2)} đơn vị
              </Text>
            </View>
          </View>
        )}

        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Chú Thích:</Text>
          <Text style={styles.legendText}>• AT: Arrival Time</Text>
          <Text style={styles.legendText}>• BT: Burst Time</Text>
          <Text style={styles.legendText}>• CT: Completion Time</Text>
          <Text style={styles.legendText}>• TAT: Turnaround Time = CT - AT</Text>
          <Text style={styles.legendText}>• WT: Waiting Time = TAT - BT</Text>
        </View>
      </ScrollView>
    </View>
  );
}
