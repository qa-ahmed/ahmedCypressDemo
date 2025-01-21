describe('ReactShopping Test Suite', () => {

    before('Print Date', () => {
        const currentDate = new Date().toLocaleString();
        cy.writeFile('productList.txt', `Today's Date and Time: ' + ${currentDate}` + '\n', { flag: 'a+' })
    })

    beforeEach('Visit Homepage', () => {
        cy.visit(Cypress.env('reactshopping').link);
    })

    it('', () => {

    })

    it('Products that do not offer bulk price discounts', () => {
        cy.get('.sc-uhudcz-0 div:has(p:only-child) :is(div+p)')
            .each(product => {
                let productName = product.text();
                cy.writeFile('productList.txt', `Bulk savings are not offered on: ${productName}` + '\n', { flag: 'a+' });
            })
    })

    it('Title of Products that offer bulk price discounts', () => {
        cy.get('.sc-uhudcz-0 div:has(p~p) p:only-of-type') //alternative - div :has(p + p) div + p
            .each(product => {
                let productName = product.text();
                cy.writeFile('productList.txt', `Bulk savings are offered on: ${productName}` + '\n', { flag: 'a+' });
            })
    })
})