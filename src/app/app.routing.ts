import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { MaterializeComponent } from './materialize/materialize.component';
import { FoundationComponent } from './foundation/foundation.component';
import { AutostartComponent } from './autostart/autostart.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'feature', loadChildren: './feature/feature.module#FeatureModule' },
  { path: 'bootstrap', component: BootstrapComponent },
  { path: 'materialize', component: MaterializeComponent },
  { path: 'foundation', component: FoundationComponent },
  { path: 'autostart', component: AutostartComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);
