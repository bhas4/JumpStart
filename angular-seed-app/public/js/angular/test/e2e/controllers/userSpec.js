describe("E2E: Testing UserCtrl - create user flows", function() {

  beforeEach(function() {
    browser().navigateTo('/dashboard');
  });

  it('create a new user & verify the user is added to listing', function() {
    expect(element('#ng-view').html()).toContain('Users Currently Signed Up!');

    //btn click to singup the user
    element('#ui_create_btn').click();
    sleep(1);

    //check the modal popup is displayed
    expect(element('#ui_createuser').css('display')).toBe('block');

    //fill the form values
    input('new_user.first_name').enter('Jack');
    input('new_user.last_name').enter('Hill');
    input('new_user.email').enter('jack@hill.com');
    input('new_user.age').enter('34');

    //click on submit btn
    element('#btn_submit').click();

    //check the newly created value is added back to list
    expect(element('.table-bordered').html()).toContain('jack@hill.com');
  });
}); 