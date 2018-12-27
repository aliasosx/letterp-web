import { AuthServiceService } from './../../cores/auth-service.service';
import { DataServiceService } from './../../cores/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataServiceService, private auth: AuthServiceService, private route: Router) {
    let token = localStorage.getItem('abcd');
    if (!token) { route.navigateByUrl('/') }
  }
  comapnyInfo: string;
  userInfo: any;
  token = localStorage.getItem('abcd');

  ngOnInit() {
    this.getUserInfo();
    this.getCompany();
  }
  getUserInfo() {
    this.auth.tokenVerify(this.token).then(res => this.userInfo = res);
  }
  getCompany() {
    this.dataService.getCompanyInfo().then(res => {
      this.comapnyInfo = res.company_name;
    });
  }

}
