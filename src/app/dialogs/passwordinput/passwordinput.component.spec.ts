import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordinputComponent } from './passwordinput.component';

describe('PasswordinputComponent', () => {
  let component: PasswordinputComponent;
  let fixture: ComponentFixture<PasswordinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
