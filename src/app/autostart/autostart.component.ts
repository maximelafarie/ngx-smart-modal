import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-autostart',
  templateUrl: './autostart.component.html',
  styleUrls: ['./autostart.component.scss']
})
export class AutostartComponent implements OnInit {

  version = VERSION.full;

  // tslint:disable:max-line-length
  sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper neque ac ullamcorper scelerisque. Proin molestie erat sapien, ac dapibus tortor placerat a. Vivamus quis tempor mauris. Ut porta ultricies nisi in eleifend';

  constructor() { }

  ngOnInit() {
  }

}
