import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {

  private DetailedCurrency = new BehaviorSubject(null);
  public detailedCurrency = this.DetailedCurrency.asObservable();

  constructor(private http: HttpClient) { }

  getCurrencies() {
    return this.http.get('https://api.coinmarketcap.com/v2/ticker/?convert=EUR&sort="rank"');
  }

  getHistoricalData(currency) {
    return this.http.get('https://min-api.cryptocompare.com/data/histohour?tsym=EUR&limit=200&fsym=' + currency);
  }

  updateDetailedCurrency(detailedCurrency) {
    this.DetailedCurrency.next(detailedCurrency);
  }

}
