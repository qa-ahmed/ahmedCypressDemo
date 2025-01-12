import 'cypress-iframe';

describe('Page Interactions Test Suite', () => {

    it('Checkboxes', () => {
        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
        cy.get('#checkboxes input')
            .first()
            .check()
            .should('be.checked');

        cy.get('#checkboxes input[value="option-3"]')
            .uncheck()
            .should('not.be.checked');

    })

    it('Radio buttons', () => {
        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
        cy.get('.radio-buttons input[name="color"]')
            .last()
            .check()
            .should('be.checked');
    })

    it('Dropdowns', () => {
        cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
        cy.get('#dropdowm-menu-2')
            .select('Maven')
            .should('have.value', 'maven');
    })

    it('Alerts', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
        cy.get('#content > div > ul > li:nth-child(1) > button')
            .click();
        cy.window().then(win => {
            cy.stub(win, 'alert').returns("I'm a JS Alert");
        })
        cy.get('#result').should('have.text', 'You successfully clicked an alert');
    })

    it('Handle tabs', () => {
        //Approach 1
        cy.visit('https://the-internet.herokuapp.com/windows')
        cy.get('#content > div > a')
            .invoke('removeAttr', 'target')
            .click();

        cy.go("back");

        //Approach 2
        cy.get('#content > div > a')
            .then(el => {
                let linkTOTab = el.prop('href');
                cy.visit(linkTOTab)
            })
    })

    it.only('iFrames', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe');
        const iframe = cy.get('#mce_0_ifr')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap);
        iframe
            .type("Ahmed is good QA. Hire him!");

        cy.visit('https://the-internet.herokuapp.com/iframe');
        cy.frameLoaded('#mce_0_ifr')
        cy.iframe('#mce_0_ifr')
            .type("Hi!");

        
    })

    it('', () => {

    })

    it('', () => {

    })
})