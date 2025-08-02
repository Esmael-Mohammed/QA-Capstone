class CandidatesPage {
  static goToCandidates() {
    cy.get(':nth-child(5) > .oxd-main-menu-item').click();
    cy.contains('Candidates').click();
  }

  static clickAddButton() {
    cy.contains('Add').click();
  }

  static fillCandidateForm(candidate) {
    if (!candidate) throw new Error('Candidate object is undefined.');

    cy.get('[placeholder="First Name"]').clear().type(candidate.firstName);
    cy.get('[placeholder="Middle Name"]').clear().type(candidate.middleName);
    cy.get('[placeholder="Last Name"]').clear().type(candidate.lastName);

    if (candidate.jobVacancy) {
      cy.get('.oxd-select-wrapper').eq(0).click();
      cy.get('.oxd-select-dropdown')
        .should('be.visible')
        .find('.oxd-select-option')
        .should('have.length.greaterThan', 0);

      cy.get('.oxd-select-dropdown')
        .contains('.oxd-select-option', candidate.jobVacancy)
        .scrollIntoView()
        .click({ force: true });
    }

    if (candidate.email) {
      cy.get('input[placeholder="Type here"]').eq(0).clear().type(candidate.email);
    }

    if (candidate.contact) {
      cy.get('input[placeholder="Type here"]').eq(1).clear().type(candidate.contact);
    }

    // Upload resume (optional)
    const filePath = 'cypress/files/CV.pdf';
    cy.get('input[type="file"]').selectFile(filePath, { force: true });
  }

  static clickSave() {
    cy.get('button[type="submit"]').click();
  }

  static verifyCandidateAdded(expectedName) {
    cy.get('.oxd-toast', { timeout: 10000 }).should('contain', 'Successfully Saved');

    this.goToCandidates();

    cy.contains('Search', { timeout: 10000 }).should('be.visible').click();

    // cy.get('.oxd-table-card', { timeout: 10000 }).should('contain', expectedName);
  }

  static verifyValidationMessages() {
    cy.get('.oxd-input-field-error-message').should('exist');
  }

  // static searchCandidate({ jobVacancy, fromDate, toDate }) {
  //   if (jobVacancy) {
  //     cy.get('.oxd-select-wrapper').eq(0).click();
  //     cy.get('.oxd-select-dropdown')
  //       .contains(jobVacancy)
  //       .scrollIntoView()
  //       .click({ force: true });
  //   }

  //   if (fromDate) {
  //     cy.get('input[placeholder="From"]').clear().type(fromDate).type('{enter}');
  //   }

  //   if (toDate) {
  //     cy.get('input[placeholder="To"]').clear().type(toDate).type('{enter}');
  //   }

  //   cy.contains('Search').click();
  // }
static searchCandidate({ jobVacancy, fromDate, toDate }) {
  if (jobVacancy) {
    cy.get('.oxd-select-wrapper').eq(0).click();
    cy.get('.oxd-select-dropdown')
      .contains(jobVacancy)
      .scrollIntoView()
      .click({ force: true });
  }

  if (fromDate) {
    cy.get('input[placeholder="From"]').clear().type(fromDate).type('{enter}');
  }

  if (toDate) {
    cy.get('input[placeholder="To"]').clear().type(toDate).type('{enter}');
    
    // ✅ Close calendar with Escape key
    cy.get('input[placeholder="To"]').type('{esc}');
  }

  // ✅ Ensure Search button is ready and click it
  cy.contains('Search')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });
}


  static verifySearchResult(expectedName) {
    cy.get('.oxd-table-card').should('contain', expectedName);
  }
}

export default CandidatesPage;
