import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  search = '';
  colors = ['red', 'green', 'blue', 'yellow', 'purple'];
  role = 'admin';

  changeRole() {
    this.role = this.role === 'admin' ? 'user' : 'admin';
  }
}
