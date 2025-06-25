// srtf.ts
import { Process, SRTFResult } from '../types';

interface ProcessWithRemaining extends Process {
  remainingTime: number;
}

export const SRTF = (inputProcesses: Process[]): SRTFResult => {
  const processes = [...inputProcesses];
  const ganttChart: SRTFResult['ganttChart'] = [];
  const resultProcesses: Process[] = [];
  
  // Initialize remaining time for each process
  const remainingProcesses: ProcessWithRemaining[] = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime
  }));

  let currentTime = 0;
  let completed = 0;
  let lastExecutedProcess: string | null = null;
  let lastStartTime = 0;

  while (completed < processes.length) {
    // Find all processes that have arrived by current time and are not completed
    const availableProcesses = remainingProcesses.filter(
      p => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    if (availableProcesses.length === 0) {
      // No process available, jump to next arrival time
      const nextArrival = remainingProcesses
        .filter(p => p.remainingTime > 0)
        .reduce((min, p) => Math.min(min, p.arrivalTime), Infinity);
      
      if (nextArrival !== Infinity) {
        currentTime = nextArrival;
      }
      continue;
    }

    // Find process with shortest remaining time
    const shortestProcess = availableProcesses.reduce((shortest, current) =>
      current.remainingTime < shortest.remainingTime ? current : shortest
    );

    // If we're switching to a different process, record the previous execution
    if (lastExecutedProcess && lastExecutedProcess !== shortestProcess.id) {
      ganttChart.push({
        processId: lastExecutedProcess,
        startTime: lastStartTime,
        endTime: currentTime
      });
    }

    // If starting a new process or switching processes
    if (lastExecutedProcess !== shortestProcess.id) {
      lastStartTime = currentTime;
      lastExecutedProcess = shortestProcess.id;
    }

    // Execute for 1 time unit
    shortestProcess.remainingTime--;
    currentTime++;

    // Check if process is completed
    if (shortestProcess.remainingTime === 0) {
      // Record the final execution segment
      ganttChart.push({
        processId: shortestProcess.id,
        startTime: lastStartTime,
        endTime: currentTime
      });

      const completionTime = currentTime;
      const turnaroundTime = completionTime - shortestProcess.arrivalTime;
      const waitingTime = turnaroundTime - shortestProcess.burstTime;

      resultProcesses.push({
        ...shortestProcess,
        completionTime,
        turnaroundTime,
        waitingTime,
      });

      completed++;
      lastExecutedProcess = null;
    }
  }

  // Merge consecutive gantt chart entries for the same process
  const mergedGanttChart: SRTFResult['ganttChart'] = [];
  for (const entry of ganttChart) {
    const lastEntry = mergedGanttChart[mergedGanttChart.length - 1];
    
    if (lastEntry && lastEntry.processId === entry.processId && lastEntry.endTime === entry.startTime) {
      // Merge with previous entry
      lastEntry.endTime = entry.endTime;
    } else {
      // Add new entry
      mergedGanttChart.push(entry);
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
    ganttChart: mergedGanttChart,
    averageWaitingTime,
    averageTurnaroundTime,
  };
};