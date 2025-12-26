import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private backendURL = 'http://localhost:3000';

  httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'places',
      'Something went wrong while fetching Available places!'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'user-places',
      'Something went wrong while fetching User places'
    );
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpClient.put(this.backendURL + '/user-places', {
      placeId,
    });
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(endpoint: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(this.backendURL + '/' + endpoint)
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
