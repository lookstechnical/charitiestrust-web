import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/index';

@Component({
  selector: 'charity-search-modal',
  templateUrl: './charity-search-modal.component.html',
  styleUrls: ['./charity-search-modal.component.css']
})
export class CharitySearchModalComponent implements OnInit {

  @Output() charitySelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('charitiesModal') charitiesModal: ModalDirective;

  charities: any[]
  totalNumCharitiesFound: number;

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.charitiesModal.show();
  }

  hideModal() {
    this.charitiesModal.hide();
  }

  setCharities(charities): void {
    this.totalNumCharitiesFound = charities.NumberOfCharities;
    this.charities = charities.Charities;
  }

  handleUserTappedCharityName(charity) {
    this.charitySelected.emit(charity);
  }

}
