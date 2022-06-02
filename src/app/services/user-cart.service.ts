import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCartService {
  constructor(private http: HttpClient) {}

  private usercartUrl = 'http://localhost:3000/user_cart';

  getUserCart(data: any) {
    return this.http.post(`${this.usercartUrl}/getCart`, data);
  }

  postUserCart(data: any) {
    return this.http.post(`${this.usercartUrl}`, data);
  }

  deleteUserCart(data: number) {
    return this.http.delete(`${this.usercartUrl}/delete/${data}`);
  }
}
