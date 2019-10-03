import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { NgxSmartModalComponent, NgxSmartModalService } from '../../';

describe('NgxSmartModalComponent', () => {
  let component: NgxSmartModalComponent;
  let fixture: ComponentFixture<NgxSmartModalComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSmartModalComponent);
    component = fixture.debugElement.componentInstance;

    component.identifier = 'myModalTest';

    fixture.detectChanges();
  });

  it('should init', async(() => {
    spyOn(component as any, '_sendEvent');

    component.ngOnInit();

    expect((component as any)._sendEvent).toHaveBeenCalledWith('create');
  }));

  it('should init without identifier', async(() => {
    component.identifier = '';

    expect(() => { component.ngOnInit(); }).toThrow(new Error('identifier field isn’t set. Please set one before calling <ngx-smart-modal> in a template.'));
  }));

  it('should open', async(() => {
    spyOn(component as any, '_sendEvent');

    component.open(true);

    expect((component as any)._sendEvent).toHaveBeenCalledWith('open', { top: true });
  }));

  it('should close', async(() => {
    spyOn(component as any, '_sendEvent');

    component.close();

    expect((component as any)._sendEvent).toHaveBeenCalledWith('close');
  }));

  it('should dismiss', async(() => {
    spyOn(component as any, '_sendEvent');

    const e = {
      target: {
        classList: {
          contains: (type: string) => {
            return type;
          }
        }
      }
    };

    component.dismiss(e);

    expect((component as any)._sendEvent).toHaveBeenCalledWith('dismiss');
  }));

  it('should dismiss without dismissable', async(() => {
    spyOn(component as any, '_sendEvent');

    const e = {
      target: {
        classList: {
          contains: (type: string) => {
            return type;
          }
        }
      }
    };

    component.dismissable = false;
    component.dismiss(e);

    expect((component as any)._sendEvent).not.toHaveBeenCalled();
  }));

  it('should toggle', async(() => {
    spyOn(component as any, '_sendEvent');

    component.toggle(true);

    expect((component as any)._sendEvent).toHaveBeenCalledWith('toggle', { top: true });
  }));

  it('should add custom class', async(() => {
    component.customClass = '';
    component.addCustomClass('test');

    expect(component.customClass).toEqual('test');
  }));

  it('should add custom class with existing class', async(() => {
    component.customClass = 'test';
    component.addCustomClass('test1');

    expect(component.customClass).toEqual('test test1');
  }));

  it('should remove all custom class', async(() => {
    component.customClass = 'test test1';
    component.removeCustomClass();

    expect(component.customClass).toEqual('');
  }));

  it('should remove specific custom class', async(() => {
    component.customClass = 'test test1';
    component.removeCustomClass('test');

    expect(component.customClass).toEqual('test1');
  }));

  it('should is visible', async(() => {
    component.visible = false;

    expect(component.isVisible()).toBeFalsy();
  }));

  it('should has data', async(() => {
    (component as any)._data = { fake: 'data' };

    expect(component.hasData()).toBeTruthy();
  }));

  it('should set data if not data', async(() => {
    (component as any)._data = undefined;

    component.setData('test data');

    expect(component.getData()).toEqual('test data');
  }));

  it('should set data if data', async(() => {
    (component as any)._data = 'test';

    component.setData('test data');

    expect(component.getData()).toEqual('test');
  }));

  it('should set force data if data', async(() => {
    (component as any)._data = 'test';

    component.setData('test data', true);

    expect(component.getData()).toEqual('test data');
  }));

  it('should remove data', async(() => {
    (component as any)._data = 'test';

    component.removeData();

    expect(component.getData()).toEqual(undefined);
  }));

  it('should add body class', async(() => {
    component.addBodyClass();
  }));

  it('should remove body class', async(() => {
    component.removeBodyClass();
  }));

  it('should targetPlacement if no target', async(() => {
    component.target = '';

    expect(component.targetPlacement()).toBeFalsy();
  }));

  it('should targetPlacement if target is invalid', async(() => {
    component.target = 'invalid';

    (component as any).nsmContent = { fake: 'obj' } as any;
    (component as any).nsmOverlay = { fake: 'obj' } as any;
    (component as any).nsmDialog = { fake: 'obj' } as any;

    spyOn(document, 'querySelector').and.returnValue(false);

    expect(component.targetPlacement()).toBeFalsy();
  }));

  it('should targetPlacement', async(() => {
    const attr1 = { height: 350, width: 500 };
    const objectHtml1 = { getBoundingClientRect: () => attr1 };
    (component as any).nsmContent = { first: { nativeElement: objectHtml1 }, length: 1 };

    let attr2 = { width: 1280, height: 800 };
    let objectHtml2 = { getBoundingClientRect: () => attr2 };
    (component as any).nsmOverlay = { first: { nativeElement: objectHtml2 }, length: 1 };

    const attr3 = { left: 380, top: 28 };
    const objectHtml3 = { getBoundingClientRect: () => attr3 };
    (component as any).nsmDialog = { first: { nativeElement: objectHtml3 }, length: 1 };

    (component as any).target = '.test';
    let attrTarget = { left: 1070, top: 310, width: 160, height: 40 };
    let objectHtmlTarget = { getBoundingClientRect: () => attrTarget };
    (component as any).nsmDialog = { first: { nativeElement: objectHtmlTarget }, length: 1 };

    spyOn(document, 'querySelector').and.returnValue(objectHtmlTarget);
    spyOn(window, 'getComputedStyle').and.returnValue({ marginLeft: 0, marginTop: 28 });

    (component as any)._renderer.setStyle = (ele: any, key: string, val: string) => {
      ele.key = val;
    };

    spyOn((component as any)._renderer, 'setStyle');

    component.targetPlacement();

    expect((component as any)._renderer.setStyle).toHaveBeenCalledWith((component as any).nsmContent.first.nativeElement, 'top', '0px');
    expect((component as any)._renderer.setStyle).toHaveBeenCalledWith((component as any).nsmContent.first.nativeElement, 'left', '-290px');

    attrTarget = { left: 80, top: 310, width: 160, height: 40 };
    objectHtmlTarget = { getBoundingClientRect: () => attrTarget };
    (component as any).nsmDialog = { first: { nativeElement: objectHtmlTarget }, length: 1 };

    component.targetPlacement();

    attr2 = { width: 1280, height: 200 };
    objectHtml2 = { getBoundingClientRect: () => attr2 };
    (component as any).nsmOverlay = { first: { nativeElement: objectHtml2 }, length: 1 };

    component.targetPlacement();
  }));

  it('should targetPlacement ( no browser )', async(() => {
    spyOnProperty(component as any, 'isBrowser', 'get').and.returnValue(false);

    expect((component as any)._sendEvent('test')).toBeFalsy();
  }));
  
  it('should setPosition', async(() => {
    component.setPosition(10, 20);
    expect((component as any).positionX).toBe(10);
    expect((component as any).positionY).toBe(20);
  }));

  it('should not moveDialog if there\'s no nsmDialog', async(() => {
    (component as any).nsmDialog = { length: 0 };

    const result = component.moveDialog(-30, -50);
    expect(result).toBeFalsy();
  }));

  it('should moveDialog', async(() => {
    (component as any).nsmDialog = { length: 1, last: { nativeElement: { offsetTop: 20, offsetLeft: 30, style: {} } } };

    const result = component.moveDialog(-30, -50);
    expect((component as any).nsmDialog.last.nativeElement.style.top).toBe('70px');
    expect((component as any).nsmDialog.last.nativeElement.style.left).toBe('60px');
    expect(result).toBeTruthy();
  }));

  it('should not startDrag if modal not draggable', async(() => {

    component.draggable = false;

    //spyOn((component), 'setPosition');

    let result = component.startDrag({} as MouseEvent);
    expect((component as any).dragging).toBeFalsy();
    expect(result).toBe(false);
  }));

  it('should not startDrag if event there is no nsmContent', async(() => {
    component.draggable = true;
    (component as any).nsmContent = { length: 0 };

    //spyOn((component), 'setPosition');

    let result = component.startDrag({} as MouseEvent);
    expect((component as any).dragging).toBeFalsy();
    expect(result).toBe(false);
  }));

  it('should not startDrag if event srcElement is null', async(() => {
    component.draggable = true;
    (component as any).nsmContent = { length: 1 };
    const fakeEvent = { srcElement: null };

    //spyOn((component), 'setPosition');

    let result = component.startDrag(fakeEvent as MouseEvent);
    expect((component as any).dragging).toBeFalsy();
    expect(result).toBe(false);
  }));

  it('should not startDrag if clicked element isn\'t .draggable', async(() => {
    component.draggable = true;
    (component as any).nsmContent = { length: 1 };
    const fakeSrcElement = document.createElement('div') as any;
    const fakeEvent = { srcElement: fakeSrcElement };

    //spyOn((component), 'setPosition');

    const result = component.startDrag(fakeEvent as MouseEvent);
    expect((component as any).dragging).toBeFalsy();
    expect(result).toBeFalsy();
  }));

  it('should not startDrag if content doesn\'t contain clicked element', async(() => {
    component.draggable = true;
    const fakeSrcElement1 = document.createElement('div') as any;
    fakeSrcElement1.classList.add('draggable');
    const fakeSrcElement2 = document.createElement('div') as any;
    (component as any).nsmContent = { 'length': 1, 'last': { 'nativeElement': { 'contains': (el: any) => el == fakeSrcElement1 } } };
    const fakeEvent = { clientX: 10, clientY: 30, srcElement: fakeSrcElement2 };

    //spyOn((component), 'setPosition');

    const result = component.startDrag(fakeEvent as MouseEvent);
    expect((component as any).dragging).toBeFalsy();
    expect(result).toBeFalsy();
  }));

  it('should startDrag', async(() => {
    component.draggable = true;
    const fakeSrcElement = document.createElement('div') as any;
    (component as any).nsmContent = { 'length': 1, 'last': { 'nativeElement': { 'contains': (el: any) => el == fakeSrcElement } } };
    fakeSrcElement.classList.add('draggable');
    const fakeEvent = { clientX: 10, clientY: 30, srcElement: fakeSrcElement, preventDefault: () => { } };

    (component as any).setPosition = (positionX: any, positionY: any) => {
      //nothing
    };

    spyOn(component, 'setPosition');

    const result = component.startDrag(fakeEvent as MouseEvent);
    expect(result).toBeTruthy();
    expect((component as any).dragging).toBeTruthy();
    expect(component.setPosition).toHaveBeenCalledWith(fakeEvent.clientX, fakeEvent.clientY);
  }));

  it('should not elementDrag if not started dragging', async(() => {
    (component as any).dragging = false;

    const result = component.elementDrag({} as MouseEvent);
    expect(result).toBeFalsy();
  }));

  it('should not elementDrag if event there is no nmsDialog', async(() => {
    (component as any).dragging = true;
    (component as any).nsmDialog = { length: 0 };

    const result = component.elementDrag({} as MouseEvent);
    expect(result).toBeFalsy();
  }));

  it('should elementDrag ', async(() => {
    (component as any).dragging = true;
    (component as any).nsmDialog = { 'length': 1 };
    const positionX = 10;
    (component as any).positionX = positionX;
    const positionY = 30;
    (component as any).positionY = positionY;
    const fakeEvent = { clientX: 2, clientY: 5, preventDefault: () => { } };

    const offsetX = component['positionX'] - fakeEvent.clientX;
    const offsetY = component['positionY'] - fakeEvent.clientY;

    (component as any).moveDialog = (positionX: any, positionY: any) => {
      //nothing
    };

    (component as any).setPosition = (positionX: any, positionY: any) => {
      //nothing
    };

    spyOn((component), 'moveDialog');
    spyOn((component), 'setPosition');

    const result = component.elementDrag(fakeEvent as MouseEvent);

    expect(component.moveDialog).toHaveBeenCalledWith(offsetX, offsetY);
    expect(component.setPosition).toHaveBeenCalledWith(fakeEvent.clientX, fakeEvent.clientY);

    expect(result).toBeTruthy();
  }));

  it('should stopDrag', async(() => {
    component.stopDrag();
    expect((component as any).dragging).toBeFalsy();
  }));

});
