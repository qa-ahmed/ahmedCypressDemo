describe('flu t', () => {

   it('IR', () => {
      cy.visit('http://ir.fluenceenergy.com/');
   })

   it('IR2', () => {
      cy.request('https://google.com/');
   })

})