import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  RouterStateSnapshot,
  Routes,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { userRoutes } from './users/users.routes';
import { inject } from '@angular/core';

const checkAuthorization: CanMatchFn = (route: Route, url: UrlSegment[]) => {
  const router = inject(Router);
  const shouldAuthorize = Math.random();
  if (shouldAuthorize < 0.5) {
    return true;
  } else {
    return new RedirectCommand(router.parseUrl('/unauthorized'));
  }
};

export const appRoutes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', //<your-domain>/users/<uid>
    component: UserTasksComponent,
    canMatch: [checkAuthorization],
    children: userRoutes,
    data: { message: 'Hello!' },
    resolve: { userName: resolveUserName },
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Error',
  },
];
