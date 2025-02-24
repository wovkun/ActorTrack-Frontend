import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContractService } from '../../core/services/contract.service';
import { Contract } from '../../shared/models/contract.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actor } from '../../shared/models/actor.model';
import { ActorService } from '../../core/services/actor.service';
import {
  ActiveComponentService,
  ActiveComponentType,
} from '../../core/services/routing.service';

@Component({
  selector: 'app-create-contract',
  standalone: true,
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
})
export class CreateContractComponent implements OnInit {
  contractForm: FormGroup;
  formSubmitted = false;
  actorsList: Actor[] = [];

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private actorService: ActorService,
    private activeComponentService: ActiveComponentService
  ) {
    this.contractForm = this.fb.group({
      actorId: ['', Validators.required],
      performanceId: ['', Validators.required],
      role: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      baseSalary: [null, [Validators.required, Validators.min(0)]],
      bonus: [null, [Validators.min(0)]],
    });
  }

  onSelectComponent(component: ActiveComponentType) {
    this.activeComponentService.setActiveComponent(component);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['performanceId']) {
        this.contractForm.patchValue({
          performanceId: params['performanceId'],
        });
      }
    });
    this.fetchActors();
  }

  get formControls() {
    return this.contractForm.controls;
  }

  fetchActors() {
    this.actorService.getAllActors().subscribe(
      (actors) => {
        this.actorsList = actors;
      },
      (error) => {
        console.error('Error fetching actors:', error);
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.contractForm.invalid) {
      return;
    }

    const contractData: Contract = this.contractForm.value;

    this.contractService.createContract(contractData).subscribe(
      (response) => {
        this.snackBar.open('Contract created successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/home']);
        this.activeComponentService.setActiveComponent('contracts');
      },
      (error) => {
        this.snackBar.open(
          'Failed to create contract. Please try again.',
          'Close',
          {
            duration: 3000,
          }
        );
        console.error('Error creating contract:', error);
      }
    );
    
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }
}
