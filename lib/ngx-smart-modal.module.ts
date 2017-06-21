import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxSmartModalDirective } from './ngx-smart-modal.directive';
import { NgxSmartModalService } from './ngx-smart-modal.service';
import { NgxSmartModalComponent } from './ngx-smart-modal.component';
@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule ],
  exports: [NgxSmartModalDirective],
  declarations: [NgxSmartModalComponent, NgxSmartModalDirective],
  providers: [NgxSmartModalService],
})
export class NgxSmartModalModule { }
