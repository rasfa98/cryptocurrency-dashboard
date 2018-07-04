import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';

@Component({
  selector: 'app-detailed-currency',
  templateUrl: './detailed-currency.component.html',
  styleUrls: ['./detailed-currency.component.css']
})
export class DetailedCurrencyComponent implements OnInit {
  currency;

  constructor(private crypto: CryptocurrencyService) { }

  ngOnInit() {
    this.crypto.detailedCurrency.subscribe(details => {
      this.currency = details;
    });
  }

}
