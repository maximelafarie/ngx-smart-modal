import { BrowserModule } from '@angular/platform-browser';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { inject, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { NgxSmartModalComponent, NgxSmartModalService } from '../../';
import { NgxSmartModalStackService } from '../../src/services/ngx-smart-modal-stack.service';

@Component({
  selector: 'ngx-smart-modal-test-fake',
  template: 'test fake component<ng-template #tpl></ng-template>'
})
export class FakeComponent {
  @ViewChild(TemplateRef) public tpl: TemplateRef<any> = {} as any;
}

describe('NgxSmartModalService', () => {
  let fakeComponent: FakeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxSmartModalComponent,
        FakeComponent
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        NgxSmartModalService,
        NgxSmartModalStackService
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          NgxSmartModalComponent,
          FakeComponent
        ],
      }
    });
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(FakeComponent);
    fakeComponent = fixture.componentInstance;
  });

  it('should add events ( _private ) ', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const listeners = {} as any;

    spyOn(service as any, '_initModal');
    spyOn(service as any, '_deleteModal');
    spyOn(service as any, '_openModal');
    spyOn(service as any, '_toggleModal');
    spyOn(service as any, '_closeModal');
    spyOn(service as any, '_dismissModal');

    spyOn(window, 'addEventListener').and.callFake((e: string, listener: any) => {
      listeners[e] = listener;
    });

    (service as any)._addEvents();

    const event = {
      detail: {
        instance: {
          modal: 'fake modal'
        },
        extraData: {
          top: true
        }
      }
    };

    listeners['ngx-smart-modal.create'](event);
    expect((service as any)._initModal).toHaveBeenCalledWith({ modal: 'fake modal' });

    listeners['ngx-smart-modal.delete'](event);
    expect((service as any)._deleteModal).toHaveBeenCalledWith({ modal: 'fake modal' });

    listeners['ngx-smart-modal.open'](event);
    expect((service as any)._openModal).toHaveBeenCalledWith('fake modal', true);

    listeners['ngx-smart-modal.toggle'](event);
    expect((service as any)._toggleModal).toHaveBeenCalledWith('fake modal', true);

    listeners['ngx-smart-modal.close'](event);
    expect((service as any)._closeModal).toHaveBeenCalledWith('fake modal');

    listeners['ngx-smart-modal.dismiss'](event);
    expect((service as any)._dismissModal).toHaveBeenCalledWith('fake modal');
  }));

  it('should add events ( _private and no browser )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOnProperty(service as any, 'isBrowser', 'get').and.returnValue(false);

    expect((service as any)._addEvents()).toBeFalsy();
  }));

  it('should init modal ( _private ) ( with autostart )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';

    spyOn(service, 'open');

    (service as any)._initModal({ id: 'test', modal: app });

    expect(service.open).not.toHaveBeenCalled();
  }));

  it('should init modal ( _private ) ( with autostart )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.autostart = true;

    spyOn(service, 'open');

    (service as any)._initModal({ id: 'test', modal: app });

    expect(service.open).toHaveBeenCalledWith('test');
  }));

  it('should open modal ( _private )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.target = 'test-target';

    spyOn(service, 'getHigherIndex');

    (service as any)._openModal(app, true);

    expect(service.getHigherIndex).toHaveBeenCalled();

    app.visible = true;
    expect((service as any)._openModal(app)).toBeFalsy();
  }));

  it('should toggle modal ( _private )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.target = 'test-target';

    spyOn(service as any, '_openModal');

    (service as any)._toggleModal(app, true);

    expect((service as any)._openModal).toHaveBeenCalled();
  }));

  it('should toggle modal ( _private ) ( with visible )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.target = 'test-target';
    app.visible = true;

    spyOn(service as any, '_closeModal');

    (service as any)._toggleModal(app);

    expect((service as any)._closeModal).toHaveBeenCalled();
  }));

  it('should close modal ( _private )', fakeAsync(inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.nsmDialog = {
      first: {
        nativeElement: {
          removeAttribute: () => { return; }
        }
      }
    };

    (service as any)._openModal(app, true); // To set lastElementFocused

    tick(501);

    (service as any)._closeModal(app);

    tick(501);

    expect(app.visible).toBeFalsy();
    expect(app.openedClass).toBeFalsy();
  })));

  it('should dismiss modal ( _private )', fakeAsync(inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.openedClass = true;
    app.visible = true;

    (service as any)._dismissModal(app);

    tick(501);

    expect(app.visible).toBeFalsy();
    expect(app.openedClass).toBeFalsy();

    app.openedClass = false;
    expect((service as any)._dismissModal(app)).toBeFalsy();
  })));

  it('should add modal ( force )', inject([NgxSmartModalService, NgxSmartModalStackService],
    (service: NgxSmartModalService, stackService: NgxSmartModalStackService) => {
    spyOn(stackService, 'addModal');

    service.addModal({fake: 'obj' } as any, true);

    expect(stackService.addModal).toHaveBeenCalledWith({fake: 'obj' }, true);
  }));

  it('should get modal data', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'get').and.returnValue({ getData: (() => 'test data') });

    expect(service.getModalData('test')).toEqual('test data');

    expect(service.get).toHaveBeenCalledWith('test');
  }));

  it('should get modal data ( invalid id )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'get').and.returnValue(undefined);

    expect(service.getModalData('test')).toEqual(null);
  }));

  it('should set modal data', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';

    service.addModal({ id: 'test', modal: app });

    service.setModalData('test data', 'test', true);

    expect(service.setModalData('test data', 'test', true)).toEqual(true);
  }));

  it('should set modal data ( invalid id )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'get').and.returnValue(false);

    expect(service.setModalData('test data', 'invalidId', true)).toEqual(false);
  }));

  it('should reset modal data', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app._data = 'test data';

    service.addModal({ id: 'test', modal: app });

    spyOn(service, 'getModal').and.callThrough();

    service.resetModalData('test');

    expect(service.getModalData('test')).toEqual(undefined);
  }));

  it('should reset modal data ( invalid id )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    expect(service.resetModalData('fake')).toEqual(false);
  }));

  it('should get ( modal )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'getModal').and.returnValue('fake');

    service.get('test');

    expect(service.get('test') as any).toEqual('fake');
  }));

  it('should open', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'get').and.returnValue('fake');
    spyOn(service as any, '_openModal');

    service.open('test', true);

    expect((service as any)._openModal).toHaveBeenCalledWith('fake', true);
  }));

  it('should close', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'get').and.returnValue('fake');
    spyOn(service as any, '_closeModal');

    service.close('test');

    expect((service as any)._closeModal).toHaveBeenCalledWith('fake');
  }));

  it('should toggle', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'get').and.returnValue('fake');
    spyOn(service as any, '_toggleModal');

    service.toggle('test', true);

    expect((service as any)._toggleModal).toHaveBeenCalledWith('fake', true);
  }));

  it('should get modal stack', inject([NgxSmartModalService, NgxSmartModalStackService],
    (service: NgxSmartModalService, stackService: NgxSmartModalStackService) => {
    spyOn(stackService, 'getModalStack').and.returnValue('fake');

    expect(service.getModalStack()).toEqual('fake' as any);
  }));

  it('should get modal ( innexistant )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    expect(() => { service.getModal('fake'); }).toThrow(new Error('Cannot find modal with identifier fake'));
  }));

  it('should get top opened modal', inject([NgxSmartModalService, NgxSmartModalStackService],
    (service: NgxSmartModalService, stackService: NgxSmartModalStackService) => {
    spyOn(stackService, 'getTopOpenedModal').and.returnValue('fake');

    expect(service.getTopOpenedModal()).toEqual('fake' as any);
  }));

  it('should get higher index', inject([NgxSmartModalService, NgxSmartModalStackService],
    (service: NgxSmartModalService, stackService: NgxSmartModalStackService) => {
    spyOn(stackService, 'getHigherIndex').and.returnValue(777);

    expect(service.getHigherIndex()).toEqual(777);
  }));

  it('should close latest modal', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'getOpenedModals').and.returnValue(['test']);
    spyOn(service, 'getTopOpenedModal').and.returnValue({ close: () => 'test_close' });

    service.closeLatestModal();

    expect(service.getTopOpenedModal).toHaveBeenCalled();
  }));

  it('should create', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const options = {
      autostart: false,
      backdrop: false,
      closable: false,
      customClass: 'test',
      dismissable: false,
      escapable: false,
      force: false,
      hideDelay: 0,
      target: 'test',
      ariaLabel: 'test',
      ariaLabelledBy: 'test',
      ariaDescribedBy: 'test',
    };
    service.create('test', 'test content', options);

    service.create('test2', 'test content');
  }));

  it('should refocus on close', fakeAsync(inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const focusElement = fixture.nativeElement.appendChild(document.createElement('input'));
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.target = 'test-target';

    service.addModal({ id: 'test', modal: app });
    focusElement.focus();

    expect(document.activeElement === focusElement).toBeTruthy();

    service.open('test');
    tick(501);

    expect(document.activeElement === focusElement).toBeFalsy();

    service.close('test');
    tick(501);

    expect(document.activeElement === focusElement).toBeTruthy();
  })));

  it('should not refocus on close if refocus is turned off', fakeAsync(inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const focusElement = fixture.nativeElement.appendChild(document.createElement('input'));
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.target = 'test-target';
    app.refocus = false;

    service.addModal({ id: 'test', modal: app });
    focusElement.focus();

    expect(document.activeElement === focusElement).toBeTruthy();

    service.open('test');
    tick(501);

    expect(document.activeElement === focusElement).toBeFalsy();

    service.close('test');
    tick(501);

    expect(document.activeElement === focusElement).toBeFalsy();
  })));

  it('should resolve content', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    (service as any)._resolveNgContent('test content');
    (service as any)._resolveNgContent(FakeComponent);
    (service as any)._resolveNgContent(fakeComponent.tpl);
  }));

  it('should escape keyboard event', fakeAsync(inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const event = {
      key: 'Escape'
    };

    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.visible = true;

    service.addModal({ id: 'test', modal: app });

    expect((service as any)._escapeKeyboardEvent(event)).toBeTruthy();

    const app2 = fixture.debugElement.componentInstance;
    app2.identifier = 'test2';
    app2.visible = true;
    app2.escapable = false;

    service.addModal({ id: 'test2', modal: app2 });

    expect((service as any)._escapeKeyboardEvent(event)).toBeFalsy();

    tick(500);
    expect((service as any)._escapeKeyboardEvent(event)).toBeFalsy();

    event.key = 'Tab';
    expect((service as any)._escapeKeyboardEvent(event)).toBeFalsy();

    event.key = 'Escape';
    spyOn(service, 'getTopOpenedModal').and.throwError('fake error');
    expect((service as any)._escapeKeyboardEvent(event)).toBeFalsy();
  })));

  it('should trap focus on tab keyboard event', fakeAsync(inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    let event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Tab' });

    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';

    service.addModal({ id: 'test', modal: app });
    service.open('test');

    window.dispatchEvent(event);
    tick(500);
    expect((service as any)._trapFocusModal(event)).toBeTruthy();

    event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);
    tick(500);
    expect((service as any)._trapFocusModal(event)).toBeFalsy();
  })));

  it('should closeAll', fakeAsync(inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const firstFixture = TestBed.createComponent(NgxSmartModalComponent);
    const secFixture = TestBed.createComponent(NgxSmartModalComponent);
    const thirdFixture = TestBed.createComponent(NgxSmartModalComponent);
    const firstApp = firstFixture.debugElement.componentInstance;
    const secApp = secFixture.debugElement.componentInstance;
    const thirdApp = thirdFixture.debugElement.componentInstance;

    firstApp.identifier = 'myFirstModal';
    secApp.identifier = 'mySecModal';
    thirdApp.identifier = 'myThirdModal';

    service.addModal({ id: 'myFirstModal', modal: firstApp });
    service.addModal({ id: 'mySecModal', modal: secApp });
    service.addModal({ id: 'myThirdModal', modal: thirdApp });

    spyOn(service, 'closeAll').and.callThrough();
    spyOn(service, 'getOpenedModals').and.callThrough();
    spyOn(service as any, '_closeModal').and.callThrough();

    service.open(firstApp.identifier);
    service.open(secApp.identifier);
    service.open(thirdApp.identifier);

    expect(firstApp.visible).toBeTruthy();
    expect(secApp.visible).toBeTruthy();
    expect(thirdApp.visible).toBeTruthy();

    tick(501);

    service.closeAll();

    tick(501);

    expect(service.closeAll).toHaveBeenCalled();
    expect(service.getOpenedModals).toHaveBeenCalled();
    expect(service['_closeModal']).toHaveBeenCalledWith(firstApp);
    expect(service['_closeModal']).toHaveBeenCalledWith(secApp);
    expect(service['_closeModal']).toHaveBeenCalledWith(thirdApp);
    expect(firstApp.visible).toBeFalsy();
    expect(secApp.visible).toBeFalsy();
    expect(thirdApp.visible).toBeFalsy();
  })));
});
