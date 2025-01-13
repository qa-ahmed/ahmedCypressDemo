class Login {

    //locators in instance variables
    userNameLocator = '[name="username"]';
    passwordLocator = '[name="password"]';
    submitButtonLocator = '[type="submit"]';
    assertLocator = '.oxd-test';

    //action methods
    setUsername(username: string) {
        cy.get(this.userNameLocator).type(username);
    }

    setUPassword(password: string) {
        cy.get(this.passwordLocator).type(password);
    }

    clickSubmit() {
        cy.get(this.submitButtonLocator)
            .click();
    }

    vrifyLogin() {
        cy.get(this.assertLocator)
            .should('be.visible');
    }
}

export default Login;