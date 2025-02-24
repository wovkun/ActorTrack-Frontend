import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ActiveComponentType =
  | 'actors'
  | 'performances'
  | 'contracts'
  | 'default';

@Injectable({
  providedIn: 'root',
})
export class ActiveComponentService {
  private activeComponentSubject = new BehaviorSubject<ActiveComponentType>(
    'default'
  );
  activeComponent$ = this.activeComponentSubject.asObservable();

  setActiveComponent(component: ActiveComponentType) {
    this.activeComponentSubject.next(component);
  }
}
