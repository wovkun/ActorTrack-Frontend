import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../core/services/actor.service';
import { Actor } from '../../shared/models/actor.model';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrl: './actors-list.component.scss',
  imports: [MatTableModule, MatButtonModule, RouterLink],
  standalone: true,
})
export class ActorsListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'middleName',
    'title',
    'experience',
    'awards',
    'actions',
  ];
  dataSource = new MatTableDataSource<Actor>();

  constructor(
    private actorService: ActorService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadActors();
  }

  loadActors(): void {
    this.actorService.getAllActors().subscribe((actors) => {
      this.dataSource.data = actors;
    });
  }

  createActor(): void {
    this.router.navigate(['/create-actor']);
  }

  editActor(actorId: string): void {
    this.router.navigate([`/create-actor/${actorId}`]);
  }

  deleteActor(actorId: string): void {
    this.actorService.deleteActor(actorId).subscribe(() => {
      this.loadActors();
    });
  }
}
