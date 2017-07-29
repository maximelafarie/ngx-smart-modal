import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
