//Link to FakeStoreAPI https://github.com/keikaavousi/fake-store-api
let userToken;

describe('FakeStoreAPI Test Suite', () => {

    it('Get all product titles', () => {
        cy.request('GET', 'https://fakestoreapi.com/products')
            .then((res) => {
                (res.body).forEach(bodyEle => {
                    cy.log('Product title is: ' + bodyEle.title);
                });
            })
    });

    it('Add new product', () => {
        cy.fixture('fakeStoreAPINewProduct.json').then((requestbody) => {
            cy.request({
                method: 'POST',
                url: 'https://fakestoreapi.com/products',
                body: JSON.stringify(requestbody)
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.eq(21);
            })
        })

    });

    it('Get specific product information', () => {
        cy.request('GET', 'https://fakestoreapi.com/products/1')
            .then((res) => {
                expect(res.body.title).to.equal("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
            })
    });

    it('Sort list of products using query parameter', () => {
        cy.request(
            {
                method: 'GET',
                url: 'https://fakestoreapi.com/products',
                qs: {
                    limit: 3,
                    sort: 'asc'
                }
            })
            .then((res) => {
                (res.body).forEach(bodyEle => {
                    cy.log('Product title is: ' + bodyEle.title);
                });
            })
    });

    it('Find number of products', () => {
        cy.request('GET', 'https://fakestoreapi.com/products')
            .then((res) => {
                cy.log('Number of products is: ' + res.body.length);
            })
    });

    it('All products have product description', () => {
        cy.request('GET', 'https://fakestoreapi.com/products')
            .then((res) => {
                res.body.forEach((product) => {
                    expect(product.description)
                        .to.not.equal("");
                })
            })
    });

    it('User Token', () => {
        cy.fixture('fakeStoreAPIUser1.json').then(data=> {
            cy.request({
                method: 'POST',
                url: 'https://fakestoreapi.com/auth/login',
                body: data
            }).then((response) => {
                userToken = response.body.token;
            })
        })
    })
});