import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public readonly CODES = {
    ERROR_MSG_1: `npm WARN ngx-smart-modal@x.x.x requires a peer of web-animations-js@>=x.x.x but none was installed.`,
    ERROR_MSG_2: `warning "ngx-smart-modal@x.x.x" has unmet peer dependency "web-animations-js@>=x.x.x".`,
    SYSTEM_JS: `System.config({
  map: {
    'ngx-smart-modal': 'node_modules/ngx-smart-modal/bundles/ngx-smart-modal.umd.js'
  }
});`,
    MODULE_IMPORT: `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }`,
    CSS_IMPORT: `/* You can add global styles to this file, and also import other style files */
@import "~ngx-smart-modal/ngx-smart-modal";
@import "app/app.component";
// ...`
  };

  public readonly libVersion = environment.version;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
