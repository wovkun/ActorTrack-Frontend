import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Actor } from '../../shared/models/actor.model';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ActorService {
  constructor(private readonly http: HttpClient) {}

  getAllActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`actors/getAllActors`).pipe(
      catchError((error) => {
        console.error('Error fetching actors:', error);
        return throwError(() => error);
      })
    );
  }

  getActorById(id: string): Observable<Actor> {
    return this.http.get<Actor>(`actors/getActorById/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching actor:', error);
        return throwError(() => error);
      })
    );
  }

  createActor(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(`actors/createActor`, actor).pipe(
      catchError((error) => {
        console.error('Error creating actor:', error);
        return throwError(() => error);
      })
    );
  }

  updateActor(id: string, actor: Actor): Observable<Actor> {
    return this.http.put<Actor>(`actors/updateActor/${id}`, actor).pipe(
      catchError((error) => {
        console.error('Error updating actor:', error);
        return throwError(() => error);
      })
    );
  }

  deleteActor(id: string): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`actors/deleteActor/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting actor:', error);
          return throwError(() => error);
        })
      );
  }
}
