import { NsmRefactoPage } from './app.po';

describe('nsm-refacto App', () => {
  let page: NsmRefactoPage;

  beforeEach(() => {
    page = new NsmRefactoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
