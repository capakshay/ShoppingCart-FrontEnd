import { UsersService } from 'src/app/services/users.service';
import { ProductService } from 'src/app/services/product.service';
import { UserCartService } from './../../services/user-cart.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private usercart: UserCartService,
    private user: UsersService,
    private notifyService: NotificationService
  ) {}
  currentObj: any[] = [];
  userid = 0;
  sum = 0;
  noOne = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userid = this.user.getLoginUserId();

    if (!this.userid) {
      this.noOne = true;
    } else {
      let data = {
        user_id: this.userid,
      };

      this.usercart.getUserCart(data).subscribe((res) => {
        var obj = JSON.stringify(res);
        var json = JSON.parse(obj);
        this.currentObj = json.data;

        if (this.currentObj.length === 0) {
          this.noOne = true;
        }
      });
    }
  }

  cancelProduct(num: number) {
    this.usercart.deleteUserCart(num).subscribe((res) => {
      this.getData();
      this.notifyService.showWarning(`Deleted Product From Cart`, '');
    });
  }
}
