import { AuthServiceService } from './../../cores/auth-service.service';
import { DataServiceService } from './../../cores/data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataServiceService, private auth: AuthServiceService, private route: Router) {
    let token = localStorage.getItem('abcd');
    auth.tokenVerify(token).then(res => {
      if (!res) {
        return false;
      } else {
        route.navigateByUrl('dashboard');
      }
    });
  }
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }
  login() {
    this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value).then(result => {
      if (result['token']) {
        window.location.reload();
      }
    });
  }

}
