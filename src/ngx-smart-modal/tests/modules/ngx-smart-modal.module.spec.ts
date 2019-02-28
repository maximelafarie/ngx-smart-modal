import { ModuleWithProviders } from '@angular/core';
import { NgxSmartModalModule } from '../../';

describe('PerformanceModule', () => {
  let ngxSmartModalModule: NgxSmartModalModule;

  beforeEach(() => {
    ngxSmartModalModule = new NgxSmartModalModule();
  });

  it('should create an instance', () => {
    expect(ngxSmartModalModule).toBeTruthy();
  });

  it('should get forRoot()', () => {
    expect(typeof NgxSmartModalModule.forRoot()).toEqual('object');
  });

  it('should get forChild()', () => {
    expect(typeof NgxSmartModalModule.forChild()).toEqual('object');
  });
});
