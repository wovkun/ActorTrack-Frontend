import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../core/services/performance.service';
import { Performance } from '../../shared/models/performance.model';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-performances-list',
  templateUrl: './performances-list.component.html',
  styleUrls: ['./performances-list.component.scss'],
  imports: [MatTableModule, MatButtonModule, RouterLink],
  standalone: true,
})
export class PerformancesListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'year', 'budget', 'actions'];
  dataSource = new MatTableDataSource<Performance>();

  constructor(
    private performanceService: PerformanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPerformances();
  }

  loadPerformances(): void {
    this.performanceService.getPerformances().subscribe((performances) => {
      this.dataSource.data = performances;
    });
  }

  createPerformance(): void {
    this.router.navigate(['/create-performance']);
  }

  editPerformance(performanceId: string): void {
    this.router.navigate([`/create-performance/${performanceId}`]);
  }

  findActors(performanceId: string, performanceTitle: string) {
    this.router.navigate(['/create-contract'], {
      queryParams: { performanceId, performanceTitle },
    });
  }

  deletePerformance(performanceId: string): void {
    this.performanceService.deletePerformance(performanceId).subscribe(() => {
      this.loadPerformances();
    });
  }
}
