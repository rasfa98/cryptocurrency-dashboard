import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {
  BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v2/';

  private DetailedCurrency = new BehaviorSubject(null);

  public detailedCurrency = this.DetailedCurrency.asObservable();

  constructor(private http: HttpClient) { }

  getCurrencies() {
    const headers = new Headers({ 'Origin': 'rasmus.falk@live.se' });

    return this.http.get(this.BASE_URL + 'ticker/?convert=EUR', headers: headers);
  }

  updateDetailedCurrency(detailedCurrency) {
    this.DetailedCurrency.next(detailedCurrency);
  }
}
