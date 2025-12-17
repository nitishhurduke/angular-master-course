import { Injectable } from '@angular/core';
import { Task, TaskData } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskList: Task[] = [];
  addNewTask(taskData: TaskData) {
    this.taskList.unshift({
      id: this.generateID(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN',
    });
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
