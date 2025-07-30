import CandidatesPage from '../../pages/CandidatesPage';
import createData from '../../fixtures/candidateData.json';
import searchData from '../../fixtures/candidateSearchData.json';

describe('Recruitment Module - Candidates Menu', () => {
  beforeEach(() => {
    cy.loginAsAdmin(); // Custom login command
    cy.url().should('include', '/dashboard');
  });

  // Candidate Creation Tests 
  createData.forEach((data, index) => {
    it(`Create Candidate ${index + 1} - Expected: ${data.expected}`, () => {
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

  // Candidate Search Tests 
  searchData.forEach((data, index) => {
    it(`Search Candidate ${index + 1} - ${data.expectedName}`, () => {
      CandidatesPage.goToCandidates();
      CandidatesPage.searchCandidate({
        jobVacancy: data.jobVacancy,
        fromDate: data.fromDate,
        toDate: data.toDate
      });
      CandidatesPage.verifySearchResult(data.expectedName);
    });
  });
});
