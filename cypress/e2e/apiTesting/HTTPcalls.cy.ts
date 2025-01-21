describe('HTTP calls', () => {
    it('GET Call', () => {
        cy.request('GET', 'https://restful-booker.herokuapp.com/booking')
            .its('status')
            .should('equal', 200)
    });

    it('POST Call', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                firstname: "Jim",
                lastname: "Brown",
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: "2018-01-01",
                    checkout: "2019-01-01"
                },
                additionalneeds: "Breakfast"
            }
        }).its('status')
            .should('equal', 200);
    });

    it('PUT Call', () => {
        cy.request({
            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body: {
                title: "Post - Updated",
                body: "This is the body",
                userId: 1,
                id: 1
            }
        }).its('status')
            .should('equal', 200);
    });

    it('Delete Call', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
        }).its('status')
            .should('equal', 200);
    });
});