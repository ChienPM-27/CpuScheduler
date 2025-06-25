// roundRobin.ts
import { Process, RoundRobinResult } from '../types';

export const RoundRobin = (inputProcesses: Process[], timeQuantum: number): RoundRobinResult => {
  const processes = [...inputProcesses].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const ganttChart: RoundRobinResult['ganttChart'] = [];
  const resultProcesses: Process[] = [];
  
  // Initialize remaining time for each process
  const remainingTime = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const readyQueue: typeof remainingTime = [];
  
  let currentTime = 0;
  let completed = 0;
  let processIndex = 0;

  while (completed < processes.length) {
    // Add newly arrived processes to ready queue
    while (processIndex < processes.length && processes[processIndex].arrivalTime <= currentTime) {
      const process = remainingTime.find(p => p.id === processes[processIndex].id);
      if (process && !readyQueue.includes(process)) {
        readyQueue.push(process);
      }
      processIndex++;
    }

    if (readyQueue.length === 0) {
      // No process in ready queue, move to next arrival time
      if (processIndex < processes.length) {
        currentTime = processes[processIndex].arrivalTime;
      }
      continue;
    }

    // Get the first process from ready queue
    const currentProcess = readyQueue.shift()!;
    const executionTime = Math.min(timeQuantum, currentProcess.remainingTime);
    
    // Execute the process
    const startTime = currentTime;
    const endTime = currentTime + executionTime;
    
    ganttChart.push({ 
      processId: currentProcess.id, 
      startTime, 
      endTime 
    });

    currentProcess.remainingTime -= executionTime;
    currentTime = endTime;

    // Check if process is completed
    if (currentProcess.remainingTime === 0) {
      const completionTime = currentTime;
      const turnaroundTime = completionTime - currentProcess.arrivalTime;
      const waitingTime = turnaroundTime - currentProcess.burstTime;

      resultProcesses.push({
        ...currentProcess,
        completionTime,
        turnaroundTime,
        waitingTime,
      });
      
      completed++;
    } else {
      // Add processes that arrived during execution
      while (processIndex < processes.length && processes[processIndex].arrivalTime <= currentTime) {
        const process = remainingTime.find(p => p.id === processes[processIndex].id);
        if (process && !readyQueue.includes(process) && process.id !== currentProcess.id) {
          readyQueue.push(process);
        }
        processIndex++;
      }
      
      // Add current process back to ready queue if not completed
      readyQueue.push(currentProcess);
    }
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
    timeQuantum,
  };
};