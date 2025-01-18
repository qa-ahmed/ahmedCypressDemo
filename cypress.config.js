const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      this.screenshotOnRunFailure = true;
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    experimentalStudio: true
  },
  env: {
    fluenceEnergy: '',
    reactshopping: {
      link: 'https://react-shopping-cart-67954.firebaseapp.com/',
      username: '',
      password: ''
    },
    wikipedia: {
      link: 'https://wikipedia.org'
    }
  }
});
