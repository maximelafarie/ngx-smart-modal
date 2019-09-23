import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

/* Demo components */
import { DemoComponent } from './demo/demo.component';
import { MainComponent } from './demo/main/main.component';
import { BootstrapComponent } from './demo/bootstrap/bootstrap.component';
import { MaterializeComponent } from './demo/materialize/materialize.component';
import { FoundationComponent } from './demo/foundation/foundation.component';
import { AutostartComponent } from './demo/autostart/autostart.component';

/* Documentation components */
import { DocComponent } from './doc/doc.component';
import { HomeComponent } from './doc/parts/home/home.component';
import { StartComponent } from './doc/parts/start/start.component';
import { ApiComponent } from './doc/parts/api/api.component';
import { OptionsComponent } from './doc/parts/options/options.component';
import { EventsComponent } from './doc/parts/events/events.component';
import { StyleComponent } from './doc/parts/style/style.component';
import { MiscComponent } from './doc/parts/misc/misc.component';

const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled'
};

const routes: Routes = [
  {
    path: 'demo',
    component: DemoComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'feature', loadChildren: () => import(`./demo/feature/feature.module`).then(m => m.FeatureModule) },
      { path: 'bootstrap', component: BootstrapComponent },
      { path: 'materialize', component: MaterializeComponent },
      { path: 'foundation', component: FoundationComponent },
      { path: 'autostart', component: AutostartComponent },
      { path: '**', redirectTo: '/demo', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: DocComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'start', component: StartComponent },
      { path: 'api', component: ApiComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'style', component: StyleComponent },
      { path: 'misc', component: MiscComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
