import {inject, TestBed, async} from '@angular/core/testing';

import {NgxSmartModalComponent, NgxSmartModalService} from './../../index';

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

  it('should create and remove a modal, the re-add the deleted modal', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        const myModal = ngxSmartModalService.getModal('myModal');

        spyOn(ngxSmartModalService, 'addModal');
        spyOn(ngxSmartModalService, 'removeModal');

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

  it('should open and close the modal remotely', async(() => {
    inject([NgxSmartModalService],
      (ngxSmartModalService: NgxSmartModalService) => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myModal';
        const compiled = fixture.debugElement.nativeElement;
        spyOn(app, 'isVisible');

        /* Open */
        ngxSmartModalService.getModal('myModal').open();
        expect(compiled.querySelector('.dialog').isDisplayed).toBeTruthy();
        expect(app.isVisible).toBeTruthy();
        expect(ngxSmartModalService.getOpenedModals().length).toEqual(1);
        expect(app.isVisible).toHaveBeenCalled();

        /* Close */
        ngxSmartModalService.getModal('myModal').close();
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
        ngxSmartModalService.setModalData(obj, 'myModal');
        const myModalData = ngxSmartModalService.getModalData('myModal');
        expect(myModalData).toEqual(obj);
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
        ngxSmartModalService.getModal('myModal').onOpen.subscribe(() => {
          ngxSmartModalService.getModal('myOtherModal').open();
        });
        ngxSmartModalService.getModal('myModal').open();
        expect(app.visible).toBeTruthy();
        expect(otherApp.visible).toBeTruthy();
        ngxSmartModalService.closeLatestModal();
        expect(app.visible).toBeTruthy();
        expect(otherApp.visible).toBeFalsy();
      });
  }));

});
