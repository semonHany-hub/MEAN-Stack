import { UsersService } from './core/services/users.service';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'day12';
  constructor(private UsersService: UsersService) {
    this.UsersService.getUser();
  }
}
