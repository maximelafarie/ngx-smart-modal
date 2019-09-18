import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSmartModalService } from 'src/ngx-smart-modal';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BootstrapComponent implements OnInit {

  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
  }

}
