import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

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

    const subscription = this.clickCount$.subscribe({
      next: (value) =>
        console.log(`Clicked button ${this.clickCount()} times.`),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onClick() {
    this.clickCount.update((prevValue) => prevValue + 1);
  }
}
