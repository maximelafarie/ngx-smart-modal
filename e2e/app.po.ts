import { browser, by, element, until } from 'protractor';

export class NgxSmartModalPage {
  navigateTo() {
    return browser.get('/');
  }

  waitForModal() {
    return browser
      .wait(until.elementLocated(by.className('dialog')), 500, 'not found')
      .then((el) => {
        return browser.wait(until.elementIsVisible(el), 5000, 'not found');
      });
  }

  getModal() {
    return browser.findElement(by.css('.dialog h1'));
  }

  clickOpenModal() {
    return element.all(by.className('button')).get(0).click();
  }
}
