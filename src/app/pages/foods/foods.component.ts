import { async } from '@angular/core/testing';
import { AuthServiceService } from 'src/app/cores/auth-service.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  userInfo: any;
  constructor(private dataService: DataServiceService, private route: Router, private auth: AuthServiceService) {
    let token = localStorage.getItem('abcd');
    if (!token) { route.navigateByUrl('/') }
    this.getUserInfo();
    this.getFoodTypes();
    this.getMasterFood();
    this.getKitchen();
    this.getFoods();

  }
  token = localStorage.getItem('abcd');
  foodtypes: any;
  masterFoodOpt: boolean = true;
  showParentFoodStyle = "hidden-div";
  masterFoods: any;
  costAndPriceDisabled: boolean = true;
  kitchens: any;
  foodForm: FormGroup;
  alert: any;
  foods: any;

  ngOnInit() {

    this.foodForm = new FormGroup({
      'food_master': new FormControl(),
      'food_parents': new FormControl(),
      'cost': new FormControl(),
      'price': new FormControl(),
      'currcode': new FormControl(),
      'is_enabled': new FormControl(),
      'enable_child': new FormControl(),
      'food_name': new FormControl(),
      'food_type': new FormControl(),
      'photo_path': new FormControl(),
      'kitchen_code': new FormControl(),
      'created_by': new FormControl()
    });
  }
  getFoodTypes() {
    this.dataService.getFoodTypes().then(ft => {
      this.foodtypes = ft;
    });
  }
  masterFoodOption(opt) {
    console.log(opt);
    if (opt == 0) {
      this.masterFoodOpt = true;
      this.showParentFoodStyle = "hidden-div";
      this.costAndPriceDisabled = true;
    } else if (opt == 1) {
      this.masterFoodOpt = false;
      this.showParentFoodStyle = "form-group";
      this.costAndPriceDisabled = false;
    } else if (opt == 2) {
      this.masterFoodOpt = false;
      this.showParentFoodStyle = "hidden-div";
      this.costAndPriceDisabled = false;
    } else {
      this.masterFoodOpt = false;
      this.showParentFoodStyle = "hidden-div";
      this.costAndPriceDisabled = true;
    }
  }
  getMasterFood() {
    this.dataService.getFoodMasters().then(mf => {
      this.masterFoods = mf;
    })
  }
  getKitchen() {
    this.dataService.getKitchen().then(kt => {
      this.kitchens = kt;
    })
  }
  async addFood() {
    let food;
    // master Food
    if (this.masterFoodOpt) {
      food = {
        "food_master": 1,
        "food_parents": 0,
        "cost": 0,
        "price": 0,
        "currcode": 418,
        "is_enabled": 1,
        "enable_child": 1,
        "food_name": this.foodForm.get('food_name').value,
        "food_type": this.foodForm.get('food_type').value,
        "photo_path": "../../../assets/images/No_Image_Available.gif",
        "kitchen_code": this.foodForm.get('kitchen_code').value,
        "created_by": this.userInfo.username,
      }
      // Slave food
    } else if (this.foodForm.get('food_master').value == 1) {
      food = {
        "food_master": 0,
        "food_parents": this.foodForm.get('food_parents').value,
        "cost": this.foodForm.get('cost').value,
        "price": this.foodForm.get('price').value,
        "currcode": 418,
        "is_enabled": 1,
        "enable_child": 0,
        "food_name": this.foodForm.get('food_name').value,
        "food_type": this.foodForm.get('food_type').value,
        "photo_path": "../../../assets/images/No_Image_Available.gif",
        "kitchen_code": this.foodForm.get('kitchen_code').value,
        "created_by": this.userInfo.username,
      }
    } else if (this.foodForm.get('food_master').value == 2) {
      food = {
        "food_master": 0,
        "food_parents": 0,
        "cost": this.foodForm.get('cost').value,
        "price": this.foodForm.get('price').value,
        "currcode": 418,
        "is_enabled": 1,
        "enable_child": 0,
        "food_name": this.foodForm.get('food_name').value,
        "food_type": this.foodForm.get('food_type').value,
        "photo_path": "../../../assets/images/No_Image_Available.gif",
        "kitchen_code": this.foodForm.get('kitchen_code').value,
        "created_by": this.userInfo.username,
      }
    }
    let performAddFood = await this.dataService.addFood(food).then(res => {
      this.addFood = res;
      this.getFoods();
    });

  }
  async getUserInfo() {
    const user = await this.auth.tokenVerify(this.token).then(res => {
      this.userInfo = res;

    });
  }
  async getFoods() {
    const foods = await this.dataService.getFoods().then(foods => this.foods = foods);
  }

  async deleteFood(food) {
    if (food.food_master == 1) {
      alert('ບໍ່ສາມາດດຳເນິນການໄດ້');
      return
    } else {
      const deleteFood = await this.dataService.deleteFood(food._id).then(res => {
        alert(res.status);
        this.getFoods();
      });
    }
  }
}
