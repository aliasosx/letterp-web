import { AuthServiceService } from './../../cores/auth-service.service';
import { DataServiceService } from './../../cores/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirstLoginComponent } from 'src/app/dialogs/first-login/first-login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataServiceService, private auth: AuthServiceService, private route: Router, private modalService: NgbModal) {
    let token = localStorage.getItem('abcd');
    if (!token) { route.navigateByUrl('/') }
    this.getUserInfo();
  }
  comapnyInfo: string;
  userInfo: any;
  token = localStorage.getItem('abcd');

  ngOnInit() {

    this.getCompany();

  }
  async getUserInfo() {
    const c = await this.auth.tokenVerify(this.token).then(res => this.userInfo = res);
    const a = await this.checkFirstLogin();
  }
  getCompany() {
    this.dataService.getCompanyInfo().then(res => {
      this.comapnyInfo = res.company_name;
    });
  }
  async checkFirstLogin() {
    const c = await this.dataService.getFirstLogin(this.userInfo['id']).then(res => {
      if (res['firstlogin']) {
        const modalRef = this.modalService.open(FirstLoginComponent,
          {
            centered: true,
            backdrop: 'static',
            keyboard: false
          });
        modalRef.componentInstance.data = this.userInfo;
        modalRef.result.then(res => {
          if (res == 'success') {
            localStorage.clear();
            window.location.reload();
          }
        });

      } else {
        return;
      }
    })
  }

}
