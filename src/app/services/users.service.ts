import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private userUrl = 'http://localhost:3000/user';

  getUser() {
    return this.http.get<any>(this.userUrl);
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token) return token;
    return '';
  }

  getLoginUserId() {
    let name = localStorage.getItem('token');

    const helper = new JwtHelperService();

    if (name) {
      const decodedToken = helper.decodeToken(name);
      return decodedToken.result.id;
    } else 0;
  }

  checkUserLogin() {
    const helper = new JwtHelperService();

    let myRawToken = localStorage.getItem('token');
    if (!myRawToken) return false;

    const isExpired = helper.isTokenExpired(myRawToken);

    return !isExpired;
  }

  checkLogin(data: any) {
    return this.http.post(`${this.userUrl}/login`, data).pipe(
      map((response) => {
        // Converting JSON object to js
        var obj = JSON.stringify(response);
        var json = JSON.parse(obj);

        if (json && json.token) {
          localStorage.setItem('token', json.token);
          localStorage.setItem('name', json.data.first_name);
          return {
            data: json.data,
            ispresent: true,
          };
        } else {
          return false;
        }
      })
    );
  }

  postUser(data: any) {
    return this.http.post(this.userUrl, data).subscribe((res) => {
      console.log(res);
    });
  }
}
