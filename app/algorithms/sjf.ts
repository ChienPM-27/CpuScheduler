// sjf.ts
import { Process, SJFResult } from '../types';

export const SJF = (inputProcesses: Process[]): SJFResult => {
  const processes = [...inputProcesses];
  const ganttChart: SJFResult['ganttChart'] = [];
  const resultProcesses: Process[] = [];
  const readyQueue: Process[] = [];
  
  let currentTime = 0;
  let completed = 0;
  let processIndex = 0;

  // Sort processes by arrival time initially
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  while (completed < processes.length) {
    // Add all processes that have arrived by current time to ready queue
    while (processIndex < processes.length && processes[processIndex].arrivalTime <= currentTime) {
      readyQueue.push(processes[processIndex]);
      processIndex++;
    }

    if (readyQueue.length === 0) {
      // No process ready, jump to next arrival time
      if (processIndex < processes.length) {
        currentTime = processes[processIndex].arrivalTime;
      }
      continue;
    }

    // Sort ready queue by burst time (shortest first)
    readyQueue.sort((a, b) => a.burstTime - b.burstTime);
    
    // Select the shortest job
    const currentProcess = readyQueue.shift()!;
    
    const startTime = currentTime;
    const endTime = currentTime + currentProcess.burstTime;
    
    ganttChart.push({
      processId: currentProcess.id,
      startTime,
      endTime
    });

    const completionTime = endTime;
    const turnaroundTime = completionTime - currentProcess.arrivalTime;
    const waitingTime = turnaroundTime - currentProcess.burstTime;

    resultProcesses.push({
      ...currentProcess,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    currentTime = endTime;
    completed++;
  }

  // Sort result processes by original order
  const sortedResults = resultProcesses.sort((a, b) => 
    inputProcesses.findIndex(p => p.id === a.id) - inputProcesses.findIndex(p => p.id === b.id)
  );

  const averageWaitingTime =
    sortedResults.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / sortedResults.length;

  const averageTurnaroundTime =
    sortedResults.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / sortedResults.length;

  return {
    processes: sortedResults,
    ganttChart,
    averageWaitingTime,
    averageTurnaroundTime,
  };
};