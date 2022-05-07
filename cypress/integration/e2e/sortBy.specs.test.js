context('Sorting Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(1440, 900)
    });

    it('SLug Updated', () => {
        cy.get('#cype_sort_test').click()
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?sortby=creationTimestamp')
        })
    });
    it('Content Updated after sorted', () => {
        cy.get('#cype_sort_test').click()
        cy.get('#cype_sort_test > a ').should('have.class', 'active');
        cy.get('.list-group > .row')
            .its('length').should('be.gte', 2)
        // .each(($el, index, $list) => {
        //     // $el is a wrapped jQuery element
        //     if (index > 0) {
        //         cy.get('.list-group > .row:nth-child(' + index + ') > .cype_filed_key2')
        //             .first()
        //             .should('have.text', 'Dari refresh token')
        //     }

        // })
    });

});