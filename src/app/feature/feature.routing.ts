import { Routes, RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
  { path: '', component: FeatureComponent },
];

export const FeatureRoutes = RouterModule.forChild(routes);
