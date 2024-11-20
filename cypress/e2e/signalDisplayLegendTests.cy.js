context('Signal display', () => {

    beforeEach(() => {
        cy.visit("http://localhost:3333");
    })

    it('Verify expected legend is usable', () => {
        cy.wait(5000);
        cy.findAllByTestId("sectionHeader").contains("Legend").should("be.visible");
        cy.findAllByTestId("signalCardId").each(($ele) => {
            cy.wrap($ele).then(($card) => {
                if($card.find("[data-testid='VisibilityOffIcon']").length){
                    cy.wrap($card).find("[data-testid='VisibilityOffIcon']").click();
                }
            });
        });
        cy.findAllByTestId("legendGroupingId").click({ multiple: true });
        cy.findAllByTestId("noChartData1Card").should("be.visible");
        cy.findAllByTestId("noChartData2Card").should("be.visible");
        cy.findAllByTestId("legendKey").should("be.visible");
    })
})