import { NgxSmartModalModule } from '../../';
import { NgxSmartModalService } from '../../src/ngx-smart-modal';

describe('NgxSmartModalModule', () => {
  let ngxSmartModalModule: NgxSmartModalModule;

  beforeEach(() => {
    ngxSmartModalModule = new NgxSmartModalModule({} as NgxSmartModalService);
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
