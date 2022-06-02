import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransferDataService } from 'src/app/services/transfer-data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartTotal: number = 0;
  displayCart = false;
  @Output() newItemEvent = new EventEmitter<boolean>();
  constructor(private transferD: TransferDataService) {}

  ngOnInit(): void {
    this.transferD.getOrderCount().subscribe((orderCount) => {
      this.cartTotal = orderCount.cartTotal;
    });
  }

  onCart() {
    this.displayCart = !this.displayCart;
    this.newItemEvent.emit(this.displayCart);
  }
}
