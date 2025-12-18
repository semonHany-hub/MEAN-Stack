import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentUser: User | undefined = undefined;
  constructor(private http: HttpClient) {}

  signIn(userData: any): Observable<any> {
    return this.http.post(
      'https://mean-stack-restaurant-ordering-website-production.up.railway.app/signIn',
      userData
    );
  }

  accessVerification(token: any) {
    return token ? 'true' : 'false';
  }

  signUp(userData: any): Observable<any> {
    return this.http.post(
      'https://mean-stack-restaurant-ordering-website-production.up.railway.app/signUp',
      userData
    );
  }

  getUsers(): Observable<any> {
    let rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

    return this.http.get(
      'https://mean-stack-restaurant-ordering-website-production.up.railway.app/users',
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  deleteUser(id: string): Observable<any> {
    let rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

    return this.http.delete(
      `https://mean-stack-restaurant-ordering-website-production.up.railway.app
/user/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }

  getUser() {
    let rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

    this.http
      .get<User>(
        `https://mean-stack-restaurant-ordering-website-production.up.railway.app


/user`,
        {
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        }
      )
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('currentUser: ', user);
        },
        error: (err) => console.error(err),
      });
  }
}
