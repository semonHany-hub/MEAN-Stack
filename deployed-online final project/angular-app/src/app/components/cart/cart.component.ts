import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { CartsService } from '../../core/services/carts.service';
import { CartProduct } from '../../core/interfaces/cartProduct.model';
import { CartBodyComponent } from '../cart-body/cart-body.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, CartBodyComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartProducts: CartProduct[] = [];
  selectedMeal: CartProduct | null = null;
  totalPrice: number = 0;

  private cartSubscription?: Subscription;

  constructor(private cartsService: CartsService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartsService
      .getCartProducts(undefined)
      .subscribe({
        next: (products: CartProduct[]) => {
          this.cartProducts = products;
          this.cartsService.cartProducts = products;
          this.cartsService.isCartEmpty = products.length === 0;

          this.totalPrice = products.reduce(
            (sum, prod) => sum + prod.quantity * prod.price,
            0
          );
          this.cartsService.totalPrice = this.totalPrice;
        },
        error: (err) => {
          const message =
            err?.message?.message || err?.message || 'Unknown error';
          console.error('Cart loading error:', message);
        },
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  logOut(): void {
    localStorage.removeItem('token');
    console.log('You logged out!');
  }
}
