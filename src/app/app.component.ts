import { AfterViewInit, Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSmartModalService } from '../ngx-smart-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor() {
  }

  ngAfterViewInit() {
  }
}
