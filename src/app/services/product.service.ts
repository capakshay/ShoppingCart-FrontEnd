import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  private _refreshRequired = new Subject<void>();

  get RefreshRequired() {
    return this._refreshRequired;
  }

  getImageUrl(id: number) {
    return this.http.get<any[]>(`${this.url}products/images/${id}`);
  }

  getProduct() {
    return this.http.get<any[]>(`${this.url}products`);
  }

  postProduct(postData: any) {
    return this.http.post(`${this.url}products`, postData).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  createPut(put: any) {
    return this.http.put(`${this.url}products/${put.id}`, put);
  }

  deleteProduct(deleteId: number) {
    return this.http.delete(`${this.url}products/${deleteId}`);
  }
}
