describe("API test", () => {
    it("Confirms the API getting data", () => {
        cy.visit("http://localhost:3000");
        cy.request("GET", "api/endpoint").as("data");
        cy.get("@data").should((response) => {
            expect(response.status).to.eq(200);
            expect(response).to.have.property("headers");
            expect(response).to.have.property("duration");

        });
    });
    it("Confirms the API loader more than 20 fields", () => {
        cy.visit("http://localhost:3000");
        cy.request("GET", "api/endpoint").as("data");
        cy.get("@data").should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.result.auditLog).length.be.gte(20);
        });
    });
});