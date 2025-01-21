describe('Intercept Requests', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginAttempt')
    });

    it('Intercept Login', () => {
        cy.get('[name="username"]').type('test');
        cy.get('[name="password"]').type('test1234');
        cy.get('[type="submit"]').click();
        cy.wait('@loginAttempt')
        .its('response').then(response => {
            expect(response.statusCode).to.equal(302);
        })


    });
});