import { Product } from '../interfaces/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../interfaces/cartProduct.model';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  cartProducts: CartProduct[] = [];
  isCartEmpty: boolean = false;
  totalPrice!: number;
  selectedCartUserToken: string | undefined = undefined;
  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    const rawToken = localStorage.getItem('token');
    const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      'https://mean-stack-restaurant-ordering-website-production.up.railway.app/cart',
      {
        headers,
      }
    );
  }

  updateCart(newVersion: any): Observable<any> {
    let rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(
      'https://mean-stack-restaurant-ordering-website-production.up.railway.app/cart',
      newVersion,
      {
        headers: headers,
      }
    );
  }

  createCart(): Observable<any> {
    return this.http.post(
      'https://mean-stack-restaurant-ordering-website-production.up.railway.app/cart',
      [],
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        }),
      }
    );
  }

  addProductToCart(id: any): Observable<any> {
    return this.http.post(
      `https://mean-stack-restaurant-ordering-website-production.up.railway.app
/cart/${id}`,
      [],
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        }),
      }
    );
  }

  getCartProducts(userToken: undefined | string): Observable<any> {
    let token;
    if (userToken) token = userToken;
    else {
      let rawToken = localStorage.getItem('token');
      token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
    }

    return this.http.get(
      `https://mean-stack-restaurant-ordering-website-production.up.railway.app
/cart/products`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  deleteProductFromCart(id: string): Observable<any> {
    let rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
    if (!token) {
      throw () => new Error('User is not authenticated');
    }

    return this.http.delete(
      `https://mean-stack-restaurant-ordering-website-production.up.railway.app


/cart/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }

  deleteWholeProductFromCart(id: string): Observable<any> {
    let rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
    return this.http.delete(
      `https://mean-stack-restaurant-ordering-website-production.up.railway.app


/cart/wholeProduct/${id}`,
      {
        headers: new HttpHeaders({
          authorization: `Bearer ${token}`,
        }),
      }
    );
  }
}

//note: take care of case-sensetivity and don't use json.stringify or json.parse with the token
