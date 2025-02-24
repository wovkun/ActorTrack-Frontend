import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import {
  ActiveComponentService,
  ActiveComponentType,
} from '../../../core/services/routing.service';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterLink],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private activeComponentService: ActiveComponentService
  ) {}

  onSelectComponent(component: ActiveComponentType) {
    this.activeComponentService.setActiveComponent(component);
  }

  public logout(): void {
    this.authService.logout();
    
  }
}
