import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  currencies;

  constructor(private cryptocurrency: CryptocurrencyService) { }

  ngOnInit() {
    this.cryptocurrency.getCurrencies().subscribe(currencies => this.currencies = currencies.data);
  }

}
