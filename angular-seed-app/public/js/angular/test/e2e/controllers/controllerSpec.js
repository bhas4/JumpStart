describe("E2E: Testing Controllers", function() {

  beforeEach(function() {
    browser().navigateTo('/dashboard');
  });

  it('should redirect and setup the users list', function() {
    browser().navigateTo('#/all');
    expect(element('#ng-view').html()).toContain('Users Currently Signed Up');
  });

  it('should redirect to the home page, and show the welcome text', function() {
    browser().navigateTo('#/home');
    expect(element('#ng-view').html()).toContain('Welcome to Angular Seed App');
  });
}); 