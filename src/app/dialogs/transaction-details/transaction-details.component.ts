import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from 'src/app/cores/data-service.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private dataService: DataServiceService) {

  }
  @Input() order: any;
  orderDetails: any;
  ticketId: number;
  ngOnInit() {
    this.ticketId = this.order.ticketId;
    this.getOrderDetailByOrderId();
  }
  getOrderDetailByOrderId() {

    this.dataService.getTransactionByTicketId(this.ticketId).then(kitchen => {
      this.orderDetails = kitchen;
      console.log(kitchen);
    });
  }


}
