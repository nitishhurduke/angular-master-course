import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  isFetching = signal(false);
  places = signal<Place[] | undefined>(undefined);
  httpClient = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';
  ngOnInit(): void {
    this.isFetching.set(true);
    this.httpClient
      .get<{ places: Place[] }>(this.backendUrl + '/places')
      .pipe(map((resData) => resData.places))
      .subscribe({
        next: (places) => this.places.set(places),
        complete: () => this.isFetching.set(false),
      });
  }
}
