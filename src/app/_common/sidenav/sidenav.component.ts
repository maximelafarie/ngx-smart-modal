import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from '@app/services';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private currentRoute;

  constructor(private router: Router, private googleAnalyticsService: GoogleAnalyticsService) {
    this.router.events.subscribe((url: any) => this.currentRoute = this.router.url);
  }

  public routeIs(segment: string) {
    return segment === this.currentRoute;
  }

  ngOnInit() {
  }

  public nav(routeName: string): void {
      this.googleAnalyticsService.eventEmitter('sidenav_route_change', 'routing', 'navigate', 'click', routeName);
  }

}
