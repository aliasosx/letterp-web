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
  StartDatepickerModel: any;
  EndDatepickerModel: any;
  dateSelectedStart: string;
  dateSelectedEnd: string;
  topFoods: any;
  kitchens: any;
  kitchenId: number;
  params: any;
  showReport = 'hidden';
  noData = 'card';
  grandTotal: number = 0;
  costTotal: number = 0;
  reportUsers: any;
  ngOnInit() {

  }
  async loadReportbyKitchen() {
    const c = await this.dataService.getAdminReportByKitchen(this.params).then(res => {
      //console.log(res);
      this.reportByKitchen = res;
      this.runnigSummation();

    });
  }
  async loadReportByFoodType() {
    const c = await this.dataService.getAdminReportByFoodType(this.params).then(res => {
      console.log(res);
      this.resportByFoodType = res;
    });
  }
  async loadTopFood() {
    const c = await this.dataService.getAdminTopFood(this.params).then(res => {
      //console.log(res);
      this.topFoods = res;
    });
  }
  async loadReportbyUser() {
    const c = await this.dataService.getAdminRevenueByUser(this.params).then(res => {
      //console.log(res);
      this.reportUsers = res;
    });
  }
  async processReport() {
    //console.log(this.DatepickerModel);
    let reportDateStart = this.StartDatepickerModel.year + '-' + this.StartDatepickerModel.month + '-' + this.StartDatepickerModel.day;
    let reportEndDate = this.EndDatepickerModel.year + '-' + this.EndDatepickerModel.month + '-' + this.EndDatepickerModel.day;
    let datePipe = new DatePipe('en-US');
    let newDateStart = datePipe.transform(reportDateStart, 'yyyy-MM-dd');
    let newDateEnd = datePipe.transform(reportEndDate, 'yyyy-MM-dd');
    this.dateSelectedStart = newDateStart;
    this.dateSelectedEnd = newDateEnd;
    this.params = {
      'dt': this.dateSelectedStart,
      'edt': this.dateSelectedEnd,
      'kitchen': this.kitchenId
    }
    this.loadReportbyKitchen();
    this.loadReportByFoodType();
    this.loadTopFood();
    this.loadReportbyUser();
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

    if (this.reportByKitchen) {
      console.log(this.reportByKitchen);
      this.grandTotal = 0;
      this.costTotal = 0;
      const a = await this.reportByKitchen.forEach(element => {
        //console.log(element);
        this.grandTotal += parseInt(element['total']);
        this.costTotal += parseInt(element['cost']);
      });

    }
  }
}
