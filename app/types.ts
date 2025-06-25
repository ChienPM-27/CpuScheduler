// types.ts
export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number; // For priority scheduling
  completionTime?: number;
  turnaroundTime?: number;
  waitingTime?: number;
}

export interface GanttChartEntry {
  processId: string;
  startTime: number;
  endTime: number;
}

// Base result interface
export interface SchedulingResult {
  processes: Process[];
  ganttChart: GanttChartEntry[];
  averageWaitingTime: number;
  averageTurnaroundTime: number;
}

// Specific result interfaces for each algorithm
export interface FCFSResult extends SchedulingResult {}

export interface SJFResult extends SchedulingResult {}

export interface SRTFResult extends SchedulingResult {}

export interface RoundRobinResult extends SchedulingResult {
  timeQuantum: number;
}

export interface PriorityResult extends SchedulingResult {
  preemptive?: boolean;
}

// Enum for algorithm types
export enum SchedulingAlgorithm {
  FCFS = 'FCFS',
  SJF = 'SJF',
  SRTF = 'SRTF',
  RoundRobin = 'RoundRobin',
  Priority = 'Priority',
  PriorityPreemptive = 'PriorityPreemptive'
}