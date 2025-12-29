import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log('[Outgoing Request]');
  console.log(request);

  const modifiedRequest = request.clone({
    headers: request.headers.set('X-DEBUG', 'TESTING'),
  });
  return next(modifiedRequest);
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
