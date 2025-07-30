class CandidatesPage {
  goToCandidates() {
    cy.get(':nth-child(5) > .oxd-main-menu-item').click(); // Recruitment
    cy.contains('Candidates').click();
  }

  clickAddButton() {
    cy.contains('Add').click();
  }

  fillCandidateForm(candidate) {
    candidate?.firstName && cy.get('[placeholder="First Name"]').type(candidate.firstName);
    candidate?.middleName && cy.get('[placeholder="Middle Name"]').type(candidate.middleName);
    candidate?.lastName && cy.get('[placeholder="Last Name"]').type(candidate.lastName);

    if (candidate?.jobVacancy) {
      cy.get('.oxd-select-wrapper').eq(0).click();
      cy.get('.oxd-select-dropdown').contains(candidate.jobVacancy).click();
    }

    candidate?.email && cy.get('[type="email"]').type(candidate.email);
    candidate?.contact && cy.get('input[type="tel"]').type(candidate.contact);
  }

  clickSave() {
    cy.contains('Save').click();
  }

  verifyCandidateAdded(fullName) {
    cy.contains('Candidates').click();
    cy.get('.oxd-table').should('contain', fullName);
  }

  verifyValidationMessages() {
    cy.get('.oxd-input-group .oxd-text--error')
      .should('exist')
      .and('have.length.greaterThan', 0);
  }

  searchCandidate({ jobVacancy, fromDate, toDate }) {
    if (jobVacancy) {
      cy.get('.oxd-select-wrapper').eq(0).click();
      cy.get('.oxd-select-dropdown').contains(jobVacancy).click();
    }

    if (fromDate) cy.get('.oxd-date-input').eq(0).type(fromDate);
    if (toDate) cy.get('.oxd-date-input').eq(1).type(toDate);

    cy.contains('Search').click();
  }

  verifySearchResult(fullName) {
    cy.get('.oxd-table').should('contain', fullName);
  }
}

export default new CandidatesPage();
