import { Routes } from '@angular/router';
import { PremiumPage } from './premium-page/premium-page';

export const routes: Routes = [
    {
    path: 'premium',
    component: PremiumPage
  },
  {
    path: '',
    redirectTo: 'premium',
    pathMatch: 'full'
  }
];
