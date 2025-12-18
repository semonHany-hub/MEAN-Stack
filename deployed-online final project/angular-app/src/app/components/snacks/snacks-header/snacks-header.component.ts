import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-snacks-header',
  imports: [RouterLink],
  templateUrl: './snacks-header.component.html',
  styleUrl: './snacks-header.component.css',
})
export class SnacksHeaderComponent {
  logOut() {
    localStorage.removeItem('token');
    console.log('you logged Out!');
  }
}
