describe("Recruitment Module - Vacancies Menu", () => {
  beforeEach(() => {
    cy.loginAsAdmin(); // Assume a custom command for login
    cy.get(":nth-child(5) > .oxd-main-menu-item").click(); // Recruitment
    cy.contains("Vacancies").click();
  });

  it("Should validate vacancy management using Excel data", () => {
    cy.readExcelData("vacancyData.xlsx").then((data) => {
      data.forEach((record, index) => {
        cy.log(
          `Running Vacancy Test #${index + 1} - Expected: ${record.Expected}`
        );

        cy.contains("Add").click();

        if (record["Job Title"]) {
          cy.get('[name="addJobVacancy[jobTitle]"]').select(
            record["Job Title"]
          );
        }

        if (record["Hiring Manager"]) {
          cy.get('[name="addJobVacancy[hiringManager]"]').type(
            record["Hiring Manager"]
          );
        }

        if (record["Number of Positions"]) {
          cy.get('[name="addJobVacancy[numberOfPositions]"]')
            .clear()
            .type(record["Number of Positions"]);
        }

        cy.get("#btnSave").click();

        if (record.Expected === "Pass") {
          cy.contains("Successfully Saved").should("be.visible");
        } else {
          cy.get(".validation-error").should("exist");
        }

        // Reset for next loop
        cy.get(":nth-child(5) > .oxd-main-menu-item").click(); // Recruitment
        cy.contains("Vacancies").click();
      });
    });
  });

  it("Search Vacancies using filters from Excel", () => {
    cy.readExcelData("vacancyData.xlsx").then((data) => {
      data.forEach((record) => {
        cy.get('[name="vacancySearch[jobTitle]"]').select(
          record["Job Title"] || ""
        );
        cy.get('[name="vacancySearch[hiringManager]"]').select(
          record["Hiring Manager"] || ""
        );
        cy.get("#btnSrch").click();

        cy.get(".vacancy-list-table").within(() => {
          if (record.Expected === "Pass") {
            cy.contains(record["Job Title"]).should("exist");
          } else {
            cy.contains("No Records Found").should("exist");
          }
        });
      });
    });
  });
});
