import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.jwtService.getToken();
    if (!isAuthenticated) {
      this.router.navigate(['/signin']);
      return false;
    }
    console.log('token exists');
    return true;
  }
}
