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
  customer: number;
  change: number;
  tickets: any;
  ticket: number;
  foods: any;
  orderDetail: any;
  received: number;

  paymentProcess: boolean = true;

  ngOnInit() {
    this.paymentForm = new FormGroup({
      'quantity': new FormControl()
    });

    let item = JSON.parse(localStorage.getItem('cart'));
    this.orderDetail = item;
  }
  async getCustomer() {
    const customer = await this.dataService.getCustomers().then((customers) => this.customers = customers);
  }
  paymentRecieveChange(e) {
    this.received = e;
    this.change = this.received - this.data.grandtotal;
  }
  loadChange() {
    this.change = 0;
  }
  ticketIdChange(e) {
    this.ticket = e;
    this.paymentCheck();
  }
  customerIdChange(e) {
    this.customer = e;
    this.paymentCheck();
  }
  async loadAliveTicket() {
    const t = await this.dataService.getAliveTickets().then((tickets) => this.tickets = tickets);
  }
  payment() {
    this.paymentProcess = true;
    let order = {
      "grandtotal": this.data.grandtotal,
      "ticketId": this.ticket,
      "statusId": 1,
      "userId": this.data.user['id'],
      "orderdetail": this.orderDetail,
      "customerId": this.customer,
      "received": this.received,
      "change": this.change
    }

    if (order) {
      this.dataService.createOrder(order).then((res) => {
        if (res['status'] == 'success') {
          this.activeModal.close('success');
        } else {
          return;
        }
      })
    }
  }
  paymentCheck() {
    if (!this.ticket || !this.customer) {
      this.paymentProcess = true;
    } else {
      this.paymentProcess = false;
    }
  }
}
