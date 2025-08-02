// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/web/index.php/auth/login');
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();
});
Cypress.Commands.add('readExcelData', (fileName) => {
  return cy.task('parseXlsx', { filePath: `cypress/fixtures/${fileName}` });
});

// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })