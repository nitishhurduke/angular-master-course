import { Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit {
  zone = inject(NgZone);
  ngOnInit() {
    setTimeout(() => {
      this.count.set(0);
    }, 4000);

    setTimeout(() => {
      console.log('Timer Expired!!');
      // Even though this has nothing to do with other components, Change dectection
      // mechanism works on all the components by zone.js
    }, 5000);

    //To avoid this wrap this function around runOutsideAngular function of NgZone object
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('Second Timer Expired!!');
        //This wont be watched by zone.js and change detection will not work on this.
      }, 5000);
    });
  }
  count = signal(0);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
