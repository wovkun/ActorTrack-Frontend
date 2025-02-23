import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
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
