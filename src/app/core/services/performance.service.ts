import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Performance } from '../../shared/models/performance.model';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  constructor(private readonly http: HttpClient) {}

  getPerformances(): Observable<Performance[]> {
    return this.http.get<Performance[]>(`performances/getPerformances`).pipe(
      catchError((error) => {
        console.error('Error fetching performances:', error);
        return throwError(() => error);
      })
    );
  }

  getPerformanceById(id: string): Observable<Performance> {
    return this.http
      .get<Performance>(`performances/getPerformanceById/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching performance:', error);
          return throwError(() => error);
        })
      );
  }

  createPerformance(performance: Performance): Observable<Performance> {
    return this.http
      .post<Performance>(`performances/createPerformance`, performance)
      .pipe(
        catchError((error) => {
          console.error('Error creating performance:', error);
          return throwError(() => error);
        })
      );
  }

  updatePerformance(id: string, performance: Performance): Observable<Performance> {
    return this.http
      .put<Performance>(`performances/updatePerformance/${id}`, performance)
      .pipe(
        catchError((error) => {
          console.error('Error updating performance:', error);
          return throwError(() => error);
        })
      );
  }

  deletePerformance(id: string): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`performances/deletePerformance/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting performance:', error);
          return throwError(() => error);
        })
      );
  }
}
