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
  cacheKey: string = 'currencyList';
  selectedCurrency: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private crypto: CryptocurrencyService, private router: Router) {}

  ngOnInit() {
    // Use data from local storage.
    this.updateData(JSON.parse(localStorage.getItem(this.cacheKey) || '[]'));

    this.startAutoUpdate();

    this.crypto.getCurrencies().subscribe(currencies => this.updateData(currencies));

    // Detect when currencies are selected.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.selectedCurrency = this.currencies.filter(x => x.symbol === this.router.url.slice(1))[0];
        this.crypto.updateDetailedCurrency(this.selectedCurrency);
      }
    });
  }

  mapCurrencyData(currencies) {
    const objectValues = Object.values(currencies);

    for (let i = 0; i < objectValues.length; i++) {
      this.currencies.push(objectValues[i]);
    }
  }

  startAutoUpdate() {
    window.setInterval(() => {
      this.crypto.getCurrencies().subscribe(currencies => {
        this.currencies = [];
        this.updateData(currencies);
      });
    }, 150000);
  }

  updateData(data) {
    this.mapCurrencyData(data);
    this.selectedCurrency = this.currencies.filter(x => x.symbol === this.router.url.slice(1))[0];
    this.crypto.updateCurrencies(this.currencies);
    this.crypto.updateDetailedCurrency(this.selectedCurrency);
    localStorage.setItem(this.cacheKey, JSON.stringify(data));
  }

}
