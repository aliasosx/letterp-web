import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
declare var google: any;
export class AdminDashboardComponent implements OnInit {

  constructor() {
    google.charts.load('current', { 'packages': ['corechart'] });
  }
  protected buildChart(data: any[], chartFunc: any, options: any): void {
    var func = (chartFunc, options) => {
      var datatable = google.visualization.arrayToDataTable(data);
      chartFunc().draw(datatable, options);
    };
    var callback = () => func(chartFunc, options);
    google.charts.setOnLoadCallback(callback);
  }
  title: string;
  pieHole: number;

  ngOnInit() {
    console.log('ok');
  }
}
