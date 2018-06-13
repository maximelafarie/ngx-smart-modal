import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { NgxSmartModalModule } from '../ngx-smart-modal';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ForkMeComponent } from './fork-me/fork-me.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { MaterializeComponent } from './materialize/materialize.component';
import { FoundationComponent } from './foundation/foundation.component';
import { AutostartComponent } from './autostart/autostart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ForkMeComponent,
    BootstrapComponent,
    MaterializeComponent,
    FoundationComponent,
    AutostartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutes,
    NgxSmartModalModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
