import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { UserCartService } from 'src/app/services/user-cart.service';
import { BillgenerateComponent } from '../billgenerate/billgenerate.component';

@Component({
  selector: 'app-buyproduct',
  templateUrl: './buyproduct.component.html',
  styleUrls: ['./buyproduct.component.css'],
})
export class BuyproductComponent implements OnInit {
  constructor(
    private usercart: UserCartService,
    private user: UsersService,
    private dialog: MatDialog
  ) {}
  currentObj: any[] = [];
  userid = 0;
  totalCost = 0;
  name!: string;

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.userid = this.user.getLoginUserId();
    let name = localStorage.getItem('name');
    if (name) {
      this.name = name;
    }
    let data = {
      user_id: this.userid,
    };
    this.usercart.getUserCart(data).subscribe((res) => {
      var obj = JSON.stringify(res);
      var json = JSON.parse(obj);
      this.currentObj = json.data;

      for (let i = 0; i < this.currentObj.length; i++) {
        this.totalCost +=
          this.currentObj[i].price * this.currentObj[i].quantity;
      }
    });
  }

  generateBill() {
    const dialogRef = this.dialog.open(BillgenerateComponent, {
      data: [
        this.currentObj,
        {
          cost: this.totalCost,
        },
      ],
      height: '400px',
      width: '500px',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
}
