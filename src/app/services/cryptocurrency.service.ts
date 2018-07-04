import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {
  LIST_URL = 'https://api.coinmarketcap.com/v2/';
  HISTORICAL_URL = 'https://min-api.cryptocompare.com/data/histohour?tsym=EUR&limit=200';

  private DetailedCurrency = new BehaviorSubject(null);
  private HistoricalData = new BehaviorSubject(null);

  public detailedCurrency = this.DetailedCurrency.asObservable();
  public historicalData = this.HistoricalData.asObservable();

  constructor(private http: HttpClient) { }

  getCurrencies() {
    const headers = new Headers({ 'Origin': 'rasmus.falk@live.se' });

    return this.http.get(this.LIST_URL + 'ticker/?convert=EUR', headers: headers);
  }

  getHistoricalData(currency) {
    const headers = new Headers({ 'Origin': 'rasmus.falk@live.se' });

    return this.http.get(this.HISTORICAL_URL + '&fsym=' + currency, headers: headers);
  }

  updateDetailedCurrency(detailedCurrency) {
    this.DetailedCurrency.next(detailedCurrency);
  }

  updateHistoricalData(historicalData) {
    this.HistoricalData.next(historicalData);
  }
}
