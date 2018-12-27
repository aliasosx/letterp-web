import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/cores/auth-service.service';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { Router, } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthServiceService, private dataService: DataServiceService, private route: Router, ) {
    let token = localStorage.getItem('abcd');
    if (!token) { route.navigateByUrl('/') }

  }
  company_name: string;
  userInfo: any;
  token = localStorage.getItem('abcd');
  menus: any;
  username: any;
  id: any;
  ngOnInit() {
    this.getUserInfo();
    this.getCompany();

  }
  getUserInfo() {
    this.auth.tokenVerify(this.token).then(res => {
      this.id = res._id;
      this.getUser();
    });
  }
  getCompany() {
    this.dataService.getCompanyInfo().then(res => {
      this.company_name = res[0].company_name;
    });
  }
  getUser() {
    this.dataService.getUserInfomation(this.id).then(res => {

      console.log(this.id);
      this.menus = res.menu;
      this.username = res.username;
    });
  }

}
