import { DataServiceService } from 'src/app/cores/data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private dataService: DataServiceService) { }
  ngOnInit() {
    
  }
}
