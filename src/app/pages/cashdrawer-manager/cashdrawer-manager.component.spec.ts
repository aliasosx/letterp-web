import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashdrawerManagerComponent } from './cashdrawer-manager.component';

describe('CashdrawerManagerComponent', () => {
  let component: CashdrawerManagerComponent;
  let fixture: ComponentFixture<CashdrawerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashdrawerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashdrawerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
