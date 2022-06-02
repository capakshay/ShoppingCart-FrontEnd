import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jspdf from 'jspdf';

@Component({
  selector: 'app-billgenerate',
  templateUrl: './billgenerate.component.html',
  styleUrls: ['./billgenerate.component.css'],
})
export class BillgenerateComponent implements OnInit {
  billObj: any[] = [];
  totalcost = 0;
  title = 'HEllo save';
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.billObj = data[0];
    this.totalcost = data[1].cost;
  }

  ngOnInit(): void {}

  @ViewChild('content') content!: ElementRef;
  public SavePDF(): void {
    let pdf = new jspdf('p', 'pt', 'a4');
    pdf.html(this.content.nativeElement, {
      callback: (pdf) => {
        pdf.save('receipt.pdf');
      },
    });

    // doc.text('Hello world!', 10, 10);
    // doc.save('receipt.pdf');
  }

  // file() {
  //   // let CsvString = 'data:application/pdf,' + encodeURIComponent(this.title);
  //   // var x = document.createElement('a');
  //   // x.setAttribute('href', CsvString);
  //   // x.setAttribute('download', 'something.pdf');
  //   // document.body.appendChild(x);
  //   // x.click();
  // }
}
