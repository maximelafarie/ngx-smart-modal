import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgxSmartModalService } from '../services/ngx-smart-modal.service';
import { NgxSmartModalStackService } from '../services/ngx-smart-modal-stack.service';
import { NgxSmartModalComponent } from '../components/ngx-smart-modal.component';

@NgModule({
  declarations: [NgxSmartModalComponent],
  exports: [NgxSmartModalComponent],
  entryComponents: [NgxSmartModalComponent],
  imports: [CommonModule]
})
export class NgxSmartModalModule {
  constructor(private serivce: NgxSmartModalService) {
  }

  /**
   * Use in AppModule: new instance of NgxSmartModal.
   */
  public static forRoot(): ModuleWithProviders {
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
  public static forChild(): ModuleWithProviders {
    return {
      ngModule: NgxSmartModalModule,
      providers: [
        NgxSmartModalService,
        NgxSmartModalStackService
      ]
    };
  }
}
