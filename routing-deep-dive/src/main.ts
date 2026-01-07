import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { TasksComponent } from './app/tasks/tasks.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: 'tasks', //<your-domain>/tasks
        component: TasksComponent,
      },
    ]),
  ],
}).catch((err) => console.error(err));
