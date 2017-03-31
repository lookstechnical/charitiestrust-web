import { Routes } from '@angular/router';
import { DonateToCharityComponent } from './donate-to-charity/donate-to-charity.component';
import { DonateToEventComponent } from './donate-to-event/donate-to-event.component';
import {TokenResolverService} from './token-resolver.service';

export const ROUTES: Routes = [
  { path : '',
    component: DonateToEventComponent,
    resolve: {
      balance: TokenResolverService
    }
  },
  {
    path: 'donate-to-charity',
    component: DonateToCharityComponent,
    resolve: {
      balance: TokenResolverService
    }
  },
  {
    path: 'donate-to-event',
    component: DonateToEventComponent,
    resolve: {
      balance: TokenResolverService
    }
  }
];
