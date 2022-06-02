import { UserCartService } from './../../services/user-cart.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isDisplay: boolean = false;
  isLogin!: boolean;
  name: any;
  opened = false;
  cartCount = 0;

  message = 0;

  forImageSlider = [
    { imgurl: './assets/images/Slider1.png', item: 'RedMi', price: 15999 },
    { imgurl: './assets/images/Slider2.png', item: 'Oppo', price: 14999 },
  ];
  userid = 0;

  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    private userCart: UserCartService,
    private notifyService: NotificationService
  ) {
    this.userdata();
  }

  ngOnInit() {
    this.getCartCount();
  }

  receiveMessage($event: number) {
    this.message = $event;
  }
  toggleOffCart() {
    this.opened = false;
  }

  getCartCount() {
    this.userid = this.userService.getLoginUserId();
    let data = {
      user_id: this.userid,
    };
    if (this.userid) {
      this.userCart.getUserCart(data).subscribe((res) => {
        var obj = JSON.stringify(res);
        var json = JSON.parse(obj);

        if (json.success === 1) {
          json.data.map((ele: any) => {
            this.cartCount += ele.quantity;
            this.message += ele.quantity;
          });
        }
      });
    }
  }

  userdata() {
    this.name = localStorage.getItem('name');
    if (this.name === 'Akshay') {
      this.isLogin = true;
    }
  }

  userLogin() {
    this.toggleOffCart();
    const dialogRef = this.dialog.open(UserLoginComponent, {
      height: '400px',
      width: '500px',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (res.data.role === 'role_admin') {
          this.isLogin = true;
          this.name = localStorage.getItem('name');
        }
        if (res.data.role === 'role_user') {
          this.name = localStorage.getItem('name');
          this.isLogin = false;
        }
      }
    });
  }

  userLogout() {
    this.toggleOffCart();
    this.notifyService.showInfo(
      `${localStorage.getItem('name')} Logout Succesfully`,
      ''
    );
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.isLogin = false;
  }

  isUserLogin() {
    return this.userService.checkUserLogin();
  }
}
