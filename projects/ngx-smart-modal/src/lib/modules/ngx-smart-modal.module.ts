import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSmartModalComponent } from '../components/ngx-smart-modal.component';
import { NgxSmartModalService } from '../services/ngx-smart-modal.service';
import { NgxSmartModalStackService } from '../services/ngx-smart-modal-stack.service';

@NgModule({
  declarations: [
    NgxSmartModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxSmartModalComponent
  ]
})
export class NgxSmartModalModule {
  /**
   * Use in AppModule: new instance of NgxSmartModal.
   */
  public static forRoot(): ModuleWithProviders<NgxSmartModalModule> {
    return {
      ngModule: NgxSmartModalModule,
      providers: [
        NgxSmartModalService,
        NgxSmartModalStackService
      ]
    };
  }

  /**
   * Use in features modules with lazy loading: new instance of NgxSmartModal.
   */
  public static forChild(): ModuleWithProviders<NgxSmartModalModule> {
    return {
      ngModule: NgxSmartModalModule,
      providers: [
        NgxSmartModalService,
        NgxSmartModalStackService
      ]
    };
  }

  constructor(public service: NgxSmartModalService) { }
}
