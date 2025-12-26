import { Component, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  httpClient = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';
  ngOnInit(): void {
    this.httpClient
      .get<{ places: Place[] }>(this.backendUrl + '/places')
      // .get<{ places: Place[] }>(this.backendUrl + '/places', {
      //   observe: 'response', //other oprion is 'event'
      // })
      .subscribe({
        // next: (response) => {
        //   console.log(response);
        // },
        next: (resData) => console.log(resData.places),
      });
  }
}
