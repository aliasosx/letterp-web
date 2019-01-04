import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenmonitorComponent } from './kitchenmonitor.component';

describe('KitchenmonitorComponent', () => {
  let component: KitchenmonitorComponent;
  let fixture: ComponentFixture<KitchenmonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenmonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenmonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
