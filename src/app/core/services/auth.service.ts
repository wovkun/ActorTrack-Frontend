import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of, switchMap } from 'rxjs';
import { JwtService } from './jwt.service';
import {
  map,
  distinctUntilChanged,
  tap,
  shareReplay,
  catchError,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly router: Router
  ) {}

  login(requestBody: { username: string; password: string }): Observable<User> {
    return this.http.post<User>(`auth/login`, requestBody).pipe(
      tap((user) => {
        if (user.token) {
          this.jwtService.saveToken(user.token);
        } else {
          console.error('Login failed: No token received');
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  register(requestBody: {
    username: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>('auth/signup', requestBody).pipe(
      tap((user) => {
        if (user.token) {
          this.jwtService.saveToken(user.token);
        } else {
          console.error('Login failed: No token received');
        }
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.jwtService.destroyToken();
    void this.router.navigate(['/login']);
  }
}
