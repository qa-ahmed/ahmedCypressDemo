describe('Homepage Test Suite', () => {
  it('Assert Title', () => {
    cy.visit('https://fluenceenergy.com/');
    cy.title().should('eq', 'Fluence | A Siemens and AES Company');
  })

  it('Log Page Title', () => {
    cy.visit('https://fluenceenergy.com/');
    cy.title().then((title => {
      cy.log(title);
    }))
  })

  it('Check for Broken Links', () => {
    cy.visit('https://fluenceenergy.com/');
    cy.get('a[href]').each(link => {
      const page = link.prop('href');
      if (!page.includes('ir.fluenceenergy.com')) {
        cy.request({
          url: page,
          failOnStatusCode: false,
          timeout: 50000
        }).then(response => {
          expect(response.status).to.not.eq(404);
            Cypress.log({
              name: 'Link is Active',
              message: `${page} returned status ${response.status}`
            });
          });
      }
    });
  });

})
