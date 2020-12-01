import { StudentsManagementTemplatePage } from './app.po';

describe('StudentsManagement App', function() {
  let page: StudentsManagementTemplatePage;

  beforeEach(() => {
    page = new StudentsManagementTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
