// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const fs = require('fs'); const path = require('path');

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('getIframe', (iframe: string) => {
    return cy.get(iframe) //needs a return statement
        .its('0.contentDocument.body')
        .should('be. visible')
        .then(cy.wrap);
})

Cypress.Commands.add('byLinkText', (linktext: string) => {
    cy.get('a')
        .contains(linktext);
})

Cypress.Commands.add('readCSV', (filePath: string) => {
    cy.readFile(filePath).then((csvData) => {
        // Remove commented lines 
        const rowsWithHeaders = csvData.split('\n').filter(row => !row.startsWith('#'));
        // Set the first row as the header
        const headers = rowsWithHeaders[0].split(',');
        // Slice the header row to get the data rows 
        const dataRows = rowsWithHeaders.slice(1).filter(row => !row.startsWith('\n'));
        // Set headers and dataRows as aliases 
        cy.wrap(headers).as('headers');
        cy.wrap(dataRows).as('dataRows');
    });
})

Cypress.Commands.add('deleteFiles', (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            const filePath = `${path}/${file}`;
            fs.unlinkSync(filePath);
        });
        cy.log(`All files deleted from ${path}`);
    }
    else { cy.log(`Folder not found: ${path}`); }
});

Cypress.Commands.add('getDownloadedFileName', (path) => {
    let fileName; // Read the folder contents 
    const files = fs.readdirSync(path);
    // Ensure there's at least one file in the folder 
    if (files.length > 0) {
        // Get the first file in the folder
        fileName = files[0]; cy.log(`Downloaded file: ${fileName}`);
    }
    else {
        cy.log('No files found in the folder');
    } return cy.wrap(fileName).as('fileName');
});