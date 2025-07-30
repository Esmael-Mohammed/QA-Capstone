class LoginPage {
  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  login(username, password) {
    if (username) {
      cy.get('input[name="username"]').clear().type(username);
    } else {
      cy.get('input[name="username"]').clear();
    }

    if (password) {
      cy.get('input[name="password"]').clear().type(password);
    } else {
      cy.get('input[name="password"]').clear();
    }

    cy.get('button[type="submit"]').click();
  }

  assertLoginSuccess() {
    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    cy.get('.oxd-userdropdown-tab', { timeout: 10000 }).should('be.visible');
  }

  assertLoginError() {
    cy.get('.oxd-alert-content-text', { timeout: 10000 })
      .should('exist')
      .and('contain.text', 'Invalid credentials');
  }
}

export default new LoginPage();
