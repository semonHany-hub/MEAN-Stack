import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BodyComponent } from './components/categoryBody/body.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Sub1Component } from './components/sub-1/sub-1.component';
import { Sub3Component } from './components/sub-3/sub-3.component';
import { Sub2Component } from './components/sub-2/sub-2.component';
import { FoodsComponent } from './components/foods/foods.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { SnacksComponent } from './components/snacks/snacks.component';
import { DefaultFoodImgComponent } from './components/foods/default-food-img/default-food-img.component';
import { DefaultDrinksImgComponent } from './components/drinks/default-drinks-img/default-drinks-img.component';
import { DefaultSnacksImgComponent } from './components/snacks/default-snacks-img/default-snacks-img.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CartComponent } from './components/cart/cart.component';
import { DefaultSubHomeComponent } from './components/default-sub-home/default-sub-home.component';
import { UsersComponent } from './components/users/users.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    children: [
      { path: '', component: DefaultSubHomeComponent },
      { path: 'sub1', component: Sub1Component },
      { path: 'sub2', component: Sub2Component },
      { path: 'sub3', component: Sub3Component },
    ],
  },
  {
    path: 'foods',
    component: FoodsComponent,
    title: 'Foods',
    children: [
      { path: '', component: DefaultFoodImgComponent },
      { path: ':meal', component: BodyComponent },
    ],
  },
  {
    path: 'drinks',
    component: DrinksComponent,
    title: 'drinks',
    children: [
      { path: '', component: DefaultDrinksImgComponent },
      { path: ':drink', component: BodyComponent },
    ],
  },
  {
    path: 'snacks',
    component: SnacksComponent,
    title: 'snacks',
    children: [
      { path: '', component: DefaultSnacksImgComponent },
      { path: ':snack', component: BodyComponent, title: 'Meal' },
    ],
  },
  { path: 'signIn', component: SignInComponent, title: 'Sign In' },
  { path: 'signUp', component: SignUpComponent, title: 'Sign Up' },
  { path: 'cart', component: CartComponent, title: 'cart' },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users',
  },
  {
    path: 'userCart/:token',
    component: UserCartComponent,
    title: 'userCart',
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
