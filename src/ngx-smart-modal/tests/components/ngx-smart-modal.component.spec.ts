import { inject, TestBed, async, tick, fakeAsync } from '@angular/core/testing';

import { NgxSmartModalComponent, NgxSmartModalService } from '../../';

describe('NgxSmartModalComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxSmartModalComponent
      ],
      providers: [
        NgxSmartModalService
      ]
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
    app.onCloseFinished.subscribe(() => {
      expect(app.isVisible()).toBeFalsy();
    });
  }));

  it('should toggle the modal directly', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    expect(app.isVisible()).toBeFalsy();
    app.toggle(true);
    expect(app.isVisible()).toBeTruthy();
    app.toggle();
    app.onCloseFinished.subscribe(() => {
      expect(app.isVisible()).toBeFalsy();
    });
  }));

  it('should close the modal by escape keyup', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
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

  it('should listen to any close event (Escape)', fakeAsync(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    app.identifier = 'myModal';

    // Test with escape event
    app.open();
    tick();
    expect(app.visible).toBeTruthy();
    dispatchEvent(event);
    tick();
    app.onAnyCloseEvent.subscribe(() => {
      expect(app.visible).toBeTruthy();
      expect(app.openedClass).toBeFalsy();
    });
  }));

  it('should listen to any close event (Close)', (done) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';

    // Test with close event
    app.open();
    expect(app.visible).toBeTruthy();
    app.onAnyCloseEvent.subscribe(() => {
      expect(app.visible).toBeTruthy();
      expect(app.openedClass).toBeFalsy();
      done();
    });
    app.close();
  });

  it('should listen to any close event (Dismiss)', (done) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';

    // Test with dismiss event
    app.open();
    fixture.detectChanges();
    expect(app.visible).toBeTruthy();
    const compiled = fixture.debugElement.nativeElement;
    const fakeEvent = {
      target: compiled.querySelector('.overlay')
    };
    app.onAnyCloseEvent.subscribe(() => {
      expect(app.visible).toBeTruthy();
      expect(app.openedClass).toBeFalsy();
      done();
    });
    app.dismiss(fakeEvent);
  });

  it('should listen to any close event finished (Escape)', fakeAsync(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    app.identifier = 'myModal';

    // Test with escape event
    app.open();
    tick();
    expect(app.visible).toBeTruthy();
    dispatchEvent(event);
    tick();
    app.onAnyCloseEventFinished.subscribe(() => {
      expect(app.visible).toBeFalsy();
      expect(app.openedClass).toBeFalsy();
    });
  }));

  it('should listen to any close event finished (Close)', (done) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';

    // Test with close event
    app.open();

    expect(app.visible).toBeTruthy();

    app.onAnyCloseEventFinished.subscribe(() => {
      expect(app.visible).toBeFalsy();
      done();
    });
    app.close();
    expect(app.openedClass).toBeFalsy();
  });

  it('should listen to any close event finished (Dismiss)', (done) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';

    // Test with dismiss event
    app.open();

    fixture.detectChanges();

    expect(app.visible).toBeTruthy();

    const compiled = fixture.debugElement.nativeElement;
    const fakeEvent = {
      target: compiled.querySelector('.overlay')
    };
    app.onAnyCloseEventFinished.subscribe(() => {
      expect(app.visible).toBeFalsy();
      done();
    });
    app.dismiss(fakeEvent);
    expect(app.openedClass).toBeFalsy();
  });

  it('should not close the modal by escape keyup', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
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
      compiled.querySelector('button.nsm-dialog-btn-close').click();
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
    app.onDismissFinished.subscribe(() => {
      expect(app.visible).toBeFalsy();
    });
    tick(app.hideDelay);
    expect(app.dismiss).toHaveBeenCalledWith(fakeEvent);
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
    tick();
    expect(app.dismiss).toHaveBeenCalledWith(fakeEvent);
    expect(app.visible).toBeTruthy();
  }));

  it('should hide the modal close cross button', (done) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.closable = false;
    const compiled = fixture.debugElement.nativeElement;
    app.onOpen.subscribe(() => {
      const closeBtn = compiled.querySelector('button.nsm-dialog-btn-close');
      expect(closeBtn).toBeNull();
      done();
    });
    app.open();
  });

  it('should add additional class to the modal', (done) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.addCustomClass('firstClass');
    app.addCustomClass('secondClass');
    app.onOpen.subscribe((modal: NgxSmartModalComponent) => {
      expect(modal.customClass.includes('firstClass')).toBeTruthy();
      expect(modal.customClass.includes('secondClass')).toBeTruthy();
      done();
    });
    app.open();
  });

  it('should remove additional class of the modal', (done) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.addCustomClass('firstClass');
    app.addCustomClass('secondClass');
    app.removeCustomClass('firstClass');
    app.onOpen.subscribe((modal: NgxSmartModalComponent) => {
      expect(modal.customClass.includes('firstClass')).toBeFalsy();
      expect(modal.customClass.includes('secondClass')).toBeTruthy();
      done();
    });
    app.open();
  });

  it('should remove all custom class of the modal', (done) => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.addCustomClass('firstClass');
    app.addCustomClass('secondClass');
    app.removeCustomClass();
    app.onOpen.subscribe((modal: NgxSmartModalComponent) => {
      expect(modal.customClass.includes('firstClass')).toBeFalsy();
      expect(modal.customClass.includes('secondClass')).toBeFalsy();
      done();
    });
    app.open();
  });

  it('should add data to the modal', fakeAsync(() => {
    inject([NgxSmartModalService], () => {
      const fixture = TestBed.createComponent(NgxSmartModalComponent);
      const app = fixture.debugElement.componentInstance;
      const obj = {
        prop1: 'test',
        prop2: true,
        prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
        prop4: 327652175423
      };
      app.identifier = 'myModal';

      expect(app.hasData()).toBeFalsy();
      app.setData(obj, true);
      tick();

      expect(app.hasData()).toBeTruthy();
      expect(app.getData().prop1).toBe(obj.prop1);
    });
  }));

  it('should manage data directly from the modal', fakeAsync(() => {
    inject([NgxSmartModalService], () => {
      const fixture = TestBed.createComponent(NgxSmartModalComponent);
      const app = fixture.debugElement.componentInstance;
      const obj = {
        prop1: 'test',
        prop2: true,
        prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
        prop4: 327652175423
      };
      app.identifier = 'myModal';

      expect(app.hasData()).toBeFalsy();

      app.onDataAdded.subscribe(() => {
        expect(app.hasData()).toBeTruthy();
        expect(app.getData().prop1).toBe(obj.prop1);
        tick();
      });
      app.setData(obj, true);

      app.onDataRemoved.subscribe(() => {
        expect(app.hasData()).toBeFalsy();
        tick();
      });
      app.removeData();
    });
  }));

  it('should open modal when visible setting is true', async(() => {
    const fixture = TestBed.createComponent(NgxSmartModalComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myModal';
    app.visible = true;
    expect(app.isVisible()).toBeTruthy();
  }));

});
