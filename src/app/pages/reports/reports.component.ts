import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { DatePipe } from '@angular/common';

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
  DatepickerModel: any;
  dateSelected: string;
  topFoods: any;
  ngOnInit() {

  }
  async loadReportbyKitchen() {
    const c = await this.dataService.getReportByKitchen(this.dateSelected).then(res => {
      //console.log(res);
      this.reportByKitchen = res;
    });
  }
  async loadReportByFoodType() {
    const c = await this.dataService.getReportByFoodType(this.dateSelected).then(res => {
      //console.log(res);
      this.resportByFoodType = res;
    });
  }
  async loadTopFood() {
    const c = await this.dataService.getTopFood(this.dateSelected).then(res => {
      //console.log(res);
      this.topFoods = res;
    });
  }
  async processReport() {
    console.log(this.DatepickerModel);
    let reportDate = this.DatepickerModel.year + '-' + this.DatepickerModel.month + '-' + this.DatepickerModel.day;
    let datePipe = new DatePipe('en-US');
    let newDate = datePipe.transform(reportDate, 'yyyy-MM-dd');
    this.dateSelected = newDate;
    console.log(newDate);
    this.loadReportbyKitchen();
    this.loadReportByFoodType();
    this.loadTopFood();
  }
}
