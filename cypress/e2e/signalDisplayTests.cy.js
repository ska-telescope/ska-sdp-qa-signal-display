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
    cy.findByTestId("SettingsIcon").should("be.visible").click();
    cy.findAllByTestId("showStatisticsDetailedButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showStatisticsReceiverButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showSpectrumPlotXXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showSpectrumPlotXYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showSpectrumPlotYXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showSpectrumPlotYYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showPolarizationAmplitudeXXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showPolarizationAmplitudeXYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showPolarizationAmplitudeYXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showPolarizationAmplitudeYYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showPolarizationPhaseXXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showPolarizationPhaseXYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showPolarizationPhaseYXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showPolarizationPhaseYYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showSpectrogramsButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showLagPlotsButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showCrossElevationOffsetButtonTestId").should("be.visible").click()
    cy.findAllByTestId("showElevationOffsetButtonTestId").should("be.visible").click()
    cy.findAllByTestId("showHBeamWidthsButtonTestId").should("be.visible").click()
    cy.findAllByTestId("showVBeamWidthsButtonTestId").should("be.visible").click()
    cy.findAllByTestId("showToleranceVHWidthsButtonTestId").should("be.visible").click()
    cy.findAllByTestId("showFittedHeightButtonTestId").should("be.visible").click()
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
        cy.findAllByTestId("VisibilityOffIcon").eq(3).click({ multiple: true, force: true })
        cy.findAllByTestId("legendGroupingId").click({ multiple: true })
        cy.findAllByTestId("noChartData1Card").should("be.visible")
        cy.findAllByTestId("noChartData2Card").should("be.visible")
        cy.findAllByTestId("legendKey").should("be.visible")

        cy.findAllByTestId("sectionHeader").contains("Polarization / Amplitude XX").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization / Amplitude XY").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization / Amplitude YX").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization / Amplitude YY").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization / Phase XX").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization / Phase XY").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization / Phase YX").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Polarization / Phase YY").should("be.visible")
        cy.findAllByTestId('chartData1Content').should("be.visible");
        cy.findAllByTestId('chartData2Content').should("be.visible");

        cy.findAllByTestId("sectionHeader").contains("Spectrograms").should("be.visible")
        cy.findByTestId('spectrogram1Id').should("be.visible");
        cy.findByTestId('spectrogram2Id').should("be.visible");
        cy.findByTestId('spectrogram3Id').should("be.visible");
        cy.findByTestId('spectrogram4Id').should("be.visible");

        cy.findAllByTestId("sectionHeader").contains("Lag Plots").should("be.visible")
        cy.findByTestId('LagPlot1Id').should("be.visible");
        cy.findByTestId('LagPlot2Id').should("be.visible");
        cy.findByTestId('LagPlot3Id').should("be.visible");
        cy.findByTestId('LagPlot4Id').should("be.visible");

        cy.findByTestId("calibrationPlotsTab").click()

        cy.findAllByTestId("sectionHeader").contains("Cross Elevation Offset").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Elevation Offset").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Expected and Fitted H Beam Widths").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Expected and Fitted V Beam Widths").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Tolerance on H and V fitted Beam Widths").should("be.visible")
        cy.findAllByTestId("sectionHeader").contains("Fitted Height").should("be.visible")

        cy.findAllByTestId('visibilitiesTab').click()

        settings();
    })

    it("Verify modals operate as expected", () => {
        cy.findAllByTestId('test-info-modal').should("be.visible").click({ multiple: true , force: true })
    })
})