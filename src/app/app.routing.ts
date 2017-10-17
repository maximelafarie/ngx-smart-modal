import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'feature', loadChildren: './feature/feature.module#FeatureModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);
