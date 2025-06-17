// fcfsAlgorithm.ts
import { Process, FCFSResult } from '../types';

export const FCFS = (inputProcesses: Process[]): FCFSResult => {
  const sortedProcesses = [...inputProcesses].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const ganttChart: FCFSResult['ganttChart'] = [];
  const resultProcesses: Process[] = [];

  let currentTime = 0;

  for (const process of sortedProcesses) {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    const startTime = currentTime;
    const endTime = currentTime + process.burstTime;

    ganttChart.push({ processId: process.id, startTime, endTime });

    const completionTime = endTime;
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;

    resultProcesses.push({
      ...process,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    currentTime = endTime;
  }

  const averageWaitingTime =
    resultProcesses.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / resultProcesses.length;

  const averageTurnaroundTime =
    resultProcesses.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / resultProcesses.length;

  return {
    processes: resultProcesses,
    ganttChart,
    averageWaitingTime,
    averageTurnaroundTime,
  };
};
