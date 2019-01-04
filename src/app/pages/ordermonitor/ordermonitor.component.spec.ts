import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdermonitorComponent } from './ordermonitor.component';

describe('OrdermonitorComponent', () => {
  let component: OrdermonitorComponent;
  let fixture: ComponentFixture<OrdermonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdermonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdermonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
