import { CharitiesTrustWebUdPage } from './app.po';

describe('charities-trust-web-ud App', () => {
  let page: CharitiesTrustWebUdPage;

  beforeEach(() => {
    page = new CharitiesTrustWebUdPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
