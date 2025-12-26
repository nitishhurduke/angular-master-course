import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  customInterval$ = new Observable((subscriber) => {
    let custCount = 0;
    const inervalFunc = setInterval(() => {
      custCount = custCount + 1;
      if (custCount > 3) {
        clearInterval(inervalFunc); // Important to handle cleaning steps before complete to avoid memory leaks
        subscriber.complete();
      }
      subscriber.next(custCount);
    }, 2000);
  });
  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
  }

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(map((value) => value * 2))
    //   .subscribe({
    //     next: (value) => console.log(value),
    //     complete: () => console.log('Operation completed successfully!'),
    //     error: (err) => console.log('Something went wrong, ', err.message),
    //   });
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
    // const subscription = this.clickCount$.subscribe({
    //   next: (value) =>
    //     console.log(`Clicked button ${this.clickCount()} times.`),
    // });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
    const custSubscription = this.customInterval$.subscribe({
      next: (value) => console.log(`Custom count : ${value}`),
      complete: () => {
        console.log('Custom count has finished');
        this.destroyRef.onDestroy(() => custSubscription.unsubscribe());
      },
    });
  }

  onClick() {
    this.clickCount.update((prevValue) => prevValue + 1);
  }
}
