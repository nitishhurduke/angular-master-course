import { Injectable, signal } from '@angular/core';
import { Task, TaskData, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private taskList = signal<Task[]>([]);
  allTasks = this.taskList.asReadonly();

  addNewTask(taskData: TaskData) {
    const newTask: Task = {
      id: this.generateID(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN',
    };
    this.taskList.update((oldTasks) => [...oldTasks, newTask]);
  }

  updateTaskStatus(taskId: string, udpdatedStatus: TaskStatus) {
    this.taskList.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: udpdatedStatus } : task
      )
    );
  }

  /**
   * Generate ID in Format : DDMMYYYYHHmmSS
   * @returns
   */
  private generateID(): string {
    const date = new Date();
    const pad = (num: number) => num.toString().padStart(2, '0');

    return (
      pad(date.getDate()) +
      pad(date.getMonth() + 1) +
      pad(date.getFullYear()) +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds())
    );
  }
}
