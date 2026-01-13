import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange', //Runs Resolver on Param or Query Param Change
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];
