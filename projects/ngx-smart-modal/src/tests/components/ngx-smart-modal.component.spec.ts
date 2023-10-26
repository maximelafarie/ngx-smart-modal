import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { NgxSmartModalComponent, NgxSmartModalConfig, NgxSmartModalService } from '../../public-api';

describe('NgxSmartModalComponent', () => {
  let component: NgxSmartModalComponent;
  let fixture: ComponentFixture<NgxSmartModalComponent>;

  beforeEach(waitForAsync(() => {
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

  it('should init', waitForAsync(() => {
    spyOn(component as any, '_sendEvent');

    component.ngOnInit();

    expect((component as any)._sendEvent).toHaveBeenCalledWith('create');
  }));

  it('should init without identifier', waitForAsync(() => {
    component.identifier = '';

    expect(() => { component.ngOnInit(); }).toThrow(new Error('identifier field isn’t set. Please set one before calling <ngx-smart-modal> in a template.'));
  }));

  it('should open', waitForAsync(() => {
    spyOn(component as any, '_sendEvent');

    component.open(true);

    expect((component as any)._sendEvent).toHaveBeenCalledWith('open', { top: true });
  }));

  it('should close', waitForAsync(() => {
    spyOn(component as any, '_sendEvent');

    component.close();

    expect((component as any)._sendEvent).toHaveBeenCalledWith('close');
  }));

  it('should dismiss', waitForAsync(() => {
    spyOn(component as any, '_sendEvent');

    const e = {
      target: {
        classList: {
          contains: (type: string) => {
            return type;
          }
        }
      }
    } as any;

    component.dismiss(e);

    expect((component as any)._sendEvent).toHaveBeenCalledWith('dismiss');
  }));

  it('should dismiss without dismissable', waitForAsync(() => {
    spyOn(component as any, '_sendEvent');

    const e = {
      target: {
        classList: {
          contains: (type: string) => {
            return type;
          }
        }
      }
    } as any;

    component.dismissable = false;
    component.dismiss(e);

    expect((component as any)._sendEvent).not.toHaveBeenCalled();
  }));

  it('should toggle', waitForAsync(() => {
    spyOn(component as any, '_sendEvent');

    component.toggle(true);

    expect((component as any)._sendEvent).toHaveBeenCalledWith('toggle', { top: true });
  }));

  it('should add custom class', waitForAsync(() => {
    component.customClass = '';
    component.addCustomClass('test');

    expect(component.customClass).toEqual('test');
  }));

  it('should add custom class with existing class', waitForAsync(() => {
    component.customClass = 'test';
    component.addCustomClass('test1');

    expect(component.customClass).toEqual('test test1');
  }));

  it('should remove all custom class', waitForAsync(() => {
    component.customClass = 'test test1';
    component.removeCustomClass();

    expect(component.customClass).toEqual('');
  }));

  it('should remove specific custom class', waitForAsync(() => {
    component.customClass = 'test test1';
    component.removeCustomClass('test');

    expect(component.customClass).toEqual('test1');
  }));

  it('should is visible', waitForAsync(() => {
    component.visible = false;

    expect(component.isVisible()).toBeFalsy();
  }));

  it('should has data', waitForAsync(() => {
    (component as any)._data = { fake: 'data' };

    expect(component.hasData()).toBeTruthy();
  }));

  it('should set data if not data', waitForAsync(() => {
    (component as any)._data = undefined;

    component.setData('test data');

    expect(component.getData()).toEqual('test data');
  }));

  it('should set data if data', waitForAsync(() => {
    (component as any)._data = 'test';

    component.setData('test data');

    expect(component.getData()).toEqual('test');
  }));

  it('should set force data if data', waitForAsync(() => {
    (component as any)._data = 'test';

    component.setData('test data', true);

    expect(component.getData()).toEqual('test data');
  }));

  it('should remove data', waitForAsync(() => {
    (component as any)._data = 'test';

    component.removeData();

    expect(component.getData()).toEqual(undefined);
  }));

  it('should add body class', waitForAsync(() => {
    component.addBodyClass();

    const body = document.body;

    expect(body.classList.contains(NgxSmartModalConfig.bodyClassOpen)).toBeTrue();
  }));

  it('should remove body class', waitForAsync(() => {
    const body = document.body;
    body.classList.add(NgxSmartModalConfig.bodyClassOpen);

    component.removeBodyClass();

    expect(body.classList.contains(NgxSmartModalConfig.bodyClassOpen)).toBeFalse();
  }));

  it('should targetPlacement if no target', waitForAsync(() => {
    component.target = '';

    expect(component.targetPlacement()).toBeFalsy();
  }));

  it('should targetPlacement if target is invalid', waitForAsync(() => {
    component.target = 'invalid';

    (component as any).nsmContent = { fake: 'obj' } as any;
    (component as any).nsmOverlay = { fake: 'obj' } as any;
    (component as any).nsmDialog = { fake: 'obj' } as any;

    spyOn((document as any), 'querySelector').and.returnValue(false);

    expect(component.targetPlacement()).toBeFalsy();
  }));

  it('should targetPlacement', waitForAsync(() => {
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

    spyOn((document as any), 'querySelector').and.returnValue(objectHtmlTarget);
    spyOn((window as any), 'getComputedStyle').and.returnValue({ marginLeft: 0, marginTop: 28 });

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

  it('should targetPlacement ( no browser )', waitForAsync(() => {
    spyOnProperty(component as any, 'isBrowser', 'get').and.returnValue(false);

    expect((component as any)._sendEvent('test')).toBeFalsy();
  }));
});
