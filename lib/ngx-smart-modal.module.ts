import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSmartModalService} from './ngx-smart-modal.service';
import {NgxSmartModalComponent} from './ngx-smart-modal.component';
@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule],
    exports: [NgxSmartModalComponent],
    declarations: [NgxSmartModalComponent],
    providers: [NgxSmartModalService],
})
export class NgxSmartModalModule {
}
