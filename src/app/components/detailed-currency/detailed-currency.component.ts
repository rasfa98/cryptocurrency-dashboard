import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-detailed-currency',
  templateUrl: './detailed-currency.component.html',
  styleUrls: ['./detailed-currency.component.css']
})
export class DetailedCurrencyComponent implements OnInit {
  currencyDetails;
  chart = [];

  constructor(private crypto: CryptocurrencyService) { }

  ngOnInit() {
    this.crypto.detailedCurrency.subscribe(currencyDetails => {
      this.currencyDetails = currencyDetails;

      if (this.currencyDetails) {
        this.crypto.getHistoricalData(currencyDetails.symbol).subscribe(currencyHistory => {
          console.log(currencyHistory);

          const max = currencyHistory['Data'].map(x => x.high);
          const min = currencyHistory['Data'].map(x => x.low);
          const dates = currencyHistory['Data'].map(x => x.time);

          const historicalDates = [];

          dates.forEach(x => {
            const date = new Date(x * 1000);
            historicalDates.push(date.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
          });

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: historicalDates,
              datasets: [
                {
                  data: max,
                  borderColor: 'red',
                  fill: false
                },
                {
                  data: min,
                  borderColor: 'blue',
                  fill: false
                }
              ];
            },
            options: {
              legend: {
                display: false;
              },
              scales: {
                xAxes: [{
                  display: true;
                }],
                yAxes: [{
                  display: true;
                }]
              }
            }
          });
        });
      }
    });
  }

}
