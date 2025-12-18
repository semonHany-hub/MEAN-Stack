import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-foods-header',
  imports: [RouterLink],
  templateUrl: './foods-header.component.html',
  styleUrl: './foods-header.component.css',
})
export class FoodsHeaderComponent {
  logOut() {
    localStorage.removeItem('token');
    console.log('you logged Out!');
  }
}
