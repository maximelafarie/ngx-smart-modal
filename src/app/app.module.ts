import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSmartModalModule, NgxSmartModalService } from '../lib/core/ngx-smart-modal';

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
export class AppModule { }
