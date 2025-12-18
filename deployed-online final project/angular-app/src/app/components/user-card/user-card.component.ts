import { Component, Input } from '@angular/core';
import { User } from '../../core/interfaces/user.model';
import { UsersService } from '../../core/services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user!: User;

  constructor(private usersService: UsersService, private router: Router) {}

  deleteUser() {
    this.usersService.deleteUser(this.user._id).subscribe({
      next: (res: any) => {
        console.log(res);
        const el = document.getElementById(this.user._id);
        if (el) {
          el.style.display = 'none';
        }
      },
      error: (err: any) => console.error(err),
      complete: () => console.log('user deleted successfully!'),
    });
  }

  goToCart() {
    console.log('user token: ', this.user.token);
    this.router.navigate(['/userCart', this.user.token]);
  }
}
