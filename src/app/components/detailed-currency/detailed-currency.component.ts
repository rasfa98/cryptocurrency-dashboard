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
          const max = currencyHistory['Data'].map(x => x.high);
          const dates = currencyHistory['Data'].map(x => x.time);

          const historicalDates = [];

          dates.forEach(x => {
            const date = new Date(x * 1000);
            historicalDates.push(date.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
          });

          if (this.chart.length !== 0) {
            this.chart.destroy();
          }

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: historicalDates,
              datasets: [
                {
                  data: max,
                  borderColor: '#3a7ba6',
                  fill: true,
                  backgroundColor: '#1d3a57'
                },
              ];
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  ticks: {
                    fontColor: '#fff'
                  }
                  display: true,
                  type: 'time'
                  time: {
                    displayFormats: {
                      'millisecond': 'DD MMM',
                      'second': 'DD MMM',
                      'minute': 'DD MMM',
                      'hour': 'DD MMM',
                      'day': 'DD MMM',
                      'week': 'DD MMM',
                      'month': 'DD MMM',
                      'quarter': 'DD MMM',
                      'year': 'DD MMM',
                    },
                  }
                }],
                yAxes: [{
                  display: false
                }]
              }
            }
          });
        });
      }
    });
  }

}
