import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface OrderCount {
  cartTotal: number;
  particular: {
    name: string;
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TransferDataService {
  private _orderCount = new BehaviorSubject<OrderCount>({
    cartTotal: 0,
    particular: {
      name: '',
      count: 0,
    },
  });
  sumPrice = 0;
  sumCount = 0;
  currentObj: any[] = [];

  constructor(private service: ProductService) {
    this.service.getProduct().subscribe((response) => {
      this.currentObj = response;
    });
  }

  private _orderCount$ = this._orderCount.asObservable();

  getOrderCount(): Observable<OrderCount> {
    //console.log(this._orderCount$);
    return this._orderCount$;
  }

  public retObject(): any[] {
    return this.currentObj;
  }

  setOrderCount(latestvalue: OrderCount) {
    const index = this.currentObj.findIndex((object) => {
      return object.name === latestvalue.particular.name;
    });

    this.currentObj[index].currentCount =
      this.currentObj[index].currentCount + latestvalue.particular.count;

    let count = {
      cartTotal: latestvalue.cartTotal,
      particular: {
        name: latestvalue.particular.name,
        count: this.currentObj[index].currentCount,
      },
    };
    this.service.createPut(this.currentObj[index]).subscribe((response) => {
      console.log(response);
    });
    return this._orderCount.next(count);
  }

  updateCurrentCount(name: any) {
    let prevCartTotal: any;
    let currCartTotal: any;

    this._orderCount$.subscribe((result) => {
      prevCartTotal = result.cartTotal;
    });

    currCartTotal = name.currentCount;
    let count = {
      cartTotal: prevCartTotal - currCartTotal,
      particular: {
        name: name.name,
        count: 0,
      },
    };
    this.setOrderCount(count);

    const index = this.currentObj.findIndex((object) => {
      return object.name === name.name;
    });

    this.currentObj[index].currentCount = 0;
    this.service.createPut(this.currentObj[index]).subscribe((response) => {});
  }

  setSum(num: number, num2: number) {
    this.sumPrice = num;
    this.sumCount = num2;
  }
  getSum() {
    return [this.sumPrice, this.sumCount];
  }
}
