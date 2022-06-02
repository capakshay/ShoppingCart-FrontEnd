import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-image-slider-popup',
  templateUrl: './image-slider-popup.component.html',
  styleUrls: ['./image-slider-popup.component.css'],
})
export class ImageSliderPopupComponent implements OnInit {
  @Input() forImageSliderPopup: any;
  constructor(private service: ProductService) {}

  tempUrl = '';
  imageurl: any[] = [];

  ngOnInit(): void {
    this.imageUrls();
  }

  imageUrls() {
    let id = this.forImageSliderPopup.id;
    this.service.getImageUrl(id).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.imageurl.push(res[i]);
      }
    });
  }
}
