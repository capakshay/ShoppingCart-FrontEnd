import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { EditProductsComponent } from '../edit-products/edit-products.component';

interface ObjectList {
  id: number;
  imgurl: string;
  name: string;
  price: number;
  currentCount: number;
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Input() refreshData: boolean = false;

  constructor(private service: ProductService, private dialog: MatDialog) {}

  currentObj: any[] = [];

  ngOnInit(): void {
    this.allProductsAndImages();
    this.autoRefreshData();
  }

  autoRefreshData() {
    this.service.RefreshRequired.subscribe((response) => {
      this.allProductsAndImages();
    });
  }
  allProductsAndImages() {
    this.service.getProduct().subscribe((response) => {
      this.currentObj = response;
    });
  }

  openDeleteDialog(obj: any) {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.allProductsAndImages();
    });
  }

  openEditDialog(obj: any) {
    const dialogRef = this.dialog.open(EditProductsComponent, {
      data: obj,
      width: '400px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.allProductsAndImages();
    });
  }
}
// objAdd: ObjectList[] = [];
// submit(f: any) {
//   let tempumgUrl = f.value.nameOfProduct.toLowerCase();
//   let tempObj = {
//     id: f.value.ItemId,
//     name: f.value.nameOfProduct,
//     imgurl: `./assets/images/${tempumgUrl}.jpg`,
//     price: f.value.price,
//     currentCount: 0,
//   };
//   this.service.getPost(tempObj).subscribe((res) => {});
// }
// url = './assets/images/';
// onFileChanged(event: any) {
//   const file = event.target.files[0];
//   console.log(file);

//   if (event.target.files) {
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (event: any) => {
//       this.url = event.target.result;
//     };
//   }
// }
