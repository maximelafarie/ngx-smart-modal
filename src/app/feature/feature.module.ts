import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutes } from './feature.routing';
import { FeatureComponent } from './feature.component';
import { NgxSmartModalModule, NgxSmartModalService } from '../../ngx-smart-modal';

@NgModule({
  imports: [
    CommonModule,
    FeatureRoutes,
    NgxSmartModalModule.forChild()
  ],
  providers: [
    NgxSmartModalService
  ],
  declarations: [FeatureComponent]
})
export class FeatureModule { }