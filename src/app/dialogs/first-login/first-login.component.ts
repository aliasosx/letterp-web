import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private dataService: DataServiceService) { }
  @Input() data: any;
  passwordChangeForm: FormGroup;
  alertTxt = "hidden";
  buttonDisable = true;
  ngOnInit() {
    this.passwordChangeForm = new FormGroup({
      'password': new FormControl(),
      'repassword': new FormControl()
    });
  }
  checkMatchingPassword(e) {
    if (!this.passwordChangeForm.get('repassword').value) { return }
    if (this.passwordChangeForm.get('repassword').value.trim() != this.passwordChangeForm.get('password').value.trim()) {
      this.alertTxt = "";
      this.buttonDisable = true;
    } else {
      this.alertTxt = "hidden";
      this.buttonDisable = false;
    }
  }
  async processUpdate() {
    let user = {
      password: this.passwordChangeForm.get('password').value.trim()
    }
    const c = await this.dataService.updateUserPassword(this.data['id'], user).then(res => {
      if (res['status'] == 'success') {
        this.activeModal.close('success');
      } else {
        return;
      }
    })
  }

}
