import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';

import { CryptocurrencyService } from './services/cryptocurrency.service';
import { DetailedCurrencyComponent } from './components/detailed-currency/detailed-currency.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    DetailedCurrencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CryptocurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
