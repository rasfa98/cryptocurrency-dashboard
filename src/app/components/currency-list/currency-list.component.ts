import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CryptocurrencyService } from '../../services/cryptocurrency.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  currencies: any = [];
  currencyDetails: any;
  timeout: any;
  cacheKey: string = 'currencyList';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private crypto: CryptocurrencyService, private router: Router) {}

  ngOnInit() {
    this.mapCurrencyData(JSON.parse(localStorage.getItem(this.cacheKey)));

    this.crypto.getCurrencies().subscribe(currencies => {
      this.mapCurrencyData(currencies);
      localStorage.setItem(this.cacheKey, JSON.stringify(currencies));
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
    if (currencies) {
      const objectValues = Object.values(currencies);

      for (let i = 0; i < objectValues.length; i++) {
        this.currencies.push(objectValues[i]);
      }

      this.crypto.updateCurrencies(currencies);
      this.updateDetailedCurrency();
    }
  }

  updateDetailedCurrency() {
    this.currencyDetails = this.currencies.filter(x => x.symbol === this.router.url.slice(1))[0];
    this.crypto.updateDetailedCurrency(this.currencyDetails);
  }

  startAutoUpdate() {
    this.timeout = window.setInterval(() => {
      this.crypto.getCurrencies().subscribe(currencies => {
        this.currencies = [];
        this.mapCurrencyData(currencies);
        this.updateDetailedCurrency();
      });
    }, 300000);
  }

}
