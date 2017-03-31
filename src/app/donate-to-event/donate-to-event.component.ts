import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {ActivatedRoute} from '@angular/router';
import {ConfirmPopupComponent} from '../confirm-popup/confirm-popup.component';
import {ErrorPopupComponent} from '../error-popup/error-popup.component';

@Component({
  selector: 'app-donate-to-event',
  templateUrl: './donate-to-event.component.html',
  styleUrls: ['./donate-to-event.component.css']
})
export class DonateToEventComponent implements OnInit {

  @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent;
  @ViewChild('errorPopup') errorPopup: ErrorPopupComponent;

  eventNumError: string;
  messageError: string;
  amountError: string;
  messageRemainingCount: number;
  balance: number;
  donateForm: FormGroup;
  event: any;
  error: string;
  errorResolution: string;
  loading: boolean;

  constructor(private apiSerive: ApiService, private _fb: FormBuilder, private _route: ActivatedRoute) {
   let snap = this._route.snapshot;
    console.log(snap);
    this.balance = apiSerive.getAccountBalance();

    this.reset();
  }

  reset() {
    this.donateForm = this._fb.group({
      amount: [null, Validators.required, this.checkDonationAmount.bind(this)],
      eventId: [null, Validators.minLength(4), this.checkEventNum.bind(this)],
      message: [null, null, this.checkMessge.bind(this)],
      anonymous: [null],
    });
    setTimeout(()=>{
      this.eventNumError = "";
      this.messageError = "";
      this.amountError = "";
      this.messageRemainingCount = 0;
      this.errorResolution = "";

      let inputs = document.getElementsByClassName('has-input');
      [].forEach.call(inputs, (input) => {
        input.classList.remove('has-input');
      });
    }, 50)

  }

  ngOnInit() {
  }

  checkEventNum(control: FormControl) {
    return new Promise (resolve => {
      if (control.value > 999) {
        this.eventNumError = null;
        resolve(null);
      } else if (control.value == null) {
        this.eventNumError = "Invalid event number";
        resolve({'Invalid': true});
      }
    });
  };

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
        resolve(null);
      }
    })
  };

  onFormSubmit() {
    this.apiSerive.getEventData(this.donateForm.get('eventId').value).subscribe(res =>{
      this.event = res;
      this.confirmPopup.showPopup();

    },  err => {
      this.eventNumError = "Invalid event number";
      this.error = 'Event could not be found',
      this.errorResolution = 'Please check the event number and try again.';
      this.errorPopup.showModal();
    })
  }

  onConfirmSubmit() {
    console.log(this.donateForm.valid)
    if (this.donateForm.valid) {
      this.apiSerive.donateToEvent(this.prepareEventDonationParameters()).subscribe(resp => {
        this.error = 'Donation Successful';
        this.errorResolution = 'Thank you for your donation.'
        this.errorPopup.showModal();
        this.reset();
        this.apiSerive.getMGA().subscribe(mga => {
          this.loading = false;
          this.balance = mga.Balance;
        }, err => {
          this.error = 'Error';
          this.errorResolution = 'Unexpected error. Please try again later.'
          this.loading = false;
          this.errorPopup.showModal();
        })

      }, err => {
        this.error = 'Error',
        this.errorResolution = 'Unexpected error. Please try again later.';
        this.errorPopup.showModal();
      })
    }
  }



  checkMessge(control: FormControl) {
    return new Promise (resolve => {
      if (this.donateForm.get('message').value != null) {
        this.messageRemainingCount = (this.donateForm.get('message').value.length);
        if (this.donateForm.get('message').value.length > 40) {
          resolve({'amountError': true});
          this.messageError = "Too many characters"
        } else {
          resolve(null)
          this.messageError = null;
        }
      } else {
        resolve(null);
      }
    })
  }

  prepareEventDonationParameters() {
    let anonymous = this.donateForm.value['anonymous'];
    if (this.donateForm.value['anonymous']==null){
      anonymous=false;
    }

    var data: {EventId?: number, Amount?: number, Anonymous?: number, Comment?: string} = {};
    data.EventId = this.donateForm.value['eventId'];
    data.Amount = this.donateForm.value['amount'];
    data.Anonymous = anonymous

    if (this.donateForm.value['message'] != "") {
      data.Comment = this.donateForm.value['message']; //Set comment parameter if user has entered a message
    }

    return data;
  };

}
