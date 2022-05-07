context('pagintation testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(1440, 900)
    });
    it('page length', () => {
        cy.get('.list-group > .row')
            .should('have.length', 10)
    });
    it('page next button test', () => {
        cy.get('#cype_page_NextBtn').click()
        cy.get('.list-group > .row').should('have.length', 10)
        cy.get('.pagination li:nth-child(3)').should('have.class', 'active');
    });
});