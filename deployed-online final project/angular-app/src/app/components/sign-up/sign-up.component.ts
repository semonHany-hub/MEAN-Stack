import { UsersService } from '../../core/services/users.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone: true,
})
export class SignUpComponent {
  signUpForm: FormGroup;
  signUpMessage: string = '';

  constructor(
    private builder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.signUpForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', [Validators.required, Validators.min(13), Validators.max(60)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-zA-Z0-9#*_+/-]{6,}$/),
        ],
      ],
      role: ['', [Validators.required]],
    });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get age() {
    return this.signUpForm.get('age');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get role() {
    return this.signUpForm.get('role');
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.usersService.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.signUpMessage = res.message;
          localStorage.setItem('token', res.fullInsertedUser.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          this.signUpMessage =
            err.error.message || 'this account already exist!, try sign in';
        },
      });
    } else {
      this.signUpMessage = 'form data is invalid!';
    }
  }
}
