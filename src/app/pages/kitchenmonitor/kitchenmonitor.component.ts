import { DataServiceService } from './../../cores/data-service.service';
import { AuthServiceService } from './../../cores/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-kitchenmonitor',
  templateUrl: './kitchenmonitor.component.html',
  styleUrls: ['./kitchenmonitor.component.css']
})
export class KitchenmonitorComponent implements OnInit {

  constructor(private auth: AuthServiceService, private dataService: DataServiceService, private route: Router) {
    let token = localStorage.getItem('abcd');
    if (!token) { route.navigateByUrl('/') }
    this.getUserInfo();
    setInterval(() => {
      this.getKitchenMon();
    }, 3000);
  }
  token = localStorage.getItem('abcd');
  orders: any;
  ticketQ: any;
  order_tracks: any;
  userInfo: any;
  kitchenId: any;
  ngOnInit() {
    this.getKitchenMon();
  }
  getKitchenMon() {
    this.dataService.getTicketsInQ(this.kitchenId[0].kitchenId).then(kitchen => {
      this.ticketQ = kitchen;
      this.dataPresentation(kitchen);
      //console.log(kitchen);
    });
  }
  dataPresentation(data: any) {
    this.orders = [];
    const source = from(data);
    const grouped = source.pipe(
      groupBy(result => result['tick_number']),
      mergeMap(group => group.pipe(toArray()))
    );

    grouped.subscribe(data => {
      this.orders.push(data);
    }
    );


    this.order_tracks = {
      'order': this.orders
    };
    //console.log(this.order_tracks);


  }
  getTimeOrderRemaing(orderTime) {
    let startTime = new Date(orderTime);
    var timestamp = startTime.getTime();
    //console.log(timestamp);

    let newDate = new Date();
    let newTimestamp = newDate.getTime();

    let diff = Math.round((newTimestamp - timestamp) / 1000);
    var d = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (d * 24 * 60 * 60);
    var h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    var m = Math.floor(diff / (60));
    diff = diff - (m * 60);

    var s = diff;
    //console.log(h + ':' + m + ':' + s)

    return h + ':' + m + ':' + s;
  }
  async getUserInfo() {
    const c = await this.auth.tokenVerify(this.token).then(res => this.userInfo = res);
    const a = await this.getKitchenId();
  }
  async getKitchenId() {
    const c = await this.dataService.getKitchenIdByUser(this.userInfo['id']).then(kid => {
      this.kitchenId = kid;
    })
  }

}
