import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { TransferDataService } from 'src/app/services/transfer-data.service';
import { UsersService } from 'src/app/services/users.service';
import { UserCartService } from './../../services/user-cart.service';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css'],
})
export class ProductPopupComponent implements OnInit {
  currentObj: any[] = []; //getting object to displaydata in popup
  currentCount = 0;
  cartTotal: number = 0;
  particularCount: number = 0;
  userid: number = 0;
  disablecart = false;
  message!: number;
  subscription!: Subscription;

  forImageSlider = [
    { imgurl: '', item: 'RedMi', price: 15999 },
    { imgurl: '', item: 'RedMi', price: 15999 },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private usercart: UserCartService,
    private user: UsersService,
    private notifyService: NotificationService
  ) {
    this.userid = this.user.getLoginUserId();
    this.currentObj.push(data);
  }

  ngOnInit(): void {
    this.getUserCart();
  }
  getUserCart() {
    if (!this.userid || localStorage.getItem('name') === 'Akshay') {
      this.disablecart = true;
    } else {
      let data = {
        user_id: this.userid,
        product_id: this.currentObj[0].id,
      };
      this.usercart.getUserCart(data).subscribe((res) => {
        var obj = JSON.stringify(res);
        var json = JSON.parse(obj);
        if (json.data) {
          this.currentObj[0].quantity = json.data.quantity;
          this.currentCount = this.currentObj[0].quantity;
        } else {
          this.currentObj[0].quantity = 0;
        }
      });
    }
  }

  addToCart() {
    let obj = {
      product: this.currentObj[0],
      count: this.currentCount,
      userid: this.userid,
    };
    this.usercart.postUserCart(obj).subscribe((res) => {
      // this.getUserCart();
      this.notifyService.showSuccess(
        `${this.currentCount} Product Added to Cart`,
        ''
      );
    });
  }

  addproduct(insert: number) {
    if (insert === 1) {
      this.currentCount = this.currentCount + 1;
    }
    if (insert === 2) {
      this.currentCount = this.currentCount - 1;
    }

    if (this.currentCount < 0) {
      this.currentCount = 0;
    }
  }
}

// if (insert === 1) {
//   // this.isMinus = false;
//   this.currentData = this.currentData + 1;
//   this.currentObj[0].currentCount =
//     this.currentObj[0].currentCount + insert;
// } else {
//   // this.isMinus = true;
//   this.currentData = this.currentData - 1;
//   this.currentObj[0].currentCount = this.currentObj[0].currentCount - 1;
// }

// if (this.currentData < 0) this.currentData = 0;

// send() {
//   let count = {
//     cartTotal: this.cartTotal + this.currentObj[0].currentCount,
//     particular: {
//       name: this.currentObj[0].name,
//       count: this.currentData,
//     },
//   };

//   this.transferD.setOrderCount(count);
// }
