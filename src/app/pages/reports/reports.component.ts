import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/cores/data-service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private dataService: DataServiceService) {
    this.loadReportbyKitchen();
    this.loadReportByFoodType();
    this.loadTopFood();
  }
  reportByKitchen: any;
  resportByFoodType: any;
  date = new Date();
  topFoods: any;
  ngOnInit() {

  }
  async loadReportbyKitchen() {
    const c = await this.dataService.getReportByKitchen().then(res => {
      //console.log(res);
      this.reportByKitchen = res;
    });
  }
  async loadReportByFoodType() {
    const c = await this.dataService.getReportByFoodType().then(res => {
      //console.log(res);
      this.resportByFoodType = res;
    });
  }
  async loadTopFood() {
    const c = await this.dataService.getTopFood(10).then(res => {
      //console.log(res);
      this.topFoods = res;
    });
  }
}
