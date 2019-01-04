import { DataServiceService } from './../../cores/data-service.service';
import { AuthServiceService } from './../../cores/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchenmonitor',
  templateUrl: './kitchenmonitor.component.html',
  styleUrls: ['./kitchenmonitor.component.css']
})
export class KitchenmonitorComponent implements OnInit {

  constructor(private auth: AuthServiceService, private dataService: DataServiceService) {

  }
  ticketQ: any;
  ngOnInit() {
    this.getKitchenMon();
  }
  getKitchenMon() {
    this.dataService.getTicketsInQ().then(kitchen => this.ticketQ = kitchen);
  }
}
