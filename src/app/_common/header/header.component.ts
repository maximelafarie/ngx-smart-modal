import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleAnalyticsService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public readonly libVersion = environment.version;

  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  ngOnInit() {
  }

  public nav(routeName: string): void {
    this.googleAnalyticsService.eventEmitter('header_route_change', 'routing', 'navigate', 'click', routeName);
  }

}
