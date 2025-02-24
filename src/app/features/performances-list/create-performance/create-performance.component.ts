import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerformanceService } from '../../../core/services/performance.service';
import { Performance } from '../../../shared/models/performance.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-performance',
  standalone: true,
  templateUrl: './create-performance.component.html',
  styleUrls: ['./create-performance.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
})
export class CreatePerformanceComponent implements OnInit {
  performanceForm: FormGroup;
  formSubmitted = false;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private performanceService: PerformanceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.performanceForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      budget: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const performanceId = params['performanceId'];
      if (performanceId) {
        this.isEditMode = true;
        this.performanceService.getPerformanceById(performanceId).subscribe(
          (performance: Performance) => {
            this.performanceForm.patchValue(performance);
          },
          (error) => {
            this.snackBar.open('Error fetching actor data.', 'Close', {
              duration: 3000,
            });
            console.error('Error fetching actor data:', error);
          }
        );
      }
    });
  }

  get formControls() {
    return this.performanceForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.performanceForm.invalid) {
      return;
    }

    const performanceData: Performance = this.performanceForm.value;

    if (this.isEditMode) {
      this.route.params.subscribe((params) => {
        const performanceId = params['performanceId'];

        this.performanceService
          .updatePerformance(performanceId, performanceData)
          .subscribe(
            (response) => {
              this.snackBar.open('Performance updated successfully!', 'Close', {
                duration: 3000,
              });
              this.router.navigate(['/home']);
            },
            (error) => {
              this.snackBar.open(
                'Failed to update performance. Please try again.',
                'Close',
                { duration: 3000 }
              );
              console.error('Error updating performance:', error);
            }
          );
      });
    } else {
      this.performanceService.createPerformance(performanceData).subscribe(
        (response) => {
          this.snackBar.open('Performance created successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/home']);
        },
        (error) => {
          this.snackBar.open(
            'Failed to create performance. Please try again.',
            'Close',
            { duration: 3000 }
          );
          console.error('Error creating performance:', error);
        }
      );
    }
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }
}
