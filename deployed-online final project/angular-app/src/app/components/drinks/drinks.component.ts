import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DrinksHeaderComponent } from './drinks-header/drinks-header.component';

@Component({
  selector: 'app-drinks',
  imports: [RouterOutlet, DrinksHeaderComponent],
  templateUrl: './drinks.component.html',
  styleUrl: './drinks.component.css',
})
export class DrinksComponent {}
