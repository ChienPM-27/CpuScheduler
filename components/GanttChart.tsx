import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import { styles } from '@/app/styles';
import { FCFSResult } from '@/app/types';

interface GanttChartProps {
  result: FCFSResult;
}

export const GanttChart: React.FC<GanttChartProps> = ({ result }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
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
    ]).start();
  }, []);

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'
  ];

  return (
    <Animated.View 
      style={[
        styles.ganttContainer, 
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <Text style={styles.ganttLabel}>📊 Gantt Chart</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.ganttScrollView}>
          {result.ganttChart.map((segment, index) => {
            const scaleAnim = new Animated.Value(0);
            
            // Animate each bar
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 300,
              delay: index * 100,
              useNativeDriver: true,
            }).start();

            return (
              <Animated.View 
                key={index} 
                style={[
                  styles.ganttItem,
                  { transform: [{ scaleY: scaleAnim }] }
                ]}
              >
                <View 
                  style={[
                    styles.ganttBlock, 
                    { 
                      backgroundColor: colors[index % colors.length],
                      height: 60 + (segment.endTime - segment.startTime) * 2, // Dynamic height
                    }
                  ]}
                >
                  <Text style={styles.ganttBlockText}>{segment.processId}</Text>
                </View>
                <View style={styles.ganttTimeContainer}>
                  <Text style={styles.ganttTimeText}>{segment.startTime}</Text>
                  <Text style={styles.ganttTimeText}>{segment.endTime}</Text>
                </View>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
};