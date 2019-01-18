import { TransactionDetailsComponent } from './../../dialogs/transaction-details/transaction-details.component';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {

  constructor(private dataServices: DataServiceService, private modalService: NgbModal) {
    this.orderTracking();
  }
  orders_ongoing: any;
  tableBg = "";
  ngOnInit() {

  }
  async orderTracking() {
    const c = await this.dataServices.getOrderAllForAdmin().then(res => {
      this.orders_ongoing = res;
      console.log(this.orders_ongoing);
    })
  }
  async undoFinishOrder(value) {
    let data = {
      'statusId': 1
    }
    const c = await this.dataServices.undoFinishedOrder(value, data).then(res => {
      if (res.status == 'success') {
        alert('reversed');
        this.orderTracking();
      } else {
        alert('Something when wrong ' + res.reason);
      }
    })
  }
  async openOrderDetail(order) {

    const modalRef = await this.modalService.open(TransactionDetailsComponent,
      {
        centered: true
      });
    modalRef.componentInstance.order = order;
  }
  async recieveFromKt(id, ticketId) {
    let ops = {
      'statusId': 7,
      'ticketId': ticketId
    }
    //    console.log(ops);

    const o = await this.dataServices.updateOrderStatus(id, ops).then((res) => {
      if (res['status'] == 'success') {
        this.orderTracking();
      } else {
        return;
      }
    });
  }
}
