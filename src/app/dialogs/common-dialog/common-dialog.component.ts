import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private dataService: DataServiceService) {
    this.getChefs();
  }
  @Input() form_type: any;

  KitchenForm: FormGroup;
  FoodInfo: FormGroup;

  chefs: any;

  ngOnInit() {
    // initialize kitchen form
    this.KitchenForm = new FormGroup({
      'kitchen_code': new FormControl(),
      'kitchen_name': new FormControl(),
      'userId': new FormControl()
    });
    this.FoodInfo = new FormGroup({
      "parents_food_id": new FormControl(),
      "cost": new FormControl(),
      "price": new FormControl(),
      "currcode": new FormControl(),
      "enabled": new FormControl(),
      "enabled_child_food": new FormControl(),
      "food_name": new FormControl(),
      "foodtypeId": new FormControl(),
      "photo": new FormControl(),
      "kitchenId": new FormControl(),
      "userId": new FormControl(),
    });
  }
  async getChefs() {
    const c = await this.dataService.getChefs().then(chefs => this.chefs = chefs);
  }
  addKitchen() {
    if (this.KitchenForm.valid) {
      this.dataService.createKitchen(this.KitchenForm.value).then((res) => {
        if (res['status'] == 'success') {
          this.activeModal.close('success');
        } else {
          return;
        }
      });
    }
  }
}
