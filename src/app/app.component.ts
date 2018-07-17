import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from './services/cryptocurrency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSpinner: boolean = true;

  constructor(private crypto: CryptocurrencyService) { }

  ngOnInit() {
    this.crypto.currencies.subscribe(currencies => { if (currencies) { this.showSpinner = false; } });
  }

}
