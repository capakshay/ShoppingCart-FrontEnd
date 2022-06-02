import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { TransferDataService } from 'src/app/services/transfer-data.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
})
export class EditProductsComponent implements OnInit {
  currentObj: any[] = [];

  constructor(
    private service: ProductService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private transferD: TransferDataService
  ) {
    this.currentObj.push(data);
  }

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    imgurl: new FormControl(),
    price: new FormControl(),
    currentCount: new FormControl(),
  });

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.currentObj[0].id),
      name: new FormControl(this.currentObj[0].name),
      imgurl: new FormControl(this.currentObj[0].imgurl),
      price: new FormControl(this.currentObj[0].price),
      quantity: new FormControl(this.currentObj[0].quantity),
    });
  }

  submit() {
    this.service.createPut(this.form.value).subscribe((res) => {});
  }
}
