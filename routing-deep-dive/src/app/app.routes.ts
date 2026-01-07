import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

export const appRoutes: Routes = [
  {
    path: 'tasks', //<your-domain>/tasks
    component: TasksComponent,
  },
];
