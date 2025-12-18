import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    const rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
    return this.http.get(
      'https://mean-stack-restaurant-ordering-website-production.up.railway.app/products',
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  deleteProduct(id: string): Observable<any> {
    const rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
    return this.http.delete(
      `https://mean-stack-restaurant-ordering-website-production.up.railway.app/product/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
