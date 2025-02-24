import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ActorsListComponent } from '../actors-list/actors-list.component';
import { PerformancesListComponent } from '../performances-list/performances-list.component';
import { ContractsListComponent } from '../contracts-list/contracts-list.component';
import { NgIf, CommonModule } from '@angular/common';
import { CreateActorComponent } from '../actors-list/create-actor/create-actor.component';
import {
  ActiveComponentService,
  ActiveComponentType,
} from '../../core/services/routing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeaderComponent,
    ActorsListComponent,
    PerformancesListComponent,
    ContractsListComponent,
    NgIf,
    CommonModule,
    CreateActorComponent,
  ],
})
export class HomeComponent {
  activeComponent: ActiveComponentType = 'default';
  constructor(private activeComponentService: ActiveComponentService) {}

  ngOnInit(): void {
    this.activeComponentService.activeComponent$.subscribe((component) => {
      this.activeComponent = component;
    });
  }

  setActiveComponent(component: ActiveComponentType): void {
    this.activeComponentService.setActiveComponent(component);
  }
}
