context('Signal display', () => {

    beforeEach(() => {
        cy.visit("http://localhost:3333")
    })

    it('Verify expected diagrams are present and can be hidden', () => {
        cy.findByText("Signal Display").should("be.visible")
        cy.findByText("Statistics - Detailed").should("be.visible")
        cy.findByText("Statistics - Receiver").should("be.visible")
        cy.findByText("Spectrum Plot").should("be.visible")
        cy.findByText("Legend").should("be.visible")
        cy.findByText("Polarization XX").should("be.visible")
        cy.findByText("Polarization XY").should("be.visible")
        cy.findByText("Polarization YX").should("be.visible")
        cy.findByText("Polarization YY").should("be.visible")
        cy.findByText("Spectrograms").should("be.visible")

        cy.findAllByLabelText("Hide/Show Toggle").click({ multiple: true })
    })

    it('Verify external link to skao site', () => {
        cy.findByLabelText("skaWebsite").click()
    })

    it('Verify light/dark mode is available', () => {
        cy.findByTestId("Brightness7Icon").click()
    })
})