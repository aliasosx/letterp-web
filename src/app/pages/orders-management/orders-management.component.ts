import { DataServiceService } from 'src/app/cores/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {

  constructor(private dataServices: DataServiceService) {
    this.orderTracking();
  }
  orders_ongoing: any;
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
}
