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
    this.loadKitchen();
  }

  reportByKitchen: any;
  resportByFoodType: any;
  date = new Date();
  DatepickerModel: any;
  dateSelected: string;
  topFoods: any;
  kitchens: any;
  kitchenId: number;
  params: any;
  showReport = 'hidden';
  noData = 'card';

  ngOnInit() {

  }
  async loadReportbyKitchen() {
    const c = await this.dataService.getAdminReportByKitchen(this.params).then(res => {
      console.log(res);
      this.reportByKitchen = res;
    });
  }
  async loadReportByFoodType() {
    const c = await this.dataService.getAdminReportByFoodType(this.params).then(res => {
      //console.log(res);
      this.resportByFoodType = res;
    });
  }
  async loadTopFood() {
    const c = await this.dataService.getAdminTopFood(this.params).then(res => {
      //console.log(res);
      this.topFoods = res;
    });
  }
  async processReport() {
    //console.log(this.DatepickerModel);
    let reportDate = this.DatepickerModel.year + '-' + this.DatepickerModel.month + '-' + this.DatepickerModel.day;
    let datePipe = new DatePipe('en-US');
    let newDate = datePipe.transform(reportDate, 'yyyy-MM-dd');
    this.dateSelected = newDate;
    this.params = {
      'dt': this.dateSelected,
      'kitchen': this.kitchenId
    }
    this.loadReportbyKitchen();
    this.loadReportByFoodType();
    this.loadTopFood();
    this.showReport = 'card';
    this.noData = 'hidden';
  }
  async loadKitchen() {
    const k = await this.dataService.getKitchen().then(kitchens => this.kitchens = kitchens);
  }
  async kitchenSelect() {
    this.kitchenId = 0;
    this.processReport();
  }
  async runnigSummation() {

  }
}
