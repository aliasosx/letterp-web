import { AuthServiceService } from './../../cores/auth-service.service';
import { Router } from '@angular/router';
import { CommonDialogComponent } from './../../dialogs/common-dialog/common-dialog.component';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { Item } from 'src/app/models/Item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentConfirmComponent } from 'src/app/payments/payment-confirm/payment-confirm.component';
import { QrPaymentComponent } from 'src/app/dialogs/qr-payment/qr-payment.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  constructor(private dataService: DataServiceService, private modalService: NgbModal, private route: Router, private auth: AuthServiceService) {
    let token = localStorage.getItem('abcd');
    if (!token) { route.navigateByUrl('/') }
    this.loadFoodType();
    this.loadFoods();
    if (localStorage.getItem('cart')) {
      this.loadCart();
    }
  }

  foodTypes: any;
  foods: any;
  paymentReady: boolean = false;
  noitemDiv = "show-empty";
  total: number = 0;
  tax: number = 0;
  tax_rate: number = 0;
  discount: number = 0;
  discount_rate: number = 0;
  grandTotal: number = 0;
  items: Item[] = [];
  userId: number;
  userInfo: any;


  ngOnInit() {
    this.auth.tokenVerify(localStorage.getItem('abcd')).then((user) => {
      this.userInfo = user;
      console.log(this.userInfo);
    });
  }
  async loadFoodType() {
    const f = await this.dataService.getFoodTypes().then(fd => this.foodTypes = fd);
  }
  async loadFoods() {
    const f = await this.dataService.getFoodForPOS().then(f => this.foods = f);
  }
  async tabSelected(foodtypeId) {
    if (foodtypeId == -1) {
      this.loadFoods();
    } else {
      const f = await this.dataService.getFoodByType(foodtypeId).then(f => this.foods = f);
    }
  }
  foodSelected(foodId) {
    //console.log(foodId);
  }

  addItemToCard(food: any, note) {
    if (food && !food.enabled_child_food) {
      let items: Item = {
        food: food,
        quantity: 1,
        note: note,
      };
      //console.log(items);
      if (localStorage.getItem('cart') == null) {
        let cart: any = [];
        cart.push(JSON.stringify(items));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
          let item: Item = JSON.parse(cart[i]);
          if (item.food['id'] == food['id']) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          cart.push(JSON.stringify(items));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let item: Item = JSON.parse(cart[index]);
          item.quantity += 1;
          cart[index] = JSON.stringify(item);
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
      this.loadCart();
    } else if (food && food.enabled_child_food) {
      const foodId = food['id'];
      const modalRef = this.modalService.open(CommonDialogComponent,
        {
          centered: true
        });
      modalRef.componentInstance.form_type = { 'form': 'parentalfood', 'description': 'Choose Sub Food', 'id': foodId, 'food_name': food['food_name'], 'food_name_en': food['food_name_en'] };
      modalRef.result.then((food) => {
        let items: Item = {
          food: food,
          quantity: 1,
          note: note,
        };
        //console.log(items);
        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(items));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);
            if (item.food['id'] == food['id']) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(items));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let item: Item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
          }
        }
        this.loadCart();
      });
    }
  }

  loadCart() {
    this.total = 0;
    this.grandTotal = 0;
    this.items = [];
    //this.emptyClass = "empty-icon";

    if (localStorage.getItem('cart') == null) {
      //this.emptyClass = "empty-icon";
      return;
    } else if (localStorage.getItem('cart').length == 2) {
      //this.emptyClass = "empty-icon";
      return;
    }
    if (localStorage.getItem('cart') != null) {
      //this.emptyClass = "hideEmpty";
      let cart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          food: item.food,
          quantity: item.quantity,
          note: item.note,
        });
        this.total += item.food.price * item.quantity;
        this.discount = (this.total * this.discount_rate) / 100;
        this.tax = (this.total * this.tax_rate) / 100;
        this.grandTotal = this.total - this.discount + this.tax;
      }
    }

    this.checkPayment();
  }

  checkPayment() {
    try {
      let items = JSON.parse(localStorage.getItem('cart'));

      if (items.length > 0) {
        this.paymentReady = true;
        this.noitemDiv = "hidden-div";
      } else {
        this.paymentReady = false;
        this.noitemDiv = "show-empty";
      }
    } catch (err) {
      this.paymentReady = false;
      this.noitemDiv = "show-empty";
    }

    //console.log(this.paymentReady);
  }

  removeCardItem(id: number) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index = -1;

    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.food['id'] == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
    this.checkPayment();
  }

  addnote(foodId) {
    const modalRef = this.modalService.open(CommonDialogComponent, {
      centered: true
    });
    modalRef.componentInstance.form_type = { 'form': 'addnote', 'description': 'add note', 'id': foodId };
    modalRef.result.then((data) => {
      this.addNoteToItem(data);
    });
  }

  addNoteToItem(data) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    //console.log(cart.length);
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.food['id'] == data.foodid) {
        index = i;
        break;
      }
    }
    let item: Item = JSON.parse(cart[index]);
    item.note = data.note;
    cart[index] = JSON.stringify(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }
  // Cash payment
  openPaymentForm() {
    const modalRef = this.modalService.open(PaymentConfirmComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = { 'grandtotal': this.grandTotal, 'user': this.userInfo };
    try {
      modalRef.result.then((res) => {
        if (res === 'success') {
          localStorage.removeItem('cart');
          this.loadCart();
          this.checkPayment();
        } else {
          return;
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  // QR payment

  openQRCodePayment() {
    const modalRef = this.modalService.open(QrPaymentComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.data = { 'grandtotal': this.grandTotal, 'user': this.userInfo }

    modalRef.result.then((res) => {
      console.log(res);
    });
    /*
    try {
      modalRef.result.then((res) => {
        if (res === 'success') {
          localStorage.removeItem('cart');
          this.loadCart();
          this.checkPayment();
        } else {
          return;
        }
      })
    } catch (err) {
      console.log(err);
    }
    */
  }

  getPhoto(f) {
    console.log(f);
    return this.dataService.getFoodPhoto(f);
  }

}
