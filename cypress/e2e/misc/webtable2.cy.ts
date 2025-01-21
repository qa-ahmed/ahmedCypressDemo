describe('Webtable Test Suite', () => {
    before('Open application, login and navigate to customer table', () => {
        cy.visit('https://www.w3schools.com/html/html_tables.asp');

    });

    it('Get Data from WebTable by Company Name', () => {
        cy.get('table.ws-table-all#customers')
            .find('tr')
            .each(($row, index, $rows) => {
                //the first row doen't contain any td aka data
                if (index > 0) {
                    cy.wrap($row)
                        .find('td')
                        .eq(0)
                        .then(($company) => {
                            if ($company.text().includes('Ernst Handel')) {
                                cy.wrap($row)
                                    .find('td')
                                    .each(($col) => {
                                        cy.log($col.text());
                                    });
                            }
                        });
                }
            });
    });
});