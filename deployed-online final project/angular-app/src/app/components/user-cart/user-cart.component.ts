import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartsService } from '../../core/services/carts.service';
import { CartProduct } from '../../core/interfaces/cartProduct.model';
import { CartBodyComponent } from '../cart-body/cart-body.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CartBodyComponent, RouterLink, CommonModule],
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
})
export class UserCartComponent implements OnInit, OnDestroy {
  cartProducts: CartProduct[] = [];
  selectedMeal: CartProduct | null = null;
  totalPrice: number = 0;

  private cartSubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    public cartsService: CartsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const token = params.get('token');
      if (!token) return;

      // Cancel previous cart subscription if any
      this.cartSubscription?.unsubscribe();

      this.totalPrice = 0; // reset before summing again

      this.cartSubscription = this.cartsService
        .getCartProducts(token)
        .subscribe({
          next: (products: CartProduct[]) => {
            this.cartProducts = products;
            this.cartsService.cartProducts = products;
            this.cartsService.isCartEmpty = products.length === 0;
            this.cartsService.selectedCartUserToken = token;

            // Calculate total safely
            this.totalPrice = products.reduce(
              (sum, p) => sum + p.quantity * p.price,
              0
            );
            this.cartsService.totalPrice = this.totalPrice;
          },
          error: (err: any) => {
            console.error('Failed to load cart:', err.message || err);
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
