import { inject, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxSmartModalComponent, NgxSmartModalService } from '../../';

describe('NgxSmartModalComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxSmartModalComponent
      ],
      providers: [
        NgxSmartModalService
      ],
      imports: [BrowserAnimationsModule]
    }).compileComponents();
  }));

  it('should create a modal', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.ngOnInit();
    expect(app).toBeTruthy();
  }));

  it('should open and close the modal directly', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.open(true);
    expect(app.isVisible()).toBeTruthy();
    app.close();
    expect(app.isVisible()).toBeFalsy();
  }));

  it('should close the modal by escape keyup', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    const event = new KeyboardEvent("keyup", {key: "Escape"});
    spyOn(app, 'escapeKeyboardEvent');
    spyOn(app, 'onEscape');
    app.identifier = 'myModal';
    app.open();
    expect(app.visible).toBeTruthy();
    dispatchEvent(event);
    app.onEscape.subscribe(() => {
      expect(app.visible).toBeFalsy();
      expect(app.escapeKeyboardEvent).toHaveBeenCalled();
      expect(app.onEscape).toHaveBeenCalled();
    });
  }));

  it('should not close the modal by escape keyup', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    const event = new KeyboardEvent("keyup", {key: "Escape"});
    app.identifier = 'myModal';
    app.escapable = false;
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

  it('should dismiss the modal by calling the dismiss method directly', fakeAsync(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    const compiled = fixture.debugElement.nativeElement;
    spyOn(app, 'dismiss').and.callThrough();
    app.open();
    tick();
    fixture.detectChanges();
    const fakeEvent = {
      target: compiled.querySelector('.overlay')
    };
    app.dismiss(fakeEvent);
    tick(150);
    expect(app.dismiss).toHaveBeenCalledWith(fakeEvent);
    expect(app.visible).toBeFalsy();
  }));

  it('should not dismiss the modal if dismissable option is set to false', fakeAsync(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.dismissable = false;
    const compiled = fixture.debugElement.nativeElement;
    spyOn(app, 'dismiss').and.callThrough();
    app.open();
    tick();
    fixture.detectChanges();
    const fakeEvent = {
      target: compiled.querySelector('.overlay')
    };
    app.dismiss(fakeEvent);
    tick(150);
    expect(app.dismiss).toHaveBeenCalledWith(fakeEvent);
    expect(app.visible).toBeTruthy();
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
    app.addCustomClass('firstClass');
    app.addCustomClass('secondClass');
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
    app.addCustomClass('firstClass');
    app.addCustomClass('secondClass');
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

  it('should remove all custom class of the modal', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.addCustomClass('firstClass');
    app.addCustomClass('secondClass');
    app.removeCustomClass();
    app.open();
    app.onOpen.subscribe(() => {
      const compiled = fixture.debugElement.nativeElement;
      const firstRef = compiled.querySelector('.dialog.firstClass');
      const secondRef = compiled.querySelector('.dialog.secondClass');
      expect(firstRef).toEqual(null);
      expect(secondRef).toEqual(null);
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

        expect(app.hasData()).toBe(false);

        app.setData(obj, true);
        app.onDataAdded.subscribe(() => {
          expect(app.hasData()).toBe(true);
          expect(app.getData().prop1).toBe(obj.prop1);
        });

        app.removeData();
        app.onDataRemoved.subscribe(() => {
          expect(app.hasData()).toBeFalsy();
        });
      });
  }));

});
