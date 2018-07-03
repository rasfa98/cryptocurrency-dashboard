import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailedCurrencyComponent } from './components/detailed-currency/detailed-currency.component';

const routes: Routes = [
  { path: ':currency', component: DetailedCurrencyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
