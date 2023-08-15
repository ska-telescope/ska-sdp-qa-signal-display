function statisticsDetailed() {
    cy.findAllByTestId("sectionHeader").contains("Statistics - Detailed").should("be.visible")

    cy.findByTestId("timeDetails").contains("Time").should("be.visible");
    cy.findByTestId("timeDetails").contains("Last Refresh from API:").should("be.visible");
    cy.findByTestId("timeDetails").contains("Last Updated:").should("be.visible");
    cy.findByTestId("timeDetails").contains("Start:").should("be.visible");

    cy.findByTestId("statisticsDetails").contains("Statistics").should("be.visible");
    cy.findByTestId("statisticsDetails").contains("Ingestion Rate:").should("be.visible");
    cy.findByTestId("statisticsDetails").contains("Payloads Received:").should("be.visible");
    cy.findByTestId("statisticsDetails").contains("Visibility Receive Still Active:").should("be.visible");

    cy.findByTestId("workflowDetails").contains("Workflow").should("be.visible");
    cy.findByTestId("workflowDetails").contains("State").should("be.visible");
    cy.findByTestId("workflowDetails").contains("Scan ID:").should("be.visible");
    cy.findByTestId("workflowDetails").contains("Processing Block ID:").should("be.visible");
    cy.findByTestId("workflowDetails").contains("Executing Block ID:").should("be.visible");
    cy.findByTestId("workflowDetails").contains("SubArray:").should("be.visible");
    cy.findByTestId("workflowDetails").contains("Time Since Last Payload:").should("be.visible");
}

function statisticsReceiver() {
    cy.findAllByTestId("sectionHeader").contains("Statistics - Receiver").should("be.visible")

    cy.findByTestId("currentScanDetails").contains("State").should("be.visible");
    cy.findByTestId("currentScanDetails").contains("Current Scan ID:").should("be.visible");

    cy.findByTestId("heapDetails").contains("Number of Heaps:").should("be.visible");
    cy.findByTestId("heapDetails").contains("Number of Incomplete Heaps:").should("be.visible");
    
    cy.findByTestId("dataReceivedDetails").contains("Total Data Received:").should("be.visible");
    cy.findByTestId("dataReceivedDetails").contains("Current Speed:").should("be.visible");
    cy.findByTestId("dataReceivedDetails").contains("Duration of Current Transfer:").should("be.visible");
}

function settings() {
    cy.findAllByTestId("SettingsIcon").should("be.visible").click();
    cy.findAllByTestId("statisticsDetailedButtonTestId").should("be.visible").click();
    cy.findAllByTestId("statisticsReceiverButtonTestId").should("be.visible").click();
    cy.findAllByTestId("spectrumPlotXXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("spectrumPlotXYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("spectrumPlotYXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("spectrumPlotYYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("polarizationAmplitudeXXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("polarizationAmplitudeXYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("polarizationAmplitudeYXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("polarizationAmplitudeYYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("polarizationPhaseXXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("polarizationPhaseXYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("polarizationPhaseYXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("polarizationPhaseYYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("spectrogramsButtonTestId").should("be.visible").click();
}

context('Signal display', () => {

    beforeEach(() => {
        cy.visit("http://localhost:3333")
    })

    it('Verify external link to skao site', () => {
        cy.findByLabelText("skaWebsite").click()
    })

    it('Verify light/dark mode is available', () => {
        cy.findByTestId("Brightness7Icon").click()
        cy.findByTestId('Brightness4Icon').should("be.visible");
    })
    
    it('Verify expected diagrams are present and can be hidden', () => {
        cy.get('h4').contains('Signal Display').should("be.visible")
        cy.findAllByTestId("hideShowToggle").click({ multiple: true })

        cy.findByTestId("noSubArrayCard").should("be.visible");
        cy.findAllByTestId("status1Id").should("be.visible");

        statisticsDetailed();
        statisticsReceiver();

        cy.findAllByTestId("sectionHeader").contains("Spectrum Plot XX").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Spectrum Plot XY").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Spectrum Plot YX").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Spectrum Plot YY").should("be.visible")

        cy.findAllByTestId("sectionHeader").contains("Legend").should("be.visible")
        cy.findAllByTestId("VisibilityOffIcon").eq(2).click({ multiple: true, force: true })
        cy.findAllByTestId("legendGroupingId").click({ multiple: true })
        cy.findAllByTestId("noChartData1Card").should("be.visible")
        cy.findAllByTestId("noChartData2Card").should("be.visible")
        cy.findAllByTestId("legendKey").should("be.visible")

        cy.findAllByTestId("sectionHeader").contains("Polarization XX").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization XY").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization YX").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization YY").should("be.visible")
        cy.findAllByTestId('chartData1Content').should("be.visible");
        cy.findAllByTestId('chartData2Content').should("be.visible");

        cy.findAllByTestId("sectionHeader").contains("Spectrograms").should("be.visible")
        cy.findByTestId('spectrogram1Id').should("be.visible");
        cy.findByTestId('spectrogram2Id').should("be.visible");
        cy.findByTestId('spectrogram3Id').should("be.visible");
        cy.findByTestId('spectrogram4Id').should("be.visible");

        settings();
    })
})