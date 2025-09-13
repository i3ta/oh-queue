export interface LogEntry {
  id: number;
  gtid: string;
  name: string;
  operation: "enqueue" | "dequeue";
  timestamp: string;
  queueId: number | null;
  positionAtEnqueue?: number;
  processedBy?: string;
  notes?: string;
}
