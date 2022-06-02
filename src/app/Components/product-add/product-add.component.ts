import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

interface ObjectList {
  id: number;
  imgurl: string;
  name: string;
  price: number;
  currentCount: number;
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  objAdd: ObjectList[] = [];
  refreshData: boolean = false;
  constructor(
    private service: ProductService,
    private http: HttpClient //public dialogRef: MatDialogRef<UserLoginComponent>
  ) {
    // dialogRef.close();
  }

  ngOnInit(): void {}

  selectedFile!: File;
  uploadedFiles: any;
  multipleImages: File[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    imgurl: new FormArray([]),
    price: new FormControl('', Validators.required),
    qty: new FormControl('', Validators.required),
    currentCount: new FormControl(),
  });

  get name() {
    return this.form.get('name');
  }
  get price() {
    return this.form.get('price');
  }
  get qty() {
    return this.form.get('qty');
  }

  submit() {
    let tempObj = {
      name: this.form.value.name,
      price: this.form.value.price,
      currentCount: this.form.value.qty,
      imageCount: this.multipleImages.length,
    };

    const formData = new FormData();
    for (let i = 0; i < this.multipleImages.length; i++) {
      const myNewFile = new File(
        [this.multipleImages[i]],
        this.form.value.name,
        { type: this.multipleImages[i].type }
      );

      formData.append('files', myNewFile);
    }

    this.http
      .post<any>('http://localhost:3300/multipleFiles', formData)
      .subscribe((res) => {
        console.log(res);
      });

    this.service.postProduct(tempObj).subscribe((res) => {
      console.log(res);
    });

    //this.refreshData = !this.refreshData;
    this.form.reset();
  }

  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }
  // onMultipleSubmit() {
  //   const formData = new FormData();
  //   for (let img of this.multipleImages) {
  //     formData.append('files', img);
  //   }

  //   this.http
  //     .post<any>('http://localhost:3300/multipleFiles', formData)
  //     .subscribe(
  //       (res) => console.log(res),
  //       (err) => console.log(err)
  //     );
  // }

  onFileChanged(f: any) {
    this.uploadedFiles = f.target.files[0];
  }
}
