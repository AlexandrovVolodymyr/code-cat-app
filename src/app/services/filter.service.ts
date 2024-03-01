import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isOpenFilter$: Observable<boolean> = this.filterState$.asObservable();

  getFilterState(): boolean {
    return this.filterState$.value;
  }

  setFilterState(value: boolean): void {
    this.filterState$.next(value);
  }
}
