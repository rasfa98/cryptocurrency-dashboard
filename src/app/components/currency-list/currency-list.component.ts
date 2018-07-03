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

  constructor(private cryptocurrency: CryptocurrencyService, private router: Router) { }

  ngOnInit() {
    this.cryptocurrency.getCurrencies().subscribe(currencies => this.currencies = currencies.data);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.router.url);
      }
    });
  }
}
