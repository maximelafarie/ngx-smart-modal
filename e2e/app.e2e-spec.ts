import { NgxSmartModalPage } from './app.po';

describe('ngx-smart-modal App', () => {
  let page: NgxSmartModalPage;

  beforeEach(() => {
    page = new NgxSmartModalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
