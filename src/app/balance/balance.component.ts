import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  @Input('balance') balance: number;

  constructor() { }

  ngOnInit() {
  }

}
