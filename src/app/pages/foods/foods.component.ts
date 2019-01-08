
import { AuthServiceService } from 'src/app/cores/auth-service.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodtypeComponent } from 'src/app/dialogs/foodtype/foodtype.component';
import { CommonDialogComponent } from 'src/app/dialogs/common-dialog/common-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  photoUrl = environment.photoPath;
  userInfo: any;
  file: File;
  photo: any = "../../../assets/images/No_Image_Available.gif";

  constructor(private dataService: DataServiceService, private route: Router, private auth: AuthServiceService, private modalService: NgbModal) {
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
  photoToSave: string;

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
      'food_name_en': new FormControl(),
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
        "parents_food_id": 0,
        "cost": 0,
        "price": 0,
        "currcode": 418,
        "enabled": true,
        "enabled_child_food": 1,
        "food_name": this.foodForm.get('food_name').value,
        "food_name_en": this.foodForm.get('food_name_en').value,
        "foodtypeId": this.foodForm.get('food_type').value,
        "photo": this.photoToSave,
        "kitchenId": this.foodForm.get('kitchen_code').value,
        "userId": this.userInfo.id,
      }
      // Slave food
    } else if (this.foodForm.get('food_master').value == 1) {
      food = {
        "parents_food_id": this.foodForm.get('food_parents').value,
        "cost": this.foodForm.get('cost').value,
        "price": this.foodForm.get('price').value,
        "currcode": 418,
        "enabled": true,
        "enabled_child_food": false,
        "food_name": this.foodForm.get('food_name').value,
        "food_name_en": this.foodForm.get('food_name_en').value,
        "foodtypeId": this.foodForm.get('food_type').value,
        "photo": this.photoToSave,
        "kitchenId": this.foodForm.get('kitchen_code').value,
        "userId": this.userInfo.id,
      }
    } else if (this.foodForm.get('food_master').value == 2) {
      food = {
        "parents_food_id": 0,
        "cost": this.foodForm.get('cost').value,
        "price": this.foodForm.get('price').value,
        "currcode": 418,
        "enabled": true,
        "enabled_child_food": false,
        "food_name": this.foodForm.get('food_name').value,
        "food_name_en": this.foodForm.get('food_name_en').value,
        "foodtypeId": this.foodForm.get('food_type').value,
        "photo": this.photoToSave,
        "kitchenId": this.foodForm.get('kitchen_code').value,
        "userId": this.userInfo.id,
      }
    }
    let performAddFood = await this.dataService.addFood(food).then(res => {
      //alert(res['status'] + ' reason ' + res['reason']);
      if (res['status'] == 'success') {
        this.foodForm.reset();
      }
      this.loadAll();
      this.photo = '../../../assets/images/No_Image_Available.gif';
    }).catch((res) => {
      alert(res['status'] + ' reason ' + res['reason']);
    });

  }
  async getUserInfo() {
    const user = await this.auth.tokenVerify(this.token).then(res => {
      this.userInfo = res;
      console.log(res.id);

    });
  }
  async getFoods() {
    const f = await this.dataService.getFoodDetail().then(foods => this.foods = foods).catch((err) => { console.log(err) });
  }

  async deleteFood(food) {
    if (food.enabled_child_food == 1) {
      alert('ບໍ່ສາມາດດຳເນິນການໄດ້');
      return
    } else {
      const deleteFood = await this.dataService.deleteFood(food.id).then(res => {
        alert(res.status);
        this.getFoods();
      });
    }
  }

  openFoodType() {
    const modalRef = this.modalService.open(FoodtypeComponent,
      {
        centered: true,
        size: 'lg'
      }
    );
    modalRef.componentInstance.name = "Hello";
    modalRef.result.then(() => {
      this.getFoodTypes();
    })
  };
  openKitchenDialog() {
    const modalRef = this.modalService.open(CommonDialogComponent,
      {
        centered: true,
        size: 'lg'
      });
    modalRef.componentInstance.form_type = { 'form': 'kitchen', 'description': 'add new Kitchen', 'id': '-1' };
    modalRef.result.then(() => {
      this.loadAll();
    });
  }

  openFoodInfo(id, enabled_child_food) {
    //console.log(enabled_child_food);
    if (enabled_child_food) {
      alert('Cannot update Parental Food');
      return;
    }
    const modalRef = this.modalService.open(CommonDialogComponent,
      {
        centered: true,
        //size: 'lg'
      });
    modalRef.componentInstance.form_type = { 'form': 'food', 'description': 'Food update', 'id': id };
    modalRef.result.then(() => {
      this.loadAll();
    });
  }

  loadAll() {
    this.getUserInfo();
    this.getFoodTypes();
    this.getMasterFood();
    this.getKitchen();
    this.getFoods();
  }
  async uploadFile(e) {
    this.file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e) => {
      this.photo = (<FileReader>e.target).result;
    }

    const c = await this.uploadFileToServer(this.file);
  }
  async uploadFileToServer(file) {
    console.log(file);
    const uploadData = new FormData();
    uploadData.append('image', file, file.name);
    this.dataService.uploadFoodImage(uploadData).then((res) => {
      this.photoToSave = this.photoUrl + '/images/uploads/foods/' + file.name;
    });
  }
}
