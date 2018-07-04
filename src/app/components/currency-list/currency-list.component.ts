import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  currencies;
  currencyDetails;
  param;

  constructor(private cryptocurrency: CryptocurrencyService, private router: Router) { }

  ngOnInit() {
    this.cryptocurrency.getCurrencies().subscribe(currencies => {
      this.param = this.validateParam();

      this.currencies = currencies.data;

      if (this.param && !this.currencyDetails) { this.updateDetailedCurrency(); }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.param = this.validateParam();

        if (this.param && this.currencies) { this.updateDetailedCurrency(); }
      }
    });
  }

  objectKeys(obj) {
    if (obj) { return Object.keys(obj); }
  }

  validateParam() {
    const param = this.router.url.slice(1);

    if (!isNaN(parseInt(param, 10))) { return param; }
  }

  updateDetailedCurrency() {
    this.cryptocurrency.updateDetailedCurrency(this.currencies[this.param]);
    this.currencyDetails = this.currencies[this.param];
  }
}
