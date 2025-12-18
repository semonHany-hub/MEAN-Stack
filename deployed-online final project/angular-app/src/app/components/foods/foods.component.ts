import { Component } from '@angular/core';
import { FoodsHeaderComponent } from './foods-header/foods-header.component';
import { BodyComponent } from '../categoryBody/body.component';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-foods',
  imports: [RouterOutlet, FoodsHeaderComponent],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css',
})
export class FoodsComponent {}
