import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailedCurrencyComponent } from './components/detailed-currency/detailed-currency.component';
import { WelcomeMessageComponent } from './components/welcome-message/welcome-message.component';

const routes: Routes = [
  { path: '', redirectTo '/welcome', pathMatch: 'full' }
  { path: 'welcome', component: WelcomeMessageComponent  },
  { path: ':id', component: DetailedCurrencyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
