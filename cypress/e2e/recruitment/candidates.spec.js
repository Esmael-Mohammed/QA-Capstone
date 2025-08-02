import CandidatesPage from '../../pages/CandidatesPage';
import createData from '../../fixtures/candidateData.json';
import searchData from '../../fixtures/candidateSearchData.json';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // prevents Cypress from failing the test
});

describe('Recruitment Module - Candidates Menu', () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.get(':nth-child(5) > .oxd-main-menu-item').click();
    cy.contains('Candidates').click();
  });

  createData.forEach((data, index) => {
    it(`Create Candidate ${index + 1} - Expected: ${data.expected}`, () => {
      cy.log(`Creating candidate: ${data.firstName || 'N/A'} ${data.lastName || 'N/A'}`);

      CandidatesPage.goToCandidates();
      CandidatesPage.clickAddButton();

      if (data.expected === 'success') {
        CandidatesPage.fillCandidateForm(data);
        CandidatesPage.clickSave();
        CandidatesPage.verifyCandidateAdded(`${data.firstName} ${data.lastName}`);
      } else {
        CandidatesPage.clickSave();
        CandidatesPage.verifyValidationMessages();
      }
    });
  });

  searchData.forEach((data, index) => {
    it(`Search Candidate ${index + 1} - ${data.expectedName}`, () => {
      cy.log(`Searching for: ${data.expectedName}`);

      CandidatesPage.goToCandidates();
      CandidatesPage.searchCandidate({
        jobVacancy: data.jobVacancy,
        fromDate: data.fromDate,
        toDate: data.toDate,
      });
      CandidatesPage.verifySearchResult(data.expectedName);
    });
  });
});
