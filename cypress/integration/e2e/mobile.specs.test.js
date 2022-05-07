context('small media device test (using view IphoneXr )', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(414, 896)
    });
    it('toggle button visibility', () => {
        // cy.get('.searchToggle').is(':visible')
        cy.get(".searchToggle").then($button => {
            if ($button.is(':visible')) {
                cy.log('button exist in mobile')
            }
        })

    });
    it('filter Open', () => {
        cy.get('.searchToggle').click()
    });
    it('page next button test', () => {
        cy.get('#cype_page_NextBtn').click()
        cy.get('.list-group > .row').should('have.length', 10)
        cy.get('.pagination li:nth-child(3)').should('have.class', 'active');
    });

});