import { Component, OnInit, ViewChild } from '@angular/core';
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {CharitySearchModalComponent} from "../charity-search-modal/charity-search-modal.component";
import {ErrorPopupComponent} from '../error-popup/error-popup.component';
import {ConfirmPopupComponent} from '../confirm-popup/confirm-popup.component';

const RESULTS_PER_PAGE = 100;

@Component({
  selector: 'app-donate-to-charity',
  templateUrl: './donate-to-charity.component.html',
  styleUrls: ['./donate-to-charity.component.css']
})
export class DonateToCharityComponent implements OnInit {

  @ViewChild('charitiesModalWrapper') charitiesModalWrapper: CharitySearchModalComponent
  @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent;
  @ViewChild('errorPopup') errorPopup: ErrorPopupComponent;

  balance: number;
  amountError: string;
  eventNumError: string;
  donateForm: FormGroup;
  loading: boolean;
  CharityCommissionNumber: string = '';
  error: string;
  errorResolution: string;
  frequencyString: string;

  charityName: string;

  constructor(private apiService: ApiService, private _fb: FormBuilder) {

    this.balance = this.apiService.getAccountBalance();

    this.reset();

  }

  reset() {
    this.donateForm = this._fb.group({
      amount: [null, Validators.required, this.checkDonationAmount.bind(this)],
      charityName: [null],
      charityRef: [null, Validators.required],
      frequency: [0, Validators.required]
    });

    this.amountError = '';
    this.eventNumError = '';
    this.errorResolution = '';
    this.CharityCommissionNumber = '';
    this.frequencyString = '';

    let inputs = document.getElementsByClassName('has-input');
    [].forEach.call(inputs, (input) => {
        input.classList.remove('has-input');
    });
  }

  currentResultsPage: number;

  ngOnInit() {
  }

  checkDonationAmount(control: FormControl) {
    return new Promise (resolve => {
      if (control.value > this.balance) {
        this.amountError = "Insufficient funds";
        resolve({'amountError': true});
      } else if (control.value < 1) {
        this.amountError = "£1 minimum donation";
        resolve({'amountError': true});
      } else {
        this.amountError = null;
        resolve(null)
      }
    })
  };

  clearCharity() {
    this.donateForm.controls['charityRef'].setValue(null);
  };

  searchForCharities(charityNameEntered) {
    this.loading = true;
    this.currentResultsPage = 1;
    this.charitiesModalWrapper.setCharities([]);
    let params = this.prepareCharitySearchParameters(charityNameEntered, this.currentResultsPage, RESULTS_PER_PAGE);
    this.apiService.charitySearch(params).subscribe((data) => {
      this.loading = false;
      this.charitiesModalWrapper.showModal();
      this.charitiesModalWrapper.setCharities(data);
    })
  };

  prepareCharitySearchParameters(charityName, page, resultsPerPage) {
    var requestParameters: {types?: number, charity?: string, page?: number, size?: number} = {};
    requestParameters.types = 1; // Mandatory parameter (We are only interested in type 1 charities)
    requestParameters.charity = charityName;
    requestParameters.page = page;
    requestParameters.size = resultsPerPage;

    return requestParameters;
  };

  onCharitySelected(value) {
    this.charityName = value.CharityName;
    this.donateForm.get('charityName').setValue(value.CharityName);
    this.donateForm.get('charityRef').setValue(value.CharityRef);
    this.CharityCommissionNumber = value.CharityCommissionNumber;
    this.charitiesModalWrapper.hideModal();
  }

  onInputFocus(e: Event) {
  }

  onFormSubmit() {
    this.frequencyString = this.getFrequencyString();
    this.confirmPopup.showPopup();
  }

  getFrequencyString(): string {
      switch (parseInt(this.donateForm.get('frequency').value)) {
        case 0:
          return 'One Off';
        case 1:
          return 'Monthly';
        case 2:
          return 'Bi-Monthly';
        case 3:
          return 'Quarterly';
        case 6:
          return 'Six Monthly';
        case 12:
          return 'Annually';
        default:
          return '';
      }
  }

  onConfirmSubmit() {

    if (this.donateForm.valid) {
      this.loading = true;
      this.apiService.donateToCharity(this.prepareCharityDonationParameters()).subscribe(res => {
        this.error = 'Donation Successful';
        this.errorResolution = 'Thank you for your donation.'
        this.errorPopup.showModal();
        this.reset();
        this.apiService.getMGA().subscribe(mga => {
          this.loading = false;
          this.balance = mga.Balance;

        }, err => {
          this.error = 'Error';
          this.errorResolution = 'Unexpected error. Please try again later.'
          this.loading = false;
          this.errorPopup.showModal();
        })
      }, err => {
        this.errorPopup.showModal();
        this.error = 'Error';
        this.errorResolution = 'Unexpected error. Please try again later.'
        this.loading = false;
      })
    }
  }

  prepareCharityDonationParameters() {
    var requestParameters:{CharityRef?: number,Amount?:number,DonationFrequency?: number, Anonymous?:boolean}
      = {};
    requestParameters.CharityRef = this.donateForm.value['charityRef'];
    requestParameters.Amount = this.donateForm.value['amount'];
    requestParameters.DonationFrequency = this.donateForm.value['frequency'];
    requestParameters.Anonymous = true;

    return requestParameters;
  };

  get isLoading(): boolean {
    return this.loading;
  }

  closeWin() {
    window.close();
  }
}
