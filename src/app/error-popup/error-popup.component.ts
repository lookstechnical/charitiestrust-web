import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent implements OnInit {

  @ViewChild('errorPopup') errorPopup: ModalDirective;

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.errorPopup.show();
  }
}
