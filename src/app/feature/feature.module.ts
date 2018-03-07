import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutes } from './feature.routing';
import { FeatureComponent } from './feature.component';
import { NgxSmartModalModule } from '../../ngx-smart-modal';

@NgModule({
  imports: [
    CommonModule,
    FeatureRoutes,
    NgxSmartModalModule.forChild()
  ],
  declarations: [FeatureComponent]
})
export class FeatureModule {
}
