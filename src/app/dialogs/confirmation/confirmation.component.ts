import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) { }
  @Input() message: any;
  ngOnInit() {
  }
  acceptCancel() {
    this.activeModal.close('ok');
  }
  cancel() {
    this.activeModal.close('cancel');
  }
}
