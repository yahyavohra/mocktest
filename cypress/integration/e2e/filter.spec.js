context('Filter test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(1440, 900)
    });

    it('SLug Updated', () => {
        cy.get('select#cype_actiontype').select('DARI_REFRESH_TOKEN').should('have.value', 'DARI_REFRESH_TOKEN')
        cy.get('#cype_filter_btn').click()
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?actionType=DARI_REFRESH_TOKEN')
        })
    });
    it('Content Updated as per filteration', () => {
        cy.get('select#cype_actiontype').select('DARI_REFRESH_TOKEN').should('have.value', 'DARI_REFRESH_TOKEN')
        cy.get('#cype_filter_btn').click()
        cy.get('.list-group > .row')
            .should('have.length', 8)
            .each(($el, index, $list) => {
                // $el is a wrapped jQuery element
                if (index > 0) {
                    cy.get('.list-group > .row:nth-child(' + index + ') > .cyp_field_key')
                        .first()
                        .should('have.text', 'Dari refresh token')
                }

            })
    });
    it('Content Updated as per multi filteration', () => {
        cy.get('select#cype_actiontype').select('INITIATE_APPLICATION').should('have.value', 'INITIATE_APPLICATION')
        cy.get('select#cype_applicationType').select('LEASE_CLOSURE').should('have.value', 'LEASE_CLOSURE')
        cy.get('#cype_filter_btn').click()
    });

});