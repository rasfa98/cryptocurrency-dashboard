import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {
  BASE_URL = 'https://api.coinmarketcap.com/v2/';

  constructor(private http: HttpClient) { }

  getCurrencies() {
    return this.http.get(this.BASE_URL + 'listings');
  }
}
