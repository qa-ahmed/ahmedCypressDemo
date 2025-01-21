describe('Webtable Test Suite', () => {
    before('Open application, login and navigate to customer table', () => {
        cy.visit('https://demo.opencart.com/admin/');
        cy.get('#form-login > div.text-end > button')
            .click();
        cy.get('#menu-customer > a')
            .click();
        cy.get('#collapse-5 > li:nth-child(1) > a')
            .click();
    });

    it('Count columns and customers', () => {
        //count number of customers displayed on page
        cy.get('table > tbody > tr')
            .should('have.length', 10);

        //count number of columns
        cy.get('table > thead > tr > td')
            .should('have.length', 6);
    });

    it('Log data from specific row', () => {
        cy.get('table > tbody > tr')
            .first()
            .contains('!121@gmail.com');

    });

    it('Log data from all rows', () => {
        cy.get('table > tbody > tr')
            .each(($row) => {
                cy.wrap($row).within(() => {
                    cy.get('td').each(($col)=> {
                        cy.log($col.text());
                    })
                })
            })
    });
});