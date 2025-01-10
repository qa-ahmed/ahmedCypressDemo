describe('Homepage Test Suite', () => {
  it('Homepage Test Suite', () => {
    cy.visit('https://fluenceenergy.com/');
    cy.title().should('eq', 'Fluence | A Siemens and AES Company');
  })
})