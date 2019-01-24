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
  ticket_number: number;
  foods: any;
  orderDetail: any;
  received: number;
  items_Print: any = [];

  paymentProcess: boolean = true;

  ngOnInit() {

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
  paymentRecieveChange(e) {
    if (e) {
      this.received = e;
      this.change = this.received - this.data.grandtotal;
    } else {
      this.received = this.data.grandtotal;
    }

  }
  loadChange() {
    this.change = 0;
  }
  ticketIdChange(e, e2) {
    console.log(e2);
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
      "customerId": 1,//this.customer,
      "received": this.received,
      "change": this.change,
      "paymenttypeId": 1,
      "bankId": 'cash'
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
      })
    }
  }
  paymentCheck() {
    if (!this.ticket) {
      this.paymentProcess = true;
    } else {
      this.paymentProcess = false;
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
        "terminal": "01 - Cash",
        "items": this.items_Print,
        "grandTotal": this.data.grandtotal,
        "recieved": this.received,
        "change": this.change
      }
      console.log(printData);
      const c = await this.dataService.print_local(printData).then(res => {
        console.log(res);
      });
    }

  }
}
