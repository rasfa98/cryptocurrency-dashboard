import { Component, OnInit } from '@angular/core';
import { skip } from 'rxjs/operators';

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
    this.crypto.currencies.pipe(skip(1)).subscribe(currencies => this.showSpinner = false);
  }

}
