//place index.ts items here

// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select iFrame.
       * @example cy.getIFrame('frame')
       */
      getIframe(iframe: string): any;
      /**
       * Custom command to get links by linktext
       * @example cy.byLinkText('linktext')
       */
      byLinkText(linktext: string): Chainable<Element>;
    }
  }
}