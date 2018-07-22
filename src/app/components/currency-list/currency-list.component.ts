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
  selectedCurrency: any = {};
  favourites: any = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private crypto: CryptocurrencyService, private router: Router) {}

  ngOnInit() {
    this.startAutoUpdate();

    this.crypto.getCurrencies().subscribe(currencies => this.updateData(currencies));

    // Detect when currencies are selected.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.currencies.length > 0) {
        this.selectedCurrency = this.currencies.filter(x => x.symbol === this.router.url.slice(1))[0];
        this.selectedCurrency.favourite = this.favourites.filter(x => x.symbol === this.selectedCurrency.symbol).length > 0;
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
    this.selectedCurrency.favourite = this.favourites.filter(x => x.symbol === this.selectedCurrency.symbol).length > 0;
    this.crypto.updateCurrencies(this.currencies);
    this.crypto.updateDetailedCurrency(this.selectedCurrency);
  }

  addToFavourites() {
    let isFavourite;
    let favouriteIndex;

    this.favourites.forEach((x, i) => {
      if (x.symbol === this.selectedCurrency.symbol) {
        isFavourite = true;
        favouriteIndex = i;
      }
    });

    if (isFavourite) {
      this.favourites.splice(favouriteIndex, 1);
      this.selectedCurrency.favourite = false;
    } else {
      this.favourites.push({ symbol: this.selectedCurrency.symbol, name: this.selectedCurrency.name });
      this.selectedCurrency.favourite = true;
    }
  }

}
