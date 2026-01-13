import { Component, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>(); // Automatically binded to the order query parameter
  userTasks = input.required<Task[]>();
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const taskService = inject(TasksService);
  const userTasks = taskService
    .allTasks()
    .filter((task) => task.userId === activatedRoute.paramMap.get('userId'));

  const orderType = activatedRoute.queryParamMap.get('order');
  if (orderType === 'asc') {
    userTasks.sort((a, b) => (a.id < b.id ? -1 : 1));
  } else {
    userTasks.sort((a, b) => (a.id < b.id ? 1 : -1));
  }
  return userTasks;
};
