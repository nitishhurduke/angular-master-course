import { Component, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  httpClient = inject(HttpClient);
  private backendURL = 'http://localhost:3000';

  userPlaces = signal<Place[]>([]);

  ngOnInit() {
    this.httpClient
      .get<{ places: Place[] }>(this.backendURL + '/user-places')
      .pipe(map((resData) => resData.places))
      .subscribe({
        next: (places) => this.userPlaces.set(places),
      });
  }
}
