import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  currencies: any = [];
  currencyDetails: any;
  timeout: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private cryptocurrency: CryptocurrencyService, private router: Router) {}

  ngOnInit() {
    this.cryptocurrency.getCurrencies().subscribe(currencies => {
      this.cryptocurrency.updateCurrencies(currencies);
      this.mapCurrencyData(currencies);
      this.updateDetailedCurrency();

      this.startAutoUpdate();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        clearTimeout(this.timeout);
        this.startAutoUpdate();

        this.updateDetailedCurrency();
      }
    });
  }

  mapCurrencyData(currencies) {
    const objectValues = Object.values(currencies);

    for (let i = 0; i < objectValues.length; i++) {
      this.currencies.push(objectValues[i]);
    }
  }

  updateDetailedCurrency() {
    this.currencyDetails = this.currencies.filter(x => x.symbol === this.router.url.slice(1))[0];
    this.cryptocurrency.updateDetailedCurrency(this.currencyDetails);
  }

  startAutoUpdate() {
    this.timeout = window.setInterval(() => {
      this.cryptocurrency.getCurrencies().subscribe(currencies => {
        this.currencies = [];
        this.mapCurrencyData(currencies);
        this.updateDetailedCurrency();
      });
    }, 300000);
  }

}
