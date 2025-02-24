import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../core/services/contract.service';
import { ActorService } from '../../core/services/actor.service';
import { PerformanceService } from '../../core/services/performance.service';
import { Contract } from '../../shared/models/contract.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
})
export class ContractsListComponent implements OnInit {
  displayedColumns: string[] = [
    'role',
    'actorName',
    'performanceName',
    'baseSalary',
    'bonus',
    'actions',
  ];
  dataSource = new MatTableDataSource<Contract>();
  contracts: Contract[] = [];

  constructor(
    private contractService: ContractService,
    private actorService: ActorService,
    private performanceService: PerformanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.contractService.getContracts().subscribe((contracts) => {
      this.contracts = contracts;
      this.loadActorAndPerformanceNames();
    });
  }

  loadActorAndPerformanceNames(): void {
    this.contracts.forEach((contract, index) => {
      this.actorService.getActorById(contract.actorId).subscribe((actor) => {
        this.contracts[index].actorName = actor.lastName;
        this.dataSource.data = this.contracts;
      });


      this.performanceService
        .getPerformanceById(contract.performanceId)
        .subscribe((performance) => {
          this.contracts[index].performanceName = performance.title;
          this.dataSource.data = this.contracts;
        });
    });
  }

  createContract(): void {
    this.router.navigate(['/create-contract']);
  }

  editContract(contractId: string): void {
    this.router.navigate([`/edit-contract/${contractId}`]);
  }

  deleteContract(contractId: string): void {
    this.contractService.deleteContract(contractId).subscribe(() => {
      this.loadContracts();
    });
  }
}
