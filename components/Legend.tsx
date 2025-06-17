import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
} from 'react-native';
import { styles } from '@/app/styles';
import { FCFSResult } from '@/app/types';

interface ResultsTableProps {
  result: FCFSResult;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ result }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>📈 Kết Quả FCFS</Text>
      
      <Animated.View 
        style={[
          styles.table, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>AT</Text>
          <Text style={styles.tableHeaderText}>BT</Text>
          <Text style={styles.tableHeaderText}>CT</Text>
          <Text style={styles.tableHeaderText}>TAT</Text>
          <Text style={styles.tableHeaderText}>WT</Text>
        </View>

        {result.processes.map((process, index) => {
          const rowAnim = new Animated.Value(0);
          
          Animated.timing(rowAnim, {
            toValue: 1,
            duration: 300,
            delay: index * 100,
            useNativeDriver: true,
          }).start();

          return (
            <Animated.View 
              key={process.id} 
              style={[
                styles.tableRow, 
                index % 2 === 1 && styles.tableRowEven,
                { opacity: rowAnim }
              ]}
            >
              <Text style={styles.tableCellText}>{process.id}</Text>
              <Text style={styles.tableCellText}>{process.arrivalTime}</Text>
              <Text style={styles.tableCellText}>{process.burstTime}</Text>
              <Text style={styles.tableCellText}>{process.completionTime}</Text>
              <Text style={styles.tableCellText}>{process.turnaroundTime}</Text>
              <Text style={styles.tableCellText}>{process.waitingTime}</Text>
            </Animated.View>
          );
        })}
      </Animated.View>

      <Animated.View 
        style={[
          styles.statsContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.statsTitle}>📊 Thống Kê:</Text>
        <Text style={styles.statsText}>
          ⏱️ Thời gian chờ trung bình: {result.averageWaitingTime.toFixed(2)} đơn vị
        </Text>
        <Text style={styles.statsText}>
          ⏰ Thời gian hoàn thành trung bình: {result.averageTurnaroundTime.toFixed(2)} đơn vị
        </Text>
      </Animated.View>
    </View>
  );
};