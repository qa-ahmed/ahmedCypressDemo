describe('Assertions', () => {

    beforeEach('Visit Homepage', () => {
        cy.visit(Cypress.env('reactshopping').link);
    })

    it('Assertions - Implicit', () => {
        cy.url()
            .should('include', 'https://react-shopping-cart')
            .and('eq', 'https://react-shopping-cart-67954.firebaseapp.com/')
            .and('not.contain', 'react-books')
            .and('not.eq', 'https://google.com');

        cy.title()
            .should('include', 'Typescript React Shopping cart');

        cy.url()
            .should('include', 'https://react-shopping-cart')
            .and('eq', 'https://react-shopping-cart-67954.firebaseapp.com/')
            .and('not.contain', 'react-books')
            .and('not.eq', 'https://google.com')
    })

    it('Assertions - Explicit', () => {
        cy.get('h4+p')
        .should('be.visible')
        .then(element => {
            let elementText = element.text()
            //bdd
            expect(elementText).to.contain('Hi!');
            //tdd
            assert.notEqual(elementText, 'Hi?')
        })
    })
})