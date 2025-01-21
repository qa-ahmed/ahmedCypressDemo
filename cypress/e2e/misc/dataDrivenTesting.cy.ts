
describe('Data Driven Test Suite', () => {
    let usersData;

    before(() => {
        cy.fixture('orangehrm').then((jsonData) => {
            usersData = jsonData.users;
        })
    });

    beforeEach(() => {
        cy.clearAllCookies();
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    });

    it('Specific Data Test', () => {
        cy.get('[name="username"]').type(usersData[0].username);
        cy.get('[name="password"]').type(usersData[0].password);
        cy.get('[type="submit"]').click();
    });

    it('Data Driven Test', () => {
        (usersData).forEach(user => {
            cy.get('[name="username"]').type(user.username);
            cy.get('[name="password"]').type(user.password);
            cy.get('[type="submit"]').click();

            //log out after successful login
            if (user.password === "admin123") {
                cy.get('.oxd-userdropdown-tab')
                    .click({ force: true })

                cy.byLinkText('Logout')
                    .click();
            }
        });

    });
});