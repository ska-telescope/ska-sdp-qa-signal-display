/* eslint-disable @typescript-eslint/no-unused-vars */

// Two time samples of mock phase data

const mockPhaseData = [
    {    
        topic: "phase",
        timestamp: "2021-08-18 12:00:00.000000",
        body: {
            baseline: [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [2, 2]],
            polarisation: [["X", "X"], ["X", "Y"], ["Y", "X"], ["Y", "Y"]],
            frequency: [1.0e8, 1.1e8, 1.2e8, 1.3e8, 1.4e8, 1.5e8, 1.6e8, 1.7e8, 1.8e8, 1.9e8, 2.0e8],
            phase: [
                [
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                ],
                [
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                ],
                [
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                ],
                [
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                ],
                [
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                ],
                [
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 36.0, 72.0, 108.0, 144.0, 180.0, -144.0, -108.0, -72.0, -36.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                ],
            ],
        },
    
    },
    {
        topic: "phase",
        timestamp: "2021-08-18 12:00:01.000000",
        body: {
            baseline: [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [2, 2]],
            polarisation: [["X", "X"], ["X", "Y"], ["Y", "X"], ["Y", "Y"]],
            frequency: [1.0e8, 1.1e8, 1.2e8, 1.3e8, 1.4e8, 1.5e8, 1.6e8, 1.7e8, 1.8e8, 1.9e8, 2.0e8],
            phase: [
                [
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                ],
                [
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                ],
                [
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                ],
                [
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                ],
                [
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                ],
                [
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, -36.0, -72.0, -108.0, -144.0, 180.0, 144.0, 108.0, 72.0, 36.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                ],
            ],
        },    
    },
];

export default mockPhaseData;