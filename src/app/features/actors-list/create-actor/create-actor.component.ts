import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActorService } from '../../../core/services/actor.service';
import { Actor } from '../../../shared/models/actor.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-actor',
  standalone: true,
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
})
export class CreateActorComponent implements OnInit {
  actorForm: FormGroup;
  formSubmitted = false;
  awardsError: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private actorService: ActorService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.actorForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      middleName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      experience: [null, [Validators.required, Validators.min(0)]],
      awards: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const actorId = params['actorId'];
      if (actorId) {
        this.isEditMode = true;
        this.actorService.getActorById(actorId).subscribe(
          (actor: Actor) => {
            this.actorForm.patchValue({
              firstName: actor.firstName,
              lastName: actor.lastName,
              middleName: actor.middleName,
              title: actor.title,
              experience: actor.experience,
              awards: actor.awards,
            });
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
    return this.actorForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.actorForm.invalid) {
      return;
    }

    const actorData: Actor = this.actorForm.value;

    if (this.isEditMode) {
      this.route.params.subscribe((params) => {
        const actorId = params['actorId'];

        this.actorService.updateActor(actorId, actorData).subscribe(
          (response) => {
            this.snackBar.open(`Actor edited successfully!`, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/home']);
          },
          (error) => {
            this.snackBar.open(
              'Failed to edit actor. Please try again.',
              'Close',
              { duration: 3000 }
            );
            console.error('Error editing actor:', error);
          }
        );
      });
    } else {
      this.actorService.createActor(actorData).subscribe(
        (response) => {
          this.snackBar.open(`Actor created successfully!`, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/home']);
        },
        (error) => {
          this.snackBar.open(
            'Failed to create actor. Please try again.',
            'Close',
            { duration: 3000 }
          );
          console.error('Error creating actor:', error);
        }
      );
    }
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }
}
