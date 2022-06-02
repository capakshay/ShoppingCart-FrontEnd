import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isDisplay: boolean = false;

  addItem(value: boolean) {
    console.log(value);
    this.isDisplay = value;
  }
}
