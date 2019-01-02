import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  constructor(private dataService: DataServiceService) {
    this.loadFoodType();
    this.loadFoods();
    if (localStorage.getItem('cart')) {
      this.loadCart();
    }
  }

  foodTypes: any;
  foods: any;

  paymentReady: boolean = false;

  total: number = 0;
  tax: number = 0;
  tax_rate: number = 0;
  discount: number = 0;
  discount_rate: number = 0;
  grandTotal: number = 0;
  items: Item[] = [];

  ngOnInit() {

  }
  async loadFoodType() {
    const f = await this.dataService.getFoodTypes().then(fd => this.foodTypes = fd);
  }
  async loadFoods() {
    const f = await this.dataService.getFoodDetail().then(f => this.foods = f);
  }
  async tabSelected(foodtypeId) {
    if (foodtypeId == -1) {
      this.loadFoods();
    }
    const f = await this.dataService.getFoodByType(foodtypeId).then(f => this.foods = f);
  }
  foodSelected(foodId) {
    console.log(foodId);
  }

  addItemToCard(food: any, note) {

    if (food && !food.enabled_subtype) {
      let items: Item = {
        food: food,
        quantity: 1,
        note: note,
      };
      console.log(items);
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
    let items = JSON.parse(localStorage.getItem('cart'));

    if (items.length > 0) {
      this.paymentReady = true;
    } else {
      this.paymentReady = false;
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
}
