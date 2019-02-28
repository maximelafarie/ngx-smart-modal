import { inject, TestBed, async, tick, fakeAsync } from '@angular/core/testing';

import { NgxSmartModalComponent, NgxSmartModalService } from '../../';

describe('NgxSmartModalService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxSmartModalComponent
      ],
      providers: [
        NgxSmartModalService
      ],
    }).compileComponents();
  }));

  it('should create a modal', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    expect(app).toBeTruthy();
  }));

  it('should retrieve the created modal', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        const myModal = ngxSmartModalService.getModal('myModal');
        expect(myModal).toEqual(app);
      });
  }));

  it('should retrieve the created modal with method shortened alias', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        const myModal = ngxSmartModalService.get('myModal');
        expect(myModal).toEqual(app);
      });
  }));

  it('should create and remove a modal, then re-add the deleted modal', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        const myModal = ngxSmartModalService.getModal('myModal');

        spyOn(ngxSmartModalService, 'addModal').and.callThrough();
        spyOn(ngxSmartModalService, 'removeModal').and.callThrough();

        expect(myModal).toEqual(app);
        expect(ngxSmartModalService.modalStack.length).toEqual(1);
        ngxSmartModalService.removeModal('myModal');
        expect(ngxSmartModalService.modalStack.length).toEqual(0);
        ngxSmartModalService.addModal(app);
        expect(ngxSmartModalService.modalStack.length).toEqual(1);

        expect(ngxSmartModalService.addModal).toHaveBeenCalledWith(app);
        expect(ngxSmartModalService.removeModal).toHaveBeenCalledWith('myModal')
      });
  }));

  it('should override an existing modal', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        const myModal = ngxSmartModalService.getModal('myModal');

        spyOn(ngxSmartModalService, 'addModal').and.callThrough();

        expect(myModal).toEqual(app);
        expect(ngxSmartModalService.modalStack.length).toEqual(1);
        ngxSmartModalService.addModal({ id: 'FakeModal', modal: myModal }, true);
        expect(ngxSmartModalService.modalStack.length).toEqual(1);

        expect(ngxSmartModalService.getModal('FakeModal')).toBeTruthy();
        expect(ngxSmartModalService.addModal).toHaveBeenCalled();
      });
  }));

  it('should open and close the modal remotely', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        const compiled = fixture.debugElement.nativeElement;
        spyOn(app, 'isVisible').and.callThrough();

        /* Open */
        ngxSmartModalService.open('myModal');
        expect(compiled.querySelector('.dialog').isDisplayed).toBeTruthy();
        expect(app.isVisible).toBeTruthy();
        expect(ngxSmartModalService.getOpenedModals().length).toEqual(1);
        expect(app.isVisible).toHaveBeenCalled();

        /* Close */
        ngxSmartModalService.close('myModal');
        expect(compiled.querySelector('.dialog').isDisplayed).toBeFalsy();
        expect(app.isVisible).toBeFalsy();
      });
  }));

  it('should toggle the modal remotely', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        const compiled = fixture.debugElement.nativeElement;
        spyOn(app, 'isVisible').and.callThrough();

        expect(app.isVisible).toBeFalsy();

        /* Open */
        ngxSmartModalService.toggle('myModal');
        expect(compiled.querySelector('.dialog').isDisplayed).toBeTruthy();
        expect(app.isVisible).toBeTruthy();
        expect(ngxSmartModalService.getOpenedModals().length).toEqual(1);
        expect(app.isVisible).toHaveBeenCalled();

        /* Close */
        ngxSmartModalService.toggle('myModal');
        expect(compiled.querySelector('.dialog').isDisplayed).toBeFalsy();
        expect(app.isVisible).toBeFalsy();
      });
  }));

  it('should retrieve several modals', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const otherFixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        const otherApp = otherFixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        otherApp.identifier = 'myOtherModal';
        const stack = ngxSmartModalService.getModalStack();
        expect(stack.length).toEqual(2);
      });
  }));

  it('should set and retrieve modal data', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        const obj = {
          prop1: 'test',
          prop2: true,
          prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
          prop4: 327652175423
        };
        app.identifier = 'myModal';

        spyOn(ngxSmartModalService, 'getModal').and.callThrough();
        spyOn(ngxSmartModalService, 'getModalData').and.callThrough();
        spyOn(ngxSmartModalService, 'setModalData').and.callThrough();

        ngxSmartModalService.setModalData(obj, 'myModal', true);
        const myModalData = ngxSmartModalService.getModalData('myModal');
        expect(myModalData).toEqual(obj);

        expect(ngxSmartModalService.getModalData).toHaveBeenCalledWith('myModal');
        expect(ngxSmartModalService.getModal).toHaveBeenCalledWith('myModal');
        expect(ngxSmartModalService.setModalData).toHaveBeenCalledWith(obj, 'myModal', true)
      });
  }));

  it('should reset modal data', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        const obj = {
          prop1: 'test',
          prop2: true,
          prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
          prop4: 327652175423
        };
        app.identifier = 'myModal';
        ngxSmartModalService.setModalData(obj, 'myModal');
        const myModalData = ngxSmartModalService.getModalData('myModal');
        expect(myModalData).toEqual(obj);
        ngxSmartModalService.resetModalData('myModal');
        expect(myModalData).toBeUndefined();
      });
  }));

  it('should close the latest opened modal', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const otherFixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        const otherApp = otherFixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        otherApp.identifier = 'myOtherModal';

        spyOn(ngxSmartModalService, 'closeLatestModal').and.callThrough();
        spyOn(ngxSmartModalService, 'getOpenedModals').and.callThrough();

        ngxSmartModalService.getModal('myModal').onOpen.subscribe(() => {
          ngxSmartModalService.getModal('myOtherModal').open();
        });
        ngxSmartModalService.getModal('myModal').open();
        expect(app.visible).toBeTruthy();
        expect(otherApp.visible).toBeTruthy();
        ngxSmartModalService.closeLatestModal();
        tick();
        expect(ngxSmartModalService.closeLatestModal).toHaveBeenCalled();
        expect(ngxSmartModalService.getOpenedModals).toHaveBeenCalled();
        expect(app.visible).toBeTruthy();
        expect(otherApp.visible).toBeFalsy();
      });
  }));

  it('should addModal ( force )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';

    service.addModal({ id: 'test', modal: app });
    service.addModal({ id: 'test', modal: app }, true);

    expect(service.getModalStackCount()).toEqual(1);
  }));

  it('should getModalData', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'getModal').and.returnValue({ getData: (() => 'test data') });

    expect(service.getModalData('test')).toEqual('test data');

    expect(service.getModal).toHaveBeenCalledWith('test');
  }));

  it('should setModalData', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';

    service.addModal({ id: 'test', modal: app });

    spyOn(service, 'getModal').and.callThrough();

    service.setModalData('test data', 'test', true);

    expect(service.setModalData('test data', 'test', true)).toEqual(true);

    expect(service.getModalData('test')).toEqual('test data');
  }));

  it('should resetModalData', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app._data = 'test data';

    service.addModal({ id: 'test', modal: app });

    spyOn(service, 'getModal').and.callThrough();

    service.resetModalData('test');

    expect(service.getModalData('test')).toEqual(undefined);
  }));

  it('should resetModalData ( innexistant )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    expect(service.resetModalData('fake')).toEqual(false);
  }));

  it('should get ( modal )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'getModal').and.returnValue('fake');

    service.get('test');

    expect(service.get('test') as any).toEqual('fake');
  }));

  it('should open', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';

    service.addModal({ id: 'test', modal: app });

    service.open('test');

    expect(service.getModal('test').visible).toEqual(true);
  }));

  it('should close', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';
    app.openedClass = true;

    service.addModal({ id: 'test', modal: app });

    service.close('test');

    expect(service.getModal('test').openedClass).toEqual(false);
  }));

  it('should toggle', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'test';

    service.addModal({ id: 'test', modal: app });

    service.toggle('test');

    expect(service.getModal('test').visible).toEqual(true);
  }));

  it('should getModalStack', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    (service as any).modalStack = 'fake data';

    expect((service as any).getModalStack()).toEqual('fake data');
  }));

  it('should getModal ( innexistant )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    expect(() => { service.getModal('fake'); }).toThrow(new Error('Cannot find modal with identifier fake'));
  }));

  it('should getTopOpenedModal ( no modal )', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'getOpenedModals').and.returnValue([]);

    expect(() => { service.getTopOpenedModal(); }).toThrow(new Error('No modal is opened'));
  }));

  it('should getTopOpenedModal ', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    const modalStack = [
      { modal: { layerPosition: 900, visible: true } },
      { modal: { layerPosition: 2000, visible: true } },
      { modal: { layerPosition: 1000, visible: true } }
    ];

    spyOn(service, 'getOpenedModals').and.returnValue(modalStack);

    expect((service as any).getTopOpenedModal()).toEqual(modalStack[1].modal);
  }));

  it('should getHigherIndex', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    (service as any).modalStack = [
      { modal: { layerPosition: 900 } },
      { modal: { layerPosition: 2000 } },
      { modal: { layerPosition: 1000 } }
    ];

    expect(service.getHigherIndex()).toEqual(2001);
  }));

  it('should closeLatestModal', inject([NgxSmartModalService], (service: NgxSmartModalService) => {
    spyOn(service, 'getOpenedModals').and.returnValue(['test']);
    spyOn(service, 'getTopOpenedModal').and.returnValue({ close: () => 'test_close' });

    service.closeLatestModal();

    expect(service.getTopOpenedModal).toHaveBeenCalled();
  }));
});
