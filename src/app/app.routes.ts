import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { HomeGuard } from './core/guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [HomeGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
