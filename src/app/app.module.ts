import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoModule } from './demo/demo.module';
import { DocComponent } from './doc/doc.component';
import { HeaderComponent } from './_common/header/header.component';
import { FooterComponent } from './_common/footer/footer.component';
import { SidenavComponent } from './_common/sidenav/sidenav.component';
import { HomeComponent } from './doc/parts/home/home.component';
import { StartComponent } from './doc/parts/start/start.component';
import { ApiComponent } from './doc/parts/api/api.component';
import { OptionsComponent } from './doc/parts/options/options.component';
import { StyleComponent } from './doc/parts/style/style.component';
import { MiscComponent } from './doc/parts/misc/misc.component';

/* Pipes */
import { SafeHtmlPipe } from './_pipes/safe-html.pipe';
import { EventsComponent } from './doc/parts/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    DocComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    HomeComponent,
    StartComponent,
    ApiComponent,
    OptionsComponent,
    EventsComponent,
    StyleComponent,
    MiscComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    DemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
