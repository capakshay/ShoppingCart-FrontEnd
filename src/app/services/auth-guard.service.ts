import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}

  canActivate() {
    let myusername = localStorage.getItem('name');
    if (this.userService.checkUserLogin() && myusername === 'Akshay')
      return true;
    this.router.navigate(['/']);
    return false;
  }
}
