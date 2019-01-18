import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

  constructor(private dataServices: DataServiceService) {


  }
  saleVolume: any;
  StartDatepickerModel: any;
  EndDatepickerModel: any;
  dateSelectedStart: string;
  dateSelectedEnd: string;
  params: any;
  ngOnInit() {

  }

  async processReport() {

    let reportDateStart = await this.StartDatepickerModel.year + '-' + this.StartDatepickerModel.month + '-' + this.StartDatepickerModel.day;
    let reportEndDate = await this.EndDatepickerModel.year + '-' + this.EndDatepickerModel.month + '-' + this.EndDatepickerModel.day;
    let datePipe = new DatePipe('en-US');
    let newDateStart = await datePipe.transform(reportDateStart, 'yyyy-MM-dd');
    let newDateEnd = await datePipe.transform(reportEndDate, 'yyyy-MM-dd');
    this.dateSelectedStart = newDateStart;
    this.dateSelectedEnd = newDateEnd;

    //console.log(this.dateSelectedStart);

    this.params = {
      'dt': this.dateSelectedStart,
      'edt': this.dateSelectedEnd,
    }
    this.getSaleVolume();
  }
  async getSaleVolume() {
    console.log(this.params)
    let c = await this.dataServices.getSaleVolumeAll(this.params).then(res => {
      let name = [];
      let total = [];
      let qty = [];

      res.forEach(element => {
        name.push(element['food_type_desc_la']);
        total.push(element['Total']);
        qty.push(element['qty']);
      });

      //this.saleVolume = res;
      console.log(name);

      let chartByVolume = new Chart('canvasByType', {
        type: 'bar',
        data: {
          labels: name,
          datasets: [
            {
              label: 'ຍອດຂາຍຕາມປະເພດ',
              data: qty,
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
              ],
              borderWidth: 1,
              fill: true
            }
          ]
        }
      });
      let chartByMoney = new Chart('canvasByVol', {
        type: 'bar',
        data: {
          labels: name,
          datasets: [{
            label: 'ຍອດຂາຍຕາມປະເພດ',
            data: total,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)'
            ],
            fill: false,
          }]
        }
      });
    });

    let byUser = await this.dataServices.getSaleByUsers(this.params).then(res => {
      let users = [];
      let total = [];
      let qty = [];
      console.log(res);
      res.forEach(element => {
        users.push(element['username']);
        total.push(element['Total']);
        qty.push(element['qty']);
      });
      let chartByUsers = new Chart('canvasByUser', {
        type: 'bar',
        data: {
          labels: users,
          datasets: [{
            label: 'ຍອດຂາຍຕາມພະນັກງານ',
            data: total,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)'
            ],
            fill: false,
          }]
        }
      });
    });
    let byDay = await this.dataServices.getSaleByDay(this.params).then(res => {
      let day = [];
      let total = [];
      let qty = [];

      res.forEach(element => {
        day.push(element['order_date']);
        total.push(element['Total']);
        qty.push(element['qty']);
      });

      let chartByDay = new Chart('canvasByDay', {
        type: 'line',
        data: {
          labels: day,
          datasets: [{
            label: 'ຍອດຂາຍຕາມວັນທີ່ຂາຍ',
            data: total,
            borderColor: '#3498DB',
            fill: false,
          }]
        }
      });

    });

    let byFoods = await this.dataServices.getSaleByFood(this.params).then(res => {
      let foods = [];
      let total = [];
      let qty = [];


      res.forEach(element => {
        foods.push(element['food_name']);
        total.push(element['Total']);
        qty.push(element['qty']);
      });

      let chartByDay = new Chart('canvasByFood', {
        type: 'bar',
        data: {
          labels: foods,
          datasets: [{
            label: 'ລາຍຮັບຕາມອາຫານ',
            data: total,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)'
            ],
            fill: false,
          }]
        }, options: {
          legend: {
            display: true,
            fullWidth: true,
          }
        }
      });


    });
  }
}
