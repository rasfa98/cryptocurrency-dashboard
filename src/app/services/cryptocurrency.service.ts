import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {
  BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v2/';

  constructor(private http: HttpClient) { }

  getCurrencies() {
    const headers = new Headers();
    headers.append('Origin', 'rasmus.falk@live.se');

    return this.http.get(this.BASE_URL + 'listings', headers: headers);
  }
}
