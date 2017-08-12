import { HelloWorldSp2Page } from './app.po';

describe('hello-world-sp2 App', () => {
  let page: HelloWorldSp2Page;

  beforeEach(() => {
    page = new HelloWorldSp2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
