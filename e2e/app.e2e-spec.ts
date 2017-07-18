import { browser } from 'protractor';
import { NgxSmartModalPage } from './app.po';

describe('ngx-smart-modal App', () => {
  let page: NgxSmartModalPage;

  beforeEach(() => {
    page = new NgxSmartModalPage();
  });

  it('should open the first modal instance', () => {
    page.navigateTo();
    page.clickOpenModal();
    browser.waitForAngularEnabled(true);
    page.waitForModal().then((element) => {
      expect<any>(page.getModal().getText()).toEqual('Hey, I\'m a simple modal!');
    });
  });
});
