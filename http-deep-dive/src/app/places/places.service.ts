import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
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
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient
      .put<{ userPlaces: Place[] }>(this.backendURL + '/user-places', {
        placeId: place.id,
      })
      .pipe(
        tap({
          next: (resData) => this.userPlaces.set(resData.userPlaces),
        }),
        catchError((error) => {
          this.errorService.showError('Failed to store selected places');
          return throwError(() => new Error('Failed to store selected places'));
        })
      );
  }

  removeUserPlace(place: Place) {
    this.httpClient
      .delete(this.backendURL + '/user-places/' + place.id)
      .subscribe({
        complete: () => {
          this.userPlaces.update((prevPlace) =>
            prevPlace.filter((userPlace) => place.id !== userPlace.id)
          );
          console.log(`Place with id : ${place.id} removed from favorites`);
        },
      });
  }

  private fetchPlaces(endpoint: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(this.backendURL + '/' + endpoint)
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          this.errorService.showError(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
