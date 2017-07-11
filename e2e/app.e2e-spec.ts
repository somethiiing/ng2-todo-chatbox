import { Ng2TodoChatboxPage } from './app.po';

describe('ng2-todo-chatbox App', () => {
  let page: Ng2TodoChatboxPage;

  beforeEach(() => {
    page = new Ng2TodoChatboxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
