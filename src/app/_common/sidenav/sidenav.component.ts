import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private currentRoute;

  constructor(private router: Router) {
    this.router.events.subscribe((url: any) => this.currentRoute = this.router.url);
  }

  public routeIs(segment: string) {
    return segment === this.currentRoute;
  }

  ngOnInit() {
  }

}
