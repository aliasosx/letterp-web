import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenReportsComponent } from './kitchen-reports.component';

describe('KitchenReportsComponent', () => {
  let component: KitchenReportsComponent;
  let fixture: ComponentFixture<KitchenReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
