import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillgenerateComponent } from './billgenerate.component';

describe('BillgenerateComponent', () => {
  let component: BillgenerateComponent;
  let fixture: ComponentFixture<BillgenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillgenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillgenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
