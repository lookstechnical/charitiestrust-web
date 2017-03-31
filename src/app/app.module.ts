import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';

import { ROUTES } from './routes';

import { AppComponent } from './app.component';
import { DonateToCharityComponent } from './donate-to-charity/donate-to-charity.component';
import { DonateToEventComponent } from './donate-to-event/donate-to-event.component';
import { CharitySearchModalComponent } from './charity-search-modal/charity-search-modal.component';
import { ItemFloatingLabelComponent } from './item-floating-label/item-floating-label.component';
import { BalanceComponent } from './balance/balance.component';
import { ApiService } from "./api.service";
import {TokenResolverService} from './token-resolver.service';
import {LoadingComponent} from './loading/loading.component';
import {ConfirmPopupComponent} from './confirm-popup/confirm-popup.component';
import {ErrorPopupComponent} from './error-popup/error-popup.component';
import {Ng2BootstrapModule} from 'ng2-bootstrap/index';

@NgModule({
  declarations: [
    AppComponent,
    DonateToCharityComponent,
    DonateToEventComponent,
    CharitySearchModalComponent,
    ItemFloatingLabelComponent,
    BalanceComponent,
    LoadingComponent,
    ConfirmPopupComponent,
    ErrorPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    Ng2BootstrapModule.forRoot()
  ],
  providers: [
    ApiService,
    TokenResolverService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
