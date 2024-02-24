type Data = {
    "baseline": string;
    "polarisation": string;
    "phases": number[];
}

type SpectralWindow = {
    "freq_min": number;
    "freq_max": number;
    "count": number;
}

type PhaseData = {
    "timestamp": string;
    "processing_block_id": string;
    "spectral_window": SpectralWindow;
    "phases": Data;
}

export default PhaseData;