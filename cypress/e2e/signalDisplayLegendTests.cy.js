context('Signal display', () => {

    beforeEach(() => {
        cy.visit("http://localhost:3333");
    })

    it('Verify expected legend is usable', () => {
        cy.wait(5000);
        cy.findAllByTestId("sectionHeader").contains("Legend").should("be.visible");
        cy.findAllByTestId("VisibilityOffIcon").eq(5).click({ multiple: true, force: true }); // counts from 0
        cy.findAllByTestId("legendGroupingId").click({ multiple: true });
        cy.findAllByTestId("noChartData1Card").should("be.visible");
        cy.findAllByTestId("noChartData2Card").should("be.visible");
        cy.findAllByTestId("legendKey").should("be.visible");
    })
})