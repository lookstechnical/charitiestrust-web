import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/index';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {

  @ViewChild('confirmPopup') confirmPopup: ModalDirective;

  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  showPopup() {
    this.confirmPopup.show();
  }

  onConfirm() {
    this.confirmPopup.hide();
    this.confirm.emit(true)
  }

}
