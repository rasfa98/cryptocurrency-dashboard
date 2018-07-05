import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  currencies = [];
  currencyDetails;

  constructor(private cryptocurrency: CryptocurrencyService, private router: Router) { }

  ngOnInit() {
    this.cryptocurrency.getCurrencies().subscribe(currencies => {
      const objectValues = Object.values(currencies.data);

      for (let i = 0; i < objectValues.length; i++) {
        this.currencies.push(objectValues[i]);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currencyDetails = this.currencies.filter(x => x.symbol === this.router.url.slice(1))[0];
        this.cryptocurrency.updateDetailedCurrency(this.currencyDetails);
      }
    });
  }

}
