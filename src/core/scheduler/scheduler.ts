// src/core/scheduler/scheduler.ts
import type { ScheduledTask } from '../../shared/types.js';

interface TaskItem {
  id: string;
  name: string;
  schedule: string;
  handler: () => void | Promise<void>;
  enabled: boolean;
  lastRun?: number;
  nextRun?: number;
}

type TaskHandler = () => void | Promise<void>;

class Scheduler {
  private tasks: Map<string, TaskItem> = new Map();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private powerState: 'online' | 'sleep' = 'online';

  start(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.tick(), 60000);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  register(id: string, name: string, schedule: string, handler: TaskHandler): void {
    const next = this.parseCron(schedule);
    this.tasks.set(id, { id, name, schedule, handler, enabled: true, nextRun: next });
  }

  unregister(id: string): void {
    this.tasks.delete(id);
  }

  private tick(): void {
    if (this.powerState === 'sleep') return;
    const now = Date.now();
    for (const task of this.tasks.values()) {
      if (!task.enabled || !task.nextRun) continue;
      if (now >= task.nextRun) {
        task.handler();
        task.lastRun = now;
        task.nextRun = this.parseCron(task.schedule);
      }
    }
  }

  parseCron(expr: string): number {
    const parts = expr.split(' ');
    if (parts.length !== 5) return 0;
    const [min, hour] = parts.map(p => parseInt(p));
    const now = new Date();
    const next = new Date(now);
    next.setSeconds(0);
    next.setMilliseconds(0);
    next.setMinutes(min);
    next.setHours(hour);
    if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
    return next.getTime();
  }

  setPowerState(state: 'online' | 'sleep'): void {
    this.powerState = state;
  }
}

export const scheduler = new Scheduler();