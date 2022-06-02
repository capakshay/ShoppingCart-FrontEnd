import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { TransferDataService } from 'src/app/services/transfer-data.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent implements OnInit {
  currentObj: any[] = [];

  constructor(
    private service: ProductService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private transferD: TransferDataService
  ) {
    this.currentObj.push(data);
    console.log(this.currentObj[0]);
  }

  ngOnInit(): void {}

  deleteP(deleteProduct: any) {
    console.log(deleteProduct);
    this.service.deleteProduct(deleteProduct.id).subscribe((res) => {});
  }
}
