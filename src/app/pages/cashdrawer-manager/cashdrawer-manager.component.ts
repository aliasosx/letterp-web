import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cashdrawer-manager',
  templateUrl: './cashdrawer-manager.component.html',
  styleUrls: ['./cashdrawer-manager.component.css']
})
export class CashdrawerManagerComponent implements OnInit {

  constructor() { }
  cashloadForm: FormGroup;
  btnDisabled = false;
  showBox = 'hidden';
  ngOnInit() {
    this.cashloadForm = new FormGroup({

    });
    this.btnDisabled = false;
  }
  loadCashAmountChange(value) {
    if (value && value >= 100000) {
      this.btnDisabled = true;
    } else {
      this.btnDisabled = false;
    }
  }
  processLoadCash() {
    this.btnDisabled = true;
    this.showBox = '';
  }
}
