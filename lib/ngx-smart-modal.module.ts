import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSmartModalService} from './ngx-smart-modal.service';
import {NgxSmartModalComponent} from './ngx-smart-modal.component';

export {NgxSmartModalComponent} from './ngx-smart-modal.component';
export {NgxSmartModalService} from './ngx-smart-modal.service';

@NgModule({
    declarations: [NgxSmartModalComponent],
    imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
    providers: [NgxSmartModalService],
    exports: [NgxSmartModalComponent]
})
export class NgxSmartModalModule {
}
