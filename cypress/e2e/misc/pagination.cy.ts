describe('Pagination', () => {
    it('Navigate through all pages', () => {
        let numOfPages = 0;
        cy.visit('https://esimakin.github.io/twbs-pagination/');
    
        // Find total number of pages
        cy.get('#pagination-demo > li.page-item.last > a').click();
        cy.get('#pagination-demo > li.page-item.active').then((el) => {
            numOfPages = parseInt(el.text());
            cy.log("Number of pages " + numOfPages);
    
            // Go back to first page
            cy.get('#pagination-demo > li.page-item.first a').click();
    
            // Iterate through each page
            for (let pageCounter = 1; pageCounter <= numOfPages; pageCounter++) {
                cy.get('#pagination-demo > li.page-item a').contains(pageCounter.toString()).click();
                cy.log(`Navigated to page ${pageCounter}`);
            }
        });
    });    
});