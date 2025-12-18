import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  standalone: true,
})
export class SignInComponent {
  signInMessage: string = '';
  signInForm!: FormGroup;
  constructor(
    formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.signInForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const formData = this.signInForm.value;
      this.usersService.signIn(formData).subscribe({
        next: (response) => {
          console.log('Sign In Successful', response);
          this.signInMessage = response.message;
          localStorage.setItem('token', response?.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Sign In Failed', error);
          this.signInMessage = error.error?.message || 'Sign In Failed';
        },
        complete: () => {
          console.log('Sign In Request Completed');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
