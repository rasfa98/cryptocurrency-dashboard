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
  detailed;

  constructor(private cryptocurrency: CryptocurrencyService, private router: Router) { }

  ngOnInit() {
    this.cryptocurrency.getCurrencies().subscribe(currencies => {
      const param = this.router.url.slice(1);

      this.currencies = currencies.data;

      if (!isNaN(parseInt(param, 10)) && !this.detailed) {
        this.cryptocurrency.updateDetailedCurrency(this.currencies[param]);
        this.detailed = this.currencies[param];
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const param = this.router.url.slice(1);

        if (!isNaN(parseInt(param, 10)) && this.currencies) {
          this.cryptocurrency.updateDetailedCurrency(this.currencies[param]);
          this.detailed = this.currencies[param];
        }
      }
    });
  }

  objectKeys(obj) {
    if (obj) {
      return Object.keys(obj);
    }
  }
}
