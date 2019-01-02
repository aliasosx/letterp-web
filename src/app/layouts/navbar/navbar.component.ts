import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/cores/auth-service.service';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authData: any;
  constructor(private auth: AuthServiceService, private dataService: DataServiceService, private route: Router, ) {
    let token = localStorage.getItem('abcd');
    if (!token) { route.navigateByUrl('/') }
    this.auth.tokenVerify(token).then(authData => {
      this.authData = authData;
      this.loadMenubyUserId();
    });
  }
  company_name: string;
  userInfo: any;
  token = localStorage.getItem('abcd');
  menus: any;
  username: any;
  menus_all: any;

  id: any;
  ngOnInit() {

    this.getCompany();
    //this.loadMenubyUserId();
    //this.authData = this.dataService.getTokenverify().subscribe(console.log);

  }

  getCompany() {
    this.dataService.getCompanyInfo().then(res => {
      this.company_name = res[0].company_name;
    });
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
  loadMenubyUserId() {
    this.menus_all = this.dataService.getMenuByUserId(this.authData['id']);
  }

}
