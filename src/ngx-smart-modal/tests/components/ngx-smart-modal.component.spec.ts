import {inject, TestBed, async} from '@angular/core/testing';

import {NgxSmartModalComponent, NgxSmartModalService} from './../../index';

describe('NgxSmartModalComponent', () => {

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

  it('should open and close the modal directly', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.open();
    expect(app.visible).toBeTruthy();
    app.close();
    expect(app.visible).toBeFalsy();
  }));

  it('should close the modal by escape keypress', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    const event = new KeyboardEvent("keypress", {key: "Escape"});
    app.identifier = 'myModal';
    app.open();
    expect(app.visible).toBeTruthy();
    dispatchEvent(event);
    app.onEscape.subscribe(() => {
      expect(app.visible).toBeFalsy();
    });
  }));

  it('should not close the modal by escape keypress', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    const event = new KeyboardEvent("keypress", {key: "Escape"});
    app.identifier = 'myModal';
    app.escapeAble = false;
    app.open();
    dispatchEvent(event);
    expect(app.visible).toBeTruthy();
  }));

  it('should close the modal by clicking on its close cross button', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    const compiled = fixture.debugElement.nativeElement;
    app.open();
    app.onOpen.subscribe(() => {
      compiled.querySelector('button.dialog__close-btn').click();
      expect(app.visible).toBeFalsy();
    });
  }));

  it('should hide the modal close cross button', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.closable = false;
    const compiled = fixture.debugElement.nativeElement;
    app.open();
    app.onOpen.subscribe(() => {
      const closeBtn = compiled.querySelector('button.dialog__close-btn');
      expect(closeBtn).toBeUndefined();
    });
  }));

  it('should add additional class to the modal', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.customClass = 'firstClass secondClass';
    app.open();
    app.onOpen.subscribe(() => {
      const compiled = fixture.debugElement.nativeElement;
      const firstRef = compiled.querySelector('.dialog.firstClass');
      const secondRef = compiled.querySelector('.dialog.secondClass');
      expect(firstRef).toEqual(compiled);
      expect(secondRef).toEqual(compiled);
    });
  }));

  it('should remove additional class of the modal', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.customClass = 'firstClass secondClass';
    app.removeCustomClass('firstClass');
    app.open();
    app.onOpen.subscribe(() => {
      const compiled = fixture.debugElement.nativeElement;
      const firstRef = compiled.querySelector('.dialog.firstClass');
      const secondRef = compiled.querySelector('.dialog.secondClass');
      expect(firstRef).toEqual(null);
      expect(secondRef).toEqual(compiled);
    });
  }));

  it('should manage data directly from the modal', async(() => {
    inject([NgxSmartModalService],
      () => {
        const fixture = TestBed.createComponent(NgxSmartModalComponent);
        const app = fixture.debugElement.componentInstance;
        const obj = {
          prop1: 'test',
          prop2: true,
          prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
          prop4: 327652175423
        };
        app.identifier = 'myModal';
        app.setData(obj);
        expect(app.hasData()).toBeTruthy();
        expect(app.getData()).toEqual(obj);
        app.removeData();
        expect(app.getData()).toBeUndefined();
      });
  }));

});
