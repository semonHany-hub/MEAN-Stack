import { Component } from '@angular/core';
import { SnacksHeaderComponent } from './snacks-header/snacks-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-snacks',
  imports: [SnacksHeaderComponent, RouterOutlet],
  templateUrl: './snacks.component.html',
  styleUrl: './snacks.component.css',
})
export class SnacksComponent {}
