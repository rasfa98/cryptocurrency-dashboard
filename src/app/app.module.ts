import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { DetailedCurrencyComponent } from './components/detailed-currency/detailed-currency.component';
import { WelcomeMessageComponent } from './components/welcome-message/welcome-message.component';

import { CryptocurrencyService } from './services/cryptocurrency.service';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    DetailedCurrencyComponent,
    WelcomeMessageComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [CryptocurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
