import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-detailed-currency',
  templateUrl: './detailed-currency.component.html',
  styleUrls: ['./detailed-currency.component.css']
})
export class DetailedCurrencyComponent implements OnInit {

  currencyDetails: any;
  chart: any = [];

  constructor(private crypto: CryptocurrencyService) { }

  ngOnInit() {
    this.crypto.detailedCurrency.subscribe(currencyDetails => {
      this.currencyDetails = currencyDetails;

      if (this.currencyDetails) {
        this.crypto.getHistoricalData(currencyDetails.symbol).subscribe(currencyHistory => {
          const max = currencyHistory.map(x => x.high);
          const dates = currencyHistory.map(x => x.time);

          const formatedDates = [];

          dates.forEach(x => {
            const date = new Date(x * 1000);
            formatedDates.push(date);
          });

          this.createChart(max, formatedDates);
        });
      }
    });
  }

  createChart(data, dates) {
    // Update existing chart.
    if (this.chart.length !== 0) {
      this.chart.data.labels = dates;
      this.chart.data.datasets[0].data = data;

      this.chart.update();
    } else {
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            data: data,
            borderColor: '#3a7ba6',
            fill: true,
            backgroundColor: '#1d3a57',
            lineTension: 0,
            borderWidth: 1.5
          }],
        },
        options: {
          elements: {
            point: {
              radius: 0
            },
            line: {
              tension: 0
            },
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                autoSkip: true,
                maxTicksLimit: 6,
                fontColor: '#fff'
              },
              display: true,
              type: 'time',
              time: {
                unit: 'day'
              },
            }],
            yAxes: [{
              display: true,
              ticks: {
                fontColor: '#fff'
              }
            }]
          }
        }
      });
    }
  }

}
