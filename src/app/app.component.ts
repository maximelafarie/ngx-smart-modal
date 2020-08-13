import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// declare gives Angular app access to ga function
declare let gtag: (type: string, measurementId: string, params: any) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-57192566-6', { page_path: event.urlAfterRedirects });
      }
    });
  }
}
