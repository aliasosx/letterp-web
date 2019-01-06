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
    this.getFoodTypes();
    this.getKitchen();

  }
  @Input() form_type: any;

  KitchenForm: FormGroup;
  FoodInfo: FormGroup;
  foodtypes: any;
  chefs: any;
  food: any;
  kitchens: any;
  foodMasterSelectForm: FormGroup;
  subFoods: any;

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

    this.foodMasterSelectForm = new FormGroup({
      'parental_food': new FormControl()
    });

    if (this.form_type.id && this.form_type.id != '-1') {
      this.getFoodById(this.form_type.id);
    }
    this.getSubFood();
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
  async getFoodById(id) {
    const c = await this.dataService.getFoodById(id).then(food => {
      this.food = food
      this.FoodInfo.patchValue(this.food);
      //console.log(food);
    });
  }
  async getFoodTypes() {
    const c = await this.dataService.getFoodTypes().then(ft => {
      this.foodtypes = ft;
    });
  }
  async getKitchen() {
    const c = await this.dataService.getKitchen().then(kt => {
      this.kitchens = kt;
    })
  }

  async getSubFood() {
    const s = await this.dataService.getSubFood(this.form_type.id).then((res) => {
      this.subFoods = res;
    });
  }


  updateFood() {
    if (this.FoodInfo.valid) {
      let food = this.FoodInfo.value;
      this.dataService.updateFood({ id: this.food.id, data: food }).then((res) => {
        if (res['status'] == 'success') {
          this.activeModal.close('success');
        } else {
          return;
        }
      });
    }
  }
  async subfoodselect(e) {
    const c = await this.dataService.getFoodById(e.value).then(food => {
      if (food) {
        let subfood = food;
        subfood.food_name = this.form_type.food_name + ' - ' + food['food_name'];
        subfood.food_name_en = this.form_type.food_name_en + ' - ' + food['food_name_en'];
        this.activeModal.close(subfood);
      } else {
        return;
      }
    });
  }
  async addNote(e) {
    let data = {
      'note': e.value.trim(),
      'foodid': this.form_type.id,
    }
    this.activeModal.close(data);
  }
}
