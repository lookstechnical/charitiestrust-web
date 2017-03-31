import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[item-floating-label]',
})
export class ItemFloatingLabelComponent implements OnInit {

  input: any;
  inputLabel: any;

  constructor(private _el: ElementRef) {
    this.input = this._el.nativeElement.getElementsByTagName('input');
    this.inputLabel = this._el.nativeElement.getElementsByClassName('input-label');

  }

  ngOnInit() {
    if(this.input[0]) {
      this.input[0].addEventListener('input', this.onInput.bind(this));
    }
  }

  onInput() {
    if (this.input[0].value) {
      this.inputLabel[0].classList.add('has-input');
    } else {
      this.inputLabel[0].classList.remove('has-input');
    }
  }

}
