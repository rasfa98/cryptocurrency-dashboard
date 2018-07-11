import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { DetailedCurrencyComponent } from './components/detailed-currency/detailed-currency.component';
import { WelcomeMessageComponent } from './components/welcome-message/welcome-message.component';

import { CryptocurrencyService } from './services/cryptocurrency.service';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DetailedCurrencyComponent,
    WelcomeMessageComponent,
    CurrencyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  providers: [CryptocurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
