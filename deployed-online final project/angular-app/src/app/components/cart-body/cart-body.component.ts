import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../core/services/carts.service';
import { CartProduct } from '../../core/interfaces/cartProduct.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-body',
  imports: [CommonModule, CardComponent],
  templateUrl: './cart-body.component.html',
  styleUrl: './cart-body.component.css',
})
export class CartBodyComponent {
  selectedMeal: CartProduct | null = null;

  constructor(public cartsService: CartsService) {}

  get cartProducts() {
    return this.cartsService.cartProducts;
  }
  updateTotalPrice(totalPrice: number) {
    this.cartsService.totalPrice = totalPrice;
  }
  showModal(meal: any) {
    this.selectedMeal = meal;
  }
}
