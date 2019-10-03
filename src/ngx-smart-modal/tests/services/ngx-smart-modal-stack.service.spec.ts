
import { BrowserModule } from '@angular/platform-browser';
import { inject, TestBed, async } from '@angular/core/testing';

import { NgxSmartModalStackService } from '../../src/services/ngx-smart-modal-stack.service';

describe('NgxSmartModalStackService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
      ],
      providers: [
        NgxSmartModalStackService
      ],
    });
  }));

  it('should add modal ( force )', inject([NgxSmartModalStackService], (service: NgxSmartModalStackService) => {
    service.addModal({ id: 'test', modal: { identitifer: 'test' } as any });
    service.addModal({ id: 'test', modal: { identitifer: 'test' } as any }, true);

    expect(service.getModalStackCount()).toEqual(1);

    service.addModal({ id: 'test2', modal: { identitifer: 'test2' } as any }, true);

    expect(service.getModalStackCount()).toEqual(2);
  }));

  it('should get modal stack', inject([NgxSmartModalStackService], (service: NgxSmartModalStackService) => {
    (service as any)._modalStack = [];

    expect(service.getModalStack()).toEqual([]);
  }));

  it('should get top opened modal ( no modal )', inject([NgxSmartModalStackService], (service: NgxSmartModalStackService) => {
    spyOn(service, 'getOpenedModals').and.returnValue([]);

    expect(() => { service.getTopOpenedModal(); }).toThrow(new Error('No modal is opened'));
  }));

  it('should get top opened modal ', inject([NgxSmartModalStackService], (service: NgxSmartModalStackService) => {
    const modalStack = [
      { modal: { layerPosition: 900, visible: true } },
      { modal: { layerPosition: 2000, visible: true } },
      { modal: { layerPosition: 1000, visible: true } }
    ];

    spyOn(service, 'getOpenedModals').and.returnValue(modalStack);

    expect((service as any).getTopOpenedModal()).toEqual(modalStack[1].modal);
  }));

  it('should get higher index', inject([NgxSmartModalStackService], (service: NgxSmartModalStackService) => {
    (service as any)._modalStack = [
      { modal: { layerPosition: 900 } },
      { modal: { layerPosition: 2000 } },
      { modal: { layerPosition: 1000 } }
    ];

    expect(service.getHigherIndex()).toEqual(2001);
  }));
});
