import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  getCurrencyList() {
    return JSON.parse(localStorage.getItem('currencyList') || '[]');
  }

  saveCurrencyList(data) {
    localStorage.setItem('currencyList', JSON.stringify(data));
  }

  getHistoricalData(symbol) {
    const localData = JSON.parse(localStorage.getItem('historicalData') || '[]');

    return localData.filter(x => x.symbol === symbol)[0];
  }

  updateHistoricalData(symbol, data) {
    const existingData = JSON.parse(localStorage.getItem('historicalData') || '[]');

    const exists = existingData.find(x => x.symbol === symbol);

    if (exists) {
      existingData.forEach((x, i) => {
        if (x.symbol === symbol) {
          existingData[i].data = data;
        }
      });
    } else {
      existingData.push({ symbol: symbol, data: data });
    }

    localStorage.setItem('historicalData', JSON.stringify(existingData));
  }

}
