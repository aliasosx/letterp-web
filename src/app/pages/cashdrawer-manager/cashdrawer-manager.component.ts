import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/cores/auth-service.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordinputComponent } from 'src/app/dialogs/passwordinput/passwordinput.component';

@Component({
  selector: 'app-cashdrawer-manager',
  templateUrl: './cashdrawer-manager.component.html',
  styleUrls: ['./cashdrawer-manager.component.css']
})
export class CashdrawerManagerComponent implements OnInit {

  constructor(private dataService: DataServiceService, private auth: AuthServiceService, private route: Router, private modalService: NgbModal) {
    let token = localStorage.getItem('abcd');
    if (!token) { route.navigateByUrl('/') }
    this.getUserInfo();
  }
  token = localStorage.getItem('abcd');
  cashloadForm: FormGroup;
  btnDisabled = false;
  showBox = 'hidden';
  start_amount_disabled = false;
  userInfo: any;
  users: any;
  approveUseraId: number;
  approvedUserName: string;
  usersSelectDisabled = true;
  btnApproveDisabled = true;
  showLoadBox = '';


  ngOnInit() {
    this.cashloadForm = new FormGroup({
      'startamount': new FormControl(),
      'settleAmount': new FormControl(),
      'balance': new FormControl(),
      'currentAmount': new FormControl(),
    });
    this.btnDisabled = false;
    //this.getUserInfo();
  }
  loadCashAmountChange(value) {
    if (value >= 100000) {
      this.btnDisabled = false;
      this.usersSelectDisabled = false;
    } else {
      this.btnDisabled = false;
      this.usersSelectDisabled = true;
    }
  }

  async processLoadCash() {
    this.btnDisabled = false;
    this.start_amount_disabled = true;
    this.showBox = '';
    const c = await this.saveStartAmount();
  }
  async getUserInfo() {
    const c = await this.auth.tokenVerify(this.token).then(res => this.userInfo = res);
    this.checkCurrentStatus();
    this.getUsers();
  }
  async checkCurrentStatus() {
    const status = {
      'userId': this.userInfo['id']
    }
    const c = this.dataService.getCashCurrentStatus(status).then(res => {
      console.log(res);
      if (res.length == 0) {
        this.showBox = 'hidden';
        this.showLoadBox = '';
        return;
      } else {
        this.btnDisabled = false;
        this.start_amount_disabled = true;
        this.showBox = '';
        this.showLoadBox = 'hidden';
      }
    });
  }
  async saveStartAmount() {
    if (!this.approveUseraId) { return }
    let cashload = {
      'startamount': this.cashloadForm.get('startamount').value,
      'loaded': true,
      'userId': this.userInfo.id,
      'loadcheckerId': this.approveUseraId,
    };
    const c = await this.dataService.loadCashDrawer(cashload).then(res => {
      if (res['status'] == 'success') {
        alert('Cash loaded');
        this.showLoadBox = 'hidden';
      } else {
        alert(res);
      }
    });
  }
  async getUsers() {
    const c = await this.dataService.getUsersException(this.userInfo['id']).then(users => {
      this.users = users;
    });
  }
  async usersSelectChange(u) {
    this.approveUseraId = u.target.value;
    this.approvedUserName = u.target.options[u.target.selectedIndex].text;
    this.btnApproveDisabled = false;
  }
  async approveUser() {
    const modalRef = this.modalService.open(PasswordinputComponent, {
      centered: true
    });

    modalRef.componentInstance.username = this.approvedUserName;
    modalRef.result.then((data) => {
      if (data.status == 'success') {
        this.btnDisabled = true;
      }
    });
  }
  async settle() {
    const s = await this.dataService.settlement(this.userInfo['id']).then(res => {
      //this.settleAmount = res['total'];
      this.cashloadForm.get('settleAmount').setValue(res[0].total);

    });
  }
  remainingCashInDrawer(value) {
    const balance = (value - (this.cashloadForm.get('startamount').value + this.cashloadForm.get('settleAmount').value));
    this.cashloadForm.get('balance').setValue(balance);
  }
}
