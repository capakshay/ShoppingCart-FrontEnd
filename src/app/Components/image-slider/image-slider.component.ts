import { Component, Input, OnInit } from '@angular/core';
interface ProductList {
  imgurl: string;
  item: string;
  price: number;
}
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit {
  @Input() productlist: ProductList[] = [];
  firstImage: any;
  constructor() {}

  ngOnInit(): void {
    this.firstImage = this.productlist[0].imgurl;
  }
}
