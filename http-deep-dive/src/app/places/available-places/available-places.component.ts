import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';
@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  isFetching = signal(false);
  error = signal('');
  places = signal<Place[] | undefined>(undefined);

  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);
    const availablePlacesSubscription = this.placesService
      .loadAvailablePlaces()
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error: Error) => {
          this.error.set(error.message);
        },
      });
    this.destroyRef.onDestroy(() => availablePlacesSubscription.unsubscribe());
  }

  onSelectPlace(place: Place) {
    const userPlacesSubscription = this.placesService
      .addPlaceToUserPlaces(place)
      .subscribe({
        next: (allUserPlaces) => {
          console.log('PUT | Response : ', allUserPlaces);
        },
      });

    this.destroyRef.onDestroy(() => userPlacesSubscription.unsubscribe());
  }
}
