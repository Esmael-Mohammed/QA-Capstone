import LoginPage from '../../pages/LoginPage';

describe('Login Module', function () {
  before(function () {
    cy.fixture('loginData').then(function (data) {
      this.testData = data;
    });
  });

  beforeEach(function () {
    LoginPage.visit();
  });

  it('Runs login using json file', function () {
    expect(this.testData).to.exist;

    this.testData.forEach(({ username, password, expected }) => {
      LoginPage.login(username, password);

      if (expected === 'success') {
        LoginPage.assertLoginSuccess();

        // Log out
        cy.get('.oxd-userdropdown-tab').click();
        cy.contains('Logout').click();
        LoginPage.visit();

      } else if (expected === 'error') {
        LoginPage.assertLoginError();
      }
    });
  });
});
