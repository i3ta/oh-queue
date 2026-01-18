export interface LogEntry {
  id: number;
  timestamp: string;
  action: "clock_in" | "clock_out" | "enqueue" | "dequeue";
  gtid: string;
  student_gtid: string;
  name: string;
}
