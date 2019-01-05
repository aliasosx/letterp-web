import { DataServiceService } from './../../cores/data-service.service';
import { AuthServiceService } from './../../cores/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';

declare var $;

@Component({
  selector: 'app-kitchenmonitor',
  templateUrl: './kitchenmonitor.component.html',
  styleUrls: ['./kitchenmonitor.component.css']
})
export class KitchenmonitorComponent implements OnInit {

  constructor(private auth: AuthServiceService, private dataService: DataServiceService) {
    setInterval(() => {
      this.getKitchenMon();
    }, 5000);
  }
  orders: any;
  ticketQ: any;
  order_tracks: any;
  ngOnInit() {
    this.getKitchenMon();
  }
  getKitchenMon() {
    this.dataService.getTicketsInQ().then(kitchen => {
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

}
