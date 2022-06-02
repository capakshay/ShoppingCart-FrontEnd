import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { UserCartService } from './../../services/user-cart.service';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<number>();
  sumCount = 0;
  productlist: any[] = [];
  userid: any;

  constructor(
    private dialog: MatDialog,
    private userCart: UserCartService,
    private userService: UsersService,
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.allProductsAndImages();
  }

  allProductsAndImages() {
    this.service.getProduct().subscribe((response) => {
      this.productlist = response;
    });
  }

  openDialog(obj: any) {
    const dialogRef = this.dialog.open(ProductPopupComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.sendToCart();
    });
  }

  sendToCart() {
    this.userid = this.userService.getLoginUserId();
    let data = {
      user_id: this.userid,
    };

    if (this.userid) {
      this.userCart.getUserCart(data).subscribe((res) => {
        var obj = JSON.stringify(res);
        var json = JSON.parse(obj);
        json.data.map((ele: any) => {
          this.sumCount += ele.quantity;
        });
        console.log('sum', this.sumCount);
        this.messageEvent.emit(this.sumCount);
        this.sumCount = 0;
      });
    }
  }

  addCart() {}
}
