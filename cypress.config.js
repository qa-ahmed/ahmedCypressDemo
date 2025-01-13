const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      this.screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on);
    }
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
