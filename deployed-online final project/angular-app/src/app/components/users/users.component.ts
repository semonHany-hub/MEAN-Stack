import { UsersService } from '../../core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core/interfaces/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule, UserCardComponent, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users!: User[];
  errorMessage: string = '';

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users: User[]) => {
        console.log(users);
        this.users = users;
        if (!users.length) this.errorMessage = "there's no users yet!";
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = err.error.message || 'access denied, admin only!';
      },
      complete: () => {
        console.log('users loaded successfully!');
      },
    });
  }
}
