import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from 'src/app/cores/data-service.service';
import { AuthServiceService } from 'src/app/cores/auth-service.service';

@Component({
  selector: 'app-passwordinput',
  templateUrl: './passwordinput.component.html',
  styleUrls: ['./passwordinput.component.css']
})
export class PasswordinputComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private dataService: DataServiceService, private auth: AuthServiceService) { }
  @Input() username: any;
  showAlert = 'hidden';
  ngOnInit() {
    console.log(this.username);
  }
  async checkPassword(event) {
    if (event.key == 'Enter') {
      let pwd = event.target.value;
      if (!pwd) {
        return;
      }
      const a = await this.auth.authPassword(this.username, pwd).then(resp => {
        this.showAlert = 'hidden';
        if (resp['token']) {
          this.activeModal.close({ status: 'success' });
        } else {
          this.showAlert = '';
        }
      }).catch(() => {
        this.showAlert = '';
      });
    }
  }
}
