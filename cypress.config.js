const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
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
