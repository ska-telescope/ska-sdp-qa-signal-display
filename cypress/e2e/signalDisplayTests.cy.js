function statisticsDetailed() {
    cy.findByTestId("statDetailedSignalCardId").should("be.visible")
    cy.findByTestId("statDetailedSignalCardTitleId").contains("Statistics - Detailed").should("be.visible")
    cy.findByTestId("statDetailedHideShowToggle").click();

    /*
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
*/ 
}

function statisticsReceiver() {
    cy.findByTestId("statReceiverSignalCardId").should("be.visible")
    cy.findByTestId("statReceiverSignalCardTitleId").contains("Statistics - Receiver").should("be.visible")
    cy.findByTestId("statReceiverHideShowToggle").click();
    
/*
    cy.findByTestId("currentScanDetails").contains("State").should("be.visible");
    cy.findByTestId("currentScanDetails").contains("Current Scan ID:").should("be.visible");

    cy.findByTestId("heapDetails").contains("Number of Heaps:").should("be.visible");
    cy.findByTestId("heapDetails").contains("Number of Incomplete Heaps:").should("be.visible");
    
    cy.findByTestId("dataReceivedDetails").contains("Total Data Received:").should("be.visible");
    cy.findByTestId("dataReceivedDetails").contains("Current Speed:").should("be.visible");
    cy.findByTestId("dataReceivedDetails").contains("Duration of Current Transfer:").should("be.visible");
    */
}

function spectrumPlot(pole) {
    cy.findByTestId(`spectrumPlot${pole}SignalCardId`).should("be.visible")
    cy.findByTestId(`spectrumPlot${pole}SignalCardTitleId`).contains(`Spectrum Plot ${pole}`).should("be.visible")
    // cy.findByTestId(`spectrumPlot${pole}HideShowToggle`).click();
}

function legend() {
    cy.findByTestId(`legendSignalCardId`).should("be.visible")
    cy.findByTestId(`legendSignalCardTitleId`).contains(`Legend`).should("be.visible")
    cy.findByTestId(`legendHideShowToggle`).click();
    /*
    cy.findAllByTestId("legendGroupingId").click({ multiple: true })
    cy.findAllByTestId("noChartData1Card").should("be.visible")
    cy.findAllByTestId("noChartData2Card").should("be.visible")
    cy.findAllByTestId("legendKey").should("be.visible")
    */
}

function poleAmplitude(pole) {
    cy.findByTestId(`poleAmplitude${pole}SignalCardId`).should("be.visible")
    cy.findByTestId(`poleAmplitude${pole}SignalCardTitleId`).contains(`Polarization / Amplitude ${pole}`).should("be.visible")
    // cy.findByTestId(`poleAmplitude${pole}HideShowToggle`).click();
    // cy.findAllByTestId(`poleAmplitude${pole}Content`).should("be.visible");
}

function polePhase(pole) {
    cy.findByTestId(`polePhase${pole}SignalCardId`).should("be.visible")
    cy.findByTestId(`polePhase${pole}SignalCardTitleId`).contains(`Polarization / Phase ${pole}`).should("be.visible")
    // cy.findByTestId(`polePhase${pole}HideShowToggle`).click();
    // cy.findAllByTestId(`polePhase${pole}Content`).should("be.visible");
}

function spectrograms() {
    cy.findByTestId(`spectrogramsSignalCardId`).should("be.visible")
    cy.findByTestId(`spectrogramsSignalCardTitleId`).contains(`Spectrograms`).should("be.visible")
    // cy.findByTestId(`spectrogramsHideShowToggle`).click();

    // cy.findByTestId('spectrogram1Id').should("be.visible");
    // cy.findByTestId('spectrogram2Id').should("be.visible");
    // cy.findByTestId('spectrogram3Id').should("be.visible");
    // cy.findByTestId('spectrogram4Id').should("be.visible");
}

function settings() {
    cy.findByTestId("status1Id").should("be.visible");
    cy.findByTestId("status2Id").should("be.visible");
    cy.findByTestId("status3Id").should("be.visible");
    cy.findByTestId("status4Id").should("be.visible");
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
}

context('Signal display', () => {

    beforeEach(() => {
        cy.visit("http://localhost:3333")
    })

    /*
    it('Header : Verify title and external link to skao site', () => {
        cy.findByTestId('headerTItleId').contains('Signal Display').should("be.visible");
        cy.findByTestId("skaoLogo").click();
    })

    it('Header : Verify light/dark mode is available', () => {
        cy.findByTestId("Brightness7Icon").click()
        cy.findByTestId('Brightness4Icon').should("be.visible");
        cy.findByTestId("Brightness4Icon").click()
        cy.findByTestId('Brightness7Icon').should("be.visible");
    })
    */

    it('Verify expected diagrams are present and can be hidden', () => {
        // cy.findByTestId("noSubArrayCard").should("be.visible");

        statisticsDetailed();
        statisticsReceiver();
        spectrumPlot('XX');
        spectrumPlot('XY');
        spectrumPlot('YX');
        spectrumPlot('YY');
        legend();
        poleAmplitude('XX');
        poleAmplitude('XY');
        poleAmplitude('YX');
        poleAmplitude('YY'); 
        polePhase('XX');
        polePhase('XY');
        polePhase('YX');
        polePhase('YY');
        spectrograms();
        settings();
    })
})