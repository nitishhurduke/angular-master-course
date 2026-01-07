import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'tasks', //<your-domain>/tasks
    component: TasksComponent,
  },
];
