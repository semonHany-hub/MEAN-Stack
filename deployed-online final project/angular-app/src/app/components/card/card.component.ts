import { UsersService } from './../../core/services/users.service';
import { CartsService } from '../../core/services/carts.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Cart } from '../../core/interfaces/cart.model';
import { Product } from '../../core/interfaces/product.model';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { CartProduct } from '../../core/interfaces/cartProduct.model';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  @Input() cartProducts!: Product[];
  @Input() meal!: Product | CartProduct;
  @Input() page!: string;
  @Output() showDetailsModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() totalPriceEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  localStorageToken!: string | null;

  constructor(
    private productsService: ProductsService,
    public cartsService: CartsService,
    public usersService: UsersService
  ) {
    this.localStorageToken = localStorage.getItem('token');
  }
  handleDeleteProduct() {
    this.productsService.deleteProduct(this.meal._id).subscribe({
      next: () => {
        console.log('product deleted successfully!');
        document.getElementById(this.meal._id)?.remove();
      },
      error: (err) => {
        console.error(err);
        console.log('message from backend:', err.error);
      },
      complete: () => {
        console.log('deleting product completed!');
      },
    });
  }

  handleDeleteWholeProduct() {
    this.cartsService
      .deleteWholeProductFromCart(this.meal._id)
      .pipe(switchMap(() => this.cartsService.getCart()))
      .subscribe({
        next: (cart) => {
          console.log('new cart:', cart);
          document.getElementById(this.meal._id)?.remove();
          this.totalPriceEmitter.emit(cart.totalPrice);
        },
        error: (err) => console.error(err),
      });
  }

  handleAddToCart() {
    console.log('Adding meal to cart:', this.meal);

    if (!this.meal || !this.meal._id) {
      console.error('Meal or meal._id is undefined!');
      return;
    }

    this.cartsService
      .addProductToCart(this.meal._id)
      .pipe(switchMap(() => this.cartsService.getCart()))
      .subscribe({
        next: (cart) => this.totalPriceEmitter.emit(cart.totalPrice),
        error: (err) => console.error(err),
      });
  }

  handleDeleteFromCart() {
    this.cartsService.deleteProductFromCart(this.meal._id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartsService.getCart().subscribe({
          next: (cart) => this.totalPriceEmitter.emit(cart.totalPrice),
          error: (err) => console.error(err),
        });
      },
      error: (err) => console.error(err),
    });

    if ('quantity' in this.meal)
      if (this.meal.quantity > 1) {
        this.meal.quantity--;
      } else {
        document.getElementById(this.meal._id)?.remove();
      }
  }

  showDetails() {
    this.showDetailsModal.emit(this.meal);
  }

  get quantity() {
    if ('quantity' in this.meal) return (this.meal as CartProduct).quantity;
    else return null;
  }

  get totalPrice() {
    if ('quantity' in this.meal)
      return (this.meal as CartProduct).quantity * this.meal.price;
    else return null;
  }
}
