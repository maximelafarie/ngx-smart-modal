import { inject, TestBed, async, tick } from '@angular/core/testing';

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
        ngxSmartModalService.addModal({id: 'FakeModal', modal: myModal}, true);
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
          prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
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
          prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
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

});
