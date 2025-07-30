const { defineConfig } = require('cypress');
const xlsx = require('xlsx');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportPageTitle: 'Test Report',
    reportFilename: 'report-[datetime]'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // Mochawesome Reporter setup
      require('cypress-mochawesome-reporter/plugin')(on);

      // Custom task for reading Excel files
      on('task', {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const workbook = xlsx.readFile(filePath);
              const sheetName = workbook.SheetNames[0];
              const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        }
      });

      return config;
    },

    baseUrl: 'http://localhost/orangehrm',
    specPattern: 'cypress/e2e/**/*.spec.js',
    retries: {
      runMode: 2,
      openMode: 1
    },
    experimentalStudio: true,
    video: false,
    screenshotOnRunFailure: true,
    // env: {
    //   apiUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2'
    // }
  }
});
