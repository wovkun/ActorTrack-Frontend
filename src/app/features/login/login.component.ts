import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordRegex } from '../../shared/validators/passwordRegex';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  public signInForm!: FormGroup;
  formSubmitted = false;
  isSubmitting = false;
  loginFailed = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.loginFailed = false;

    if (this.signInForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const { username, password } = this.signInForm.value;

      this.authService.login({ username, password }).subscribe({
        next: (user) => {
          console.log('Login successful:', user);
          this.router.navigate(['/dashboard']); // Redirect after successful login
        },
        error: (err) => {
          console.error('Login error:', err);
          this.loginFailed = true;
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
