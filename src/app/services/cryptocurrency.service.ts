import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {

  private DetailedCurrency = new BehaviorSubject(null);
  public detailedCurrency = this.DetailedCurrency.asObservable();

  constructor(private http: HttpClient) { }

  getCurrencies() {
    return this.http.get<any>('https://api.coinmarketcap.com/v2/ticker/?convert=EUR&sort="rank"')
      .pipe(map(res => res.data));
  }

  getHistoricalData(currency) {
    return this.http.get<any>('https://min-api.cryptocompare.com/data/histohour?tsym=EUR&limit=150&fsym=' + currency)
      .pipe(map(res => res.Data));
  }

  updateDetailedCurrency(detailedCurrency) {
    this.DetailedCurrency.next(detailedCurrency);
  }

}
