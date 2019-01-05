import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/cores/auth-service.service';
import { DataServiceService } from 'src/app/cores/data-service.service';

@Component({
  selector: 'app-ordermonitor',
  templateUrl: './ordermonitor.component.html',
  styleUrls: ['./ordermonitor.component.css']
})
export class OrdermonitorComponent implements OnInit {

  constructor(private auth: AuthServiceService, private dataService: DataServiceService) {
    setInterval(() => {
      this.getOrderTracking();
    }, 5000);
    this.getOrderTracking();
  }
  orderTracks: any;
  ngOnInit() {

  }
  getOrderTracking() {
    this.dataService.getOrderTrack().then(res => {
      this.orderTracks = res;
      console.log(res);
    });
  }
  async completeOrder(id) {
    let ops = {
      'statusId': 2,
      'finish_datetime': Date.now()
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
    const o = await this.dataService.updateOrderStatus(id, ops).then((res) => {
      if (res['status'] == 'success') {
        this.getOrderTracking();
      } else {
        return;
      }
    });
  }

}
