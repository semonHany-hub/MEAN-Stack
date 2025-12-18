import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { CartProduct } from '../../core/interfaces/cartProduct.model';

@Component({
  selector: 'app-body',
  imports: [CardComponent, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit, OnDestroy {
  meals!: CartProduct[];
  categoryProducts!: CartProduct[];
  selectedMeal: CartProduct | null = null;
  paramsSubscription!: Subscription;
  isSearched: boolean = false;
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe((params) => {
      console.log(params);
      let meal = params.get('meal');
      if (!meal) {
        meal = params.get('drink');
      }
      if (!meal) {
        meal = params.get('snack');
      }

      this.productsService.getProducts().subscribe((data: any) => {
        let category = data.find((obj: any) => obj.category == meal);
        this.meals = category?.products || [];
        this.categoryProducts = this.meals;
        console.log(meal, this.meals);
      });
    });
  }
  showModal(meal: any) {
    console.log('Meal passed to modal:', meal);
    this.selectedMeal = meal;
  }

  handleSearch(e: Event) {
    this.meals = this.categoryProducts.filter((prod) =>
      prod.title
        .toLowerCase()
        .includes((e.currentTarget as HTMLInputElement).value.toLowerCase())
    );
    if (!this.meals.length) {
      this.notFound = true;
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
