import { DataServiceService } from 'src/app/cores/data-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})

export class PaymentConfirmComponent implements OnInit {
  @Input() data: any;
  constructor(public activeModal: NgbActiveModal, private dataService: DataServiceService) {
    this.getCustomer();
    this.loadChange();
    this.loadAliveTicket();
  }
  paymentForm: FormGroup;
  customers: any;
  change: number;
  tickets: any;

  ngOnInit() {
    this.paymentForm = new FormGroup({
      'quantity': new FormControl()
    });

    let item = JSON.parse(localStorage.getItem('cart'));
    item.forEach(element => {
      console.log(element['food_name']);
    });

  }
  async getCustomer() {
    const customer = await this.dataService.getCustomers().then((customers) => this.customers = customers);
  }
  paymentRecieveChange(e) {
    this.change = e - this.data;
  }
  loadChange() {
    this.change = 0;
  }
  async loadAliveTicket() {
    const t = await this.dataService.getAliveTickets().then((tickets) => this.tickets = tickets);
  }
  payment() {
    let order = {
      "total": 65000,
      "ticketId": 1,
      "statusId": 1,
      "userId": 18,
      "orderdetail": [
        { "foodId": 51, "quantity": 1, "price": 65000, "total": 65000, "note": "" },
        { "foodId": 52, "quantity": 1, "price": 65000, "total": 65000, "note": "" }
      ]
      ,
      "customerId": 1
    }
  }
}
