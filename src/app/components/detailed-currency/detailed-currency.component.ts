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
  error: boolean = false;

  constructor(private crypto: CryptocurrencyService) { }

  ngOnInit() {
    this.crypto.detailedCurrency.subscribe(currencyDetails => {
      this.currencyDetails = currencyDetails;
      this.error = false;

      if (this.currencyDetails) {
        this.crypto.getHistoricalData(currencyDetails.symbol).subscribe(currencyHistory => {
          const data = this.mapHistoricalData(currencyHistory);
          this.updateOrCreateChart(data.max, data.formatedDates);
        }, err => {
          this.error = true;
          this.chart = [];
        });
      }
    });
  }

  mapHistoricalData(data) {
    const max = data.map(x => x.high);
    const dates = data.map(x => x.time);

    const formatedDates = [];

    dates.forEach(x => {
      const date = new Date(x * 1000);
      formatedDates.push(date);
    });

    return { max: max, formatedDates: formatedDates };
  }

  updateOrCreateChart(data, dates) {
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
            label: 'Price change',
            data: data,
            borderColor: '#3a7ba6',
            fill: true,
            backgroundColor: '#1d3a57',
            lineTension: 0,
            borderWidth: 1.5
          }],
        },
        options: {
          tooltips: {
            displayColors: false,
            callbacks: {
              label: function(tooltipItem, chartData) {
                return '€' + tooltipItem.yLabel;
              }
            }
          }
          elements: {
            point: {
              radius: 0
            },
            line: {
              tension: 0
            }
          },
          legend: {
            labels: {
              fontColor: '#fff',
              fontSize: 24,
              boxWidth: 0,
              fontFamily: ['Roboto Condensed', 'sans-serif']
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                autoSkip: true,
                maxTicksLimit: 6,
                fontColor: '#fff'
              },
              type: 'time',
              time: {
                unit: 'day'
              },
            }],
            yAxes: [{
              ticks: {
                fontColor: '#fff',
                callback: function(value, index, values) {
                  return '€' + value;
                }
              }
            }]
          }
        }
      });
    }
  }

}
