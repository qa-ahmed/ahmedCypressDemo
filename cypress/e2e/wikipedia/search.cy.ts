describe('Wikipedia tests', () => {
  beforeEach('Visit Wikipedia', () => {
    cy.clearAllSessionStorage() //clears session storage before each test to avoid flaky tests
    cy.visit(Cypress.env('wikipedia').link);
  })

  it('Search Results Display Active Links', () => {
    cy.get('.search-input input').type('Bangladesh');
    cy.get('.suggestions-dropdown a[href]').each((linkElement)=> {
      const link = linkElement.prop('href');
      cy.log(link);
      cy.request({
        url: link
      }).then(response => {
        expect(response.status).to.equal(200);
      })
    })
  })

  it('Open Page From Search Results', () => {
    cy.get('.search-input input').type('Bangladesh');
    cy.get('.suggestions-dropdown a:first-child')
    .contains('Bangladesh')
    .click();
  })
  //test
})