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
// ...`,
    MODAL_HTML: `<ngx-smart-modal #myModal identifier="myModal">
  <h1>Title</h1>
  <p>Some stuff...</p>

  <button (click)="myModal.close()">Close</button>
</ngx-smart-modal>`,
    MODAL_COMP: `import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  // ...
})
export class AppComponent {
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }
}`,
    INLINE_EXAMPLE: `<button (click)="ngxSmartModalService.getModal('myModal').open()">Open myModal</button>`,
    MODAL_CLASS_REF: `import { Component } from '@angular/core';

import { MyComponent } from 'xxxx';

import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  // ...
})
export class AppComponent {
  // If Angular < 8
  @ViewChild(TemplateRef) tpl: TemplateRef<any>;

  // If Angular >= 8
  //@ViewChild(TemplateRef, { static: false }) tpl: TemplateRef<any>;

  constructor(private ngxSmartModalService: NgxSmartModalService) {
    // simple text content
    this.ngxSmartModalService.create('myModal1', 'content').open();

    // component
    this.ngxSmartModalService.create('myModal2', MyComponent).open();

    // or templateRef
    this.ngxSmartModalService.create('myModal3', this.tpl).open();
  }
}`,
    MODAL_DATA: `import { AfterViewInit, Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  // ...
})
export class AppComponent implements AfterViewInit {
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  ngAfterViewInit() {
    const obj: Object = {
      prop1: 'test',
      prop2: true,
      prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
      prop4: 327652175423
    };

    this.ngxSmartModalService.setModalData(obj, 'myModal');
  }
}`,
    MODAL_DATA_HTML: `<ngx-smart-modal #myModal identifier="myModal">
  <div *ngIf="myModal.hasData()">
    <pre>{{ myModal.getData() | json }}</pre>
  </div>

  <button (click)="myModal.close()">Close</button>
</ngx-smart-modal>`,
  };

  public readonly libVersion = environment.version;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
