import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-drinks-header',
  imports: [RouterLink],
  templateUrl: './drinks-header.component.html',
  styleUrl: './drinks-header.component.css',
})
export class DrinksHeaderComponent {
  logOut() {
    localStorage.removeItem('token');
    console.log('you logged Out!');
  }
}
