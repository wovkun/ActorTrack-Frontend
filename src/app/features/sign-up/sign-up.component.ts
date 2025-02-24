import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordRegex } from '../../shared/validators/passwordRegex';
import { passwordMatchValidator } from '../../shared/validators/passwordMatchValidator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  formSubmitted = false;
  isSubmitting = false;
  usernameError: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.signUpForm = new FormGroup(
      {
        username: new FormControl('', {
          validators: [Validators.required, Validators.minLength(5)],
          updateOn: 'change',
        }),
        password: new FormControl('', {
          validators: [Validators.required, Validators.pattern(passwordRegex)],
          updateOn: 'change',
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'change',
        }),
      },
      { validators: passwordMatchValidator() }
    );
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.usernameError = null;

    if (this.signUpForm.valid) {
      const { username, password } = this.signUpForm.value;

      this.authService.register({ username, password }).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.usernameError =
            err.error?.message || 'Registration failed. Try again.';
        },
      });
    }
  }
}
