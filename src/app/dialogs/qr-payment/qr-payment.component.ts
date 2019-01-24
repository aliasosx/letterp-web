import { Component, OnInit, Input, Injectable } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';
import { FormGroup, FormControl } from '@angular/forms';

declare var deepstream: any;

@Component({
  selector: 'app-qr-payment',
  templateUrl: './qr-payment.component.html',
  styleUrls: ['./qr-payment.component.css']
})

export class QrPaymentComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private dataService: DataServiceService, public sanitizer: DomSanitizer) {
    this.loadAliveTicket();
  }
  @Input() data: any;
  urlSafe: SafeResourceUrl;
  uuid1: string;
  qPayUrl = environment.QPayUrl;
  public url: string;


  paymentForm: FormGroup;
  customers: any;
  customer: number = 1;
  change: number = 0;
  tickets: any;
  ticket: number;
  ticket_number: number;
  foods: any;
  orderDetail: any;
  received: number;
  items_Print: any = [];
  paymentProcess: boolean = true;

  bankDataResponse: any;

  ngOnInit() {
    // Gen data for QR
    this.uuid1 = uuid();
    this.url = this.qPayUrl + "letterp.php?uuid=" + this.uuid1 + "&tid=0001&amount=" + 1 + "&invoiceId=00001&description=test";
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.getResponseFromDeepstream(this.uuid1);
    // End

    // data for normal payment
    this.paymentForm = new FormGroup({
      'quantity': new FormControl()
    });
    let item = JSON.parse(localStorage.getItem('cart'));
    this.orderDetail = item;
    this.received = this.data.grandtotal;
    item.forEach(element => {
      console.log(JSON.parse(element));
      let food = JSON.parse(element).food;
      console.log(food.food_name + ' - ' + food.food_name_en + ' q ' + JSON.parse(element).quantity + 'total ' + (JSON.parse(element).quantity * food.price))

      this.items_Print.push({
        "food_name": food.food_name_en.substring(0, 15),
        "quantity": JSON.parse(element).quantity,
        "total": (JSON.parse(element).quantity * food.price)
      })
    });
    console.log(this.items_Print);
  }
  async getCustomer() {
    const customer = await this.dataService.getCustomers().then((customers) => this.customers = customers);
  }
  getResponseFromDeepstream(uuid1) {
    console.log('Started ... ');
    const mcid = 'mch5c481be0ce38f';
    const ds = deepstream('wss://bcel.la:6020/onepayws');
    ds.login({ type: "invoice", mcid: mcid, uuid: uuid1 }, (success) => {
      if (success) {
        console.log('Login success');
      }
      ds.event.subscribe("invoice/" + mcid + "/" + uuid1 + "/transaction", (err, data) => {
        if (data) {
          console.log(data);
          this.bankDataResponse = data;
          this.payment();
        }
      });
    });
  }
  ticketIdChange(e, e2) {
    //console.log(e2);
    this.ticket = e;
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
      "customerId": 1,
      "received": this.orderDetail,
      "change": 0,
      "paymenttypeId": 2,
      "responseData": this.bankDataResponse,
      "bank": 'BCEL'
    }
    console.log(this.data.grandtotal + ' - ' + this.received + '-' + this.change);
    if (order) {
      this.dataService.createOrder(order).then((res) => {
        if (res['status'] == 'success') {
          this.print_thermal();
          this.activeModal.close('success');
        } else {
          return;
        }
      });
    }
  }
  async print_thermal() {
    const cs = await this.dataService.getTicketNumber(this.ticket).then(res => {
      this.ticket_number = res[0].tick_number;
    });

    if (this.ticket_number) {
      let printData = {
        "staff": this.data.user['fullname'],
        "ticket": this.ticket_number,
        "terminal": "01 - QR",
        "items": this.items_Print,
        "grandTotal": this.data.grandtotal,
        "recieved": this.data.grandtotal,
        "change": 0
      }
      console.log(printData);
      const c = await this.dataService.print_local(printData).then(res => {
        console.log(res);
      });
    }
  }
  payment_other() {
    this.paymentProcess = true;
    let order = {
      "grandtotal": this.data.grandtotal,
      "ticketId": this.ticket,
      "statusId": 1,
      "userId": this.data.user['id'],
      "orderdetail": this.orderDetail,
      "customerId": 1,
      "received": this.orderDetail,
      "change": 0,
      "paymenttypeId": 2,
      "responseData": this.bankDataResponse,
      "bankId": 'LVB'
    }
    console.log(this.data.grandtotal + ' - ' + this.received + '-' + this.change);
    if (order) {
      this.dataService.createOrder(order).then((res) => {
        if (res['status'] == 'success') {
          this.print_thermal();
          this.activeModal.close('success');
        } else {
          return;
        }
      });
    }
  }
}

