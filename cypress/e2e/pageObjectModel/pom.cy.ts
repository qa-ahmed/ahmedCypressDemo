import Login from "../../pageObjects/LoginPage";

let login = new Login(); //create object of Login class

describe('Page Object Model Test Suite', () => {
    before(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it.skip('Login Using POM - Hardcoded Testdata', () => {
        login.setUsername('Admin');
        login.setUPassword('admin123');
        login.clickSubmit();
    });

    it('Login Using POM - Fixture Testdata', () => {
        cy.fixture('orangehrm').then(data => {
            login.setUsername(data.users[0].username);
            login.setUPassword(data.users[0].password);
            login.clickSubmit();
        })
    });

});