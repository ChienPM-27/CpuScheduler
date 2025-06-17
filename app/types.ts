// types.ts
export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  completionTime?: number;
  turnaroundTime?: number;
  waitingTime?: number;
}

export interface FCFSResult {
  processes: Process[];
  ganttChart: Array<{ processId: string; startTime: number; endTime: number }>;
  averageWaitingTime: number;
  averageTurnaroundTime: number;
}
