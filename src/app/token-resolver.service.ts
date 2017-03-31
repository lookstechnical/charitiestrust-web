import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ApiService} from './api.service';

import {Observable} from 'rxjs/Rx';


@Injectable()
export class TokenResolverService implements Resolve<Observable<any>> {

  constructor(private _apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return Observable.create((observable) => {
      if (route.queryParams['token']) {
        this._apiService.setToken(route.queryParams['token']);
        this._apiService.getMGA().subscribe((response) => {
          this._apiService.setAccountBalance(response.Balance);
          observable.next(response);
        }, error => {
          observable.next({error:"error"});
        });
      } else {
        observable.next({error: "none"});
      }
    }).first();
  }
}
