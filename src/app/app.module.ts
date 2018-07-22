import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/material.module';

import { AppComponent } from './app.component';

import { DetailedCurrencyComponent } from './components/detailed-currency/detailed-currency.component';
import { WelcomeMessageComponent } from './components/welcome-message/welcome-message.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';

import { CryptocurrencyService } from './services/cryptocurrency.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DetailedCurrencyComponent,
    WelcomeMessageComponent,
    CurrencyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CryptocurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
