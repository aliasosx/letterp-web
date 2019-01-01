import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { DataServiceService } from 'src/app/cores/data-service.service';

@Component({
  selector: 'app-foodtype',
  templateUrl: './foodtype.component.html',
  styleUrls: ['./foodtype.component.css']
})
export class FoodtypeComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private dataService: DataServiceService) { }
  @Input() name: any;
  foodTypeForm: FormGroup;
  ngOnInit() {
    this.foodTypeForm = new FormGroup({
      'food_type': new FormControl(),
      'food_type_desc': new FormControl(),
      'food_type_desc_la': new FormControl()
    });
  }
  addFoodType() {
    if (this.foodTypeForm.valid) {
      this.dataService.createFoodType(this.foodTypeForm.value).then((res) => {
        if (res['status'] == 'success') {
          this.activeModal.close('success');
        } else {
          return
        }
      });
    }
  }
}
