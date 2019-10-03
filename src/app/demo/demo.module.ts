import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { DemoComponent } from './demo.component';
import { MainComponent } from './main/main.component';
import { ForkMeComponent } from './fork-me/fork-me.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { MaterializeComponent } from './materialize/materialize.component';
import { FoundationComponent } from './foundation/foundation.component';
import { AutostartComponent } from './autostart/autostart.component';
import { FakeComponent } from './fake/fake.component';

import { NgxSmartModalModule } from '../../ngx-smart-modal';

@NgModule({
  declarations: [
    DemoComponent,
    MainComponent,
    ForkMeComponent,
    BootstrapComponent,
    MaterializeComponent,
    FoundationComponent,
    AutostartComponent,
    FakeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgxSmartModalModule.forRoot()
  ],
  entryComponents: [FakeComponent]
})
export class DemoModule {
}
