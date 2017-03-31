import { Injectable } from '@angular/core';
import {Http, Headers, Request, RequestOptions, RequestMethod} from "@angular/http";
import {Observable} from 'rxjs/Rx';


@Injectable()
export class ApiService {

  api: string = "http://webapi.charitiestrust.org"

  token: string = '';
  accountBalance: number = 0;
  countdown: string;
  loggedIn: boolean = false;
  TIMEOUT: number = 6000;
  options: RequestOptions;
  headers: Headers;

  constructor(private http: Http) { }

  setAccountBalance(b) {
    this.accountBalance = b;
  }

  setToken(token) {
    this.token = btoa(token);
    this.headers = new Headers();
    this.headers.append('Authorization', "Bearer " + this.token);

  }

  getMGA() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + this.token);
    return this.http.get(this.api + "/mga", {headers}).map(res => res.json());
  };

  charitySearch(searchParameters) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + this.token);

    return this.http.get(
      this.api + "/charity/search?types=" +
        searchParameters.types + "&charity=" +
        searchParameters.charity + "&page=" +
        searchParameters.page + "&size=" +
        searchParameters.size,
      {headers}
    ).map(res => res.json())
  };


  donateToCharity(donationParameters) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + this.token);
    return this.http.post(
      this.api + "/mga/donate/charity", donationParameters, {headers}).map(res => res.json());

  };

  getEventData(eventId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + this.token);
    return this.http.get(
      this.api +  "/sponsor/event?id="+eventId,
      {headers}).map(res => res.json());
  };

  donateToEvent(donationData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + this.token);
    return this.http.post(
      this.api +  "/mga/donate/event",
      donationData, {headers}).map(res => res.json());
  };

  getAccountBalance() {
    return this.accountBalance;
  }

}
