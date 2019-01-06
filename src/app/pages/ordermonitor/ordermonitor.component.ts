import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/cores/auth-service.service';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionDetailsComponent } from 'src/app/dialogs/transaction-details/transaction-details.component';

@Component({
  selector: 'app-ordermonitor',
  templateUrl: './ordermonitor.component.html',
  styleUrls: ['./ordermonitor.component.css']
})
export class OrdermonitorComponent implements OnInit {

  constructor(private auth: AuthServiceService, private dataService: DataServiceService, private modalService: NgbModal) {

    setInterval(() => {
      this.getOrderTracking();
    }, 5000);

    this.getOrderTracking();
  }
  orderTracks: any;
  order: any;

  ngOnInit() {

  }

  getOrderTracking() {
    this.dataService.getOrderTrack().then(res => {
      this.orderTracks = res;
      //console.log(res);
    });
  }
  async completeOrder(id, ticketId) {
    let ops = {
      'statusId': 2,
      'finish_datetime': Date.now(),
      'ticketId': ticketId
    }
    const o = await this.dataService.updateOrderStatus(id, ops).then((res) => {
      if (res['status'] == 'success') {
        this.getOrderTracking();
      } else {
        return;
      }
    });
  }

  async cancelOrder(id, ticketId) {

    let ops = {
      'statusId': 4,
      'finish_datetime': Date.now(),
      'ticketId': ticketId
    }
    //    console.log(ops);

    const o = await this.dataService.updateOrderStatus(id, ops).then((res) => {
      if (res['status'] == 'success') {
        this.getOrderTracking();
      } else {
        return;
      }
    });
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

    const o = await this.dataService.updateOrderStatus(id, ops).then((res) => {
      if (res['status'] == 'success') {
        this.getOrderTracking();
      } else {
        return;
      }
    });
  }

}
