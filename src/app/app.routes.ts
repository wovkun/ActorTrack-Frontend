import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { HomeGuard } from './core/guards/home.guard';
import { ActorsListComponent } from './features/actors-list/actors-list.component';
import { CreateActorComponent } from './features/actors-list/create-actor/create-actor.component';
import { CreatePerformanceComponent } from './features/performances-list/create-performance/create-performance.component';
import { PerformancesListComponent } from './features/performances-list/performances-list.component';
import { CreateContractComponent } from './features/create-contract/create-contract.component';

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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'actors-list',
    component: ActorsListComponent,
  },
  {
    path: 'create-actor',
    component: CreateActorComponent,
  },
  {
    path: 'performance-list',
    component: PerformancesListComponent,
  },
  {
    path: 'create-performance',
    component: CreatePerformanceComponent,
  },
  {
    path: 'create-contract',
    component: CreateContractComponent,
  },
  {
    path: 'create-actor/:actorId',
    component: CreateActorComponent,
  },
  {
    path: 'create-performance/:performanceId',
    component: CreatePerformanceComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
