function statisticsDetailed() {
    cy.findAllByTestId("sectionHeader").contains("Statistics - Detailed").should("be.visible");

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
    cy.findAllByTestId("sectionHeader").contains("Statistics - Receiver").should("be.visible");

    cy.findByTestId("currentScanDetails").contains("State").should("be.visible");
    cy.findByTestId("currentScanDetails").contains("Current Scan ID:").should("be.visible");

    cy.findByTestId("heapDetails").contains("Number of Heaps:").should("be.visible");
    cy.findByTestId("heapDetails").contains("Number of Incomplete Heaps:").should("be.visible");

    cy.findByTestId("dataReceivedDetails").contains("Total Data Received:").should("be.visible");
    cy.findByTestId("dataReceivedDetails").contains("Current Speed:").should("be.visible");
    cy.findByTestId("dataReceivedDetails").contains("Duration of Current Transfer:").should("be.visible");
}

function runningConfiguration() {
    cy.findByTestId("subarray_configured_nodesLabel").contains("1").should('be.visible');
    cy.findByTestId("subarray_receptorsLabel").contains("C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18, C19, C20, C21, C22, C23, C24, C25, C26, C27, C28, C29, C30").should('be.visible');

    cy.findByTestId("eb_statusLabel").contains("ACTIVE").should('be.visible');
    cy.findByTestId("eb_scan_typeLabel").contains("science").should('be.visible');

    cy.findByTestId("pb_statusLabel").contains("READY").should('be.visible');
    cy.findByTestId("pb_status_last_updateLabel").contains("2024-07-16 07:08:32").should('be.visible');
    cy.findByTestId("pb_resources_availableLabel").contains("yes").should('be.visible');
    cy.findByTestId("pb_deployments_readyLabel").contains("yes").should('be.visible');
    cy.findByTestId("pb_deploymentsLabel").contains("proc-pb-testrealtime-20240716-65504-vis-receive => RUNNING").should('be.visible');
    cy.findByTestId("pb_scriptLabel").contains("realtime/vis-receive/4.0.0").should('be.visible');
    cy.findByTestId("pb_processorsLabel").contains("mswriter").should('be.visible');
    cy.findByTestId("pb_processors_deployedLabel").contains("mswriter-processor: 2.0.2, Signal Display Metrics [stats,spectrum,spectrograms,lagplot,amplitude,phase,bandaveragedxcorr,uvcoverage]: 0.20.0").should('be.visible');

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
    cy.findAllByTestId("showBandAvXCorrXXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showBandAvXCorrXYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showBandAvXCorrYXButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showBandAvXCorrYYButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showSpectrogramsButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showLagPlotsButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showCrossElevationOffsetButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showElevationOffsetButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showHBeamWidthsButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showVBeamWidthsButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showToleranceVHWidthsButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showFittedHeightButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showGainCalibrationAmplitudeHButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showGainCalibrationAmplitudeVButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showGainCalibrationPhaseHButtonTestId").should("be.visible").click();
    cy.findAllByTestId("showGainCalibrationPhaseVButtonTestId").should("be.visible").click();
}

context('Signal display', () => {

    beforeEach(() => {
        cy.visit("http://localhost:3333");
    })

    it('Verify external link to skao site', () => {
        cy.findByLabelText("skaWebsite").click();
    })

    it('Verify light/dark mode is available', () => {
        cy.findByTestId("Brightness7Icon").click();
        cy.findByTestId('Brightness4Icon').should("be.visible");
    })

    it('Verify expected diagrams are present and can be hidden', () => {
        cy.findAllByTestId("hideShowToggle").click({ multiple: true });

        // Removed because display now defaults to one subarray
        // cy.findByTestId("noSubArrayCard").should("be.visible");
        cy.findAllByTestId("status1Id").should("be.visible");

        statisticsDetailed();
        statisticsReceiver();
        runningConfiguration();

        cy.findAllByTestId("sectionHeader").contains("High-Resolution Windows").should("be.visible");


        cy.findAllByTestId("sectionHeader").contains("Spectrum XX").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Spectrum XY").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Spectrum YX").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Spectrum YY").should("be.visible");

        cy.findAllByTestId("sectionHeader").contains("Polarization / Amplitude XX").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Polarization / Amplitude XY").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Polarization / Amplitude YX").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Polarization / Amplitude YY").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Polarization / Phase XX").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Polarization / Phase XY").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Polarization / Phase YX").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Polarization / Phase YY").should("be.visible");
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

        cy.findByTestId("calibrationPlotsTab").click();

        cy.findAllByTestId("sectionHeader").contains("Cross Elevation Offset").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Elevation Offset").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Expected and Fitted H Beam Widths").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Expected and Fitted V Beam Widths").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("Fitted Height").should("be.visible");

        cy.findAllByTestId("sectionHeader").contains("H Amplitude").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("V Amplitude").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("H Phase").should("be.visible");
        cy.findAllByTestId("sectionHeader").contains("V Phase").should("be.visible");

        cy.findAllByTestId('visibilitiesTab').click();


        settings();
    })

    it("Verify modals operate as expected", () => {
        cy.findAllByTestId('test-info-modal').should("be.visible").click({ multiple: true , force: true });
    })
})