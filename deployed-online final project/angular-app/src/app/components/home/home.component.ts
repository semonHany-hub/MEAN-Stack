import { UsersService } from '../../core/services/users.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sub1Component } from '../sub-1/sub-1.component';
import { Sub2Component } from '../sub-2/sub-2.component';
import { Sub3Component } from '../sub-3/sub-3.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeHeaderComponent } from './home-header/home-header.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterOutlet, HomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  warningMessage: string = '';
  constructor(private usersService: UsersService, private router: Router) {}

  handleCategories(category: string) {
    const token = localStorage.getItem('token');
    if (this.usersService.accessVerification(token)) {
      console.log('Access granted');
      this.warningMessage = '';
      this.router.navigate([`/${category}`]);
    } else {
      this.warningMessage = 'SignIn first, please!';
    }
  }
}
