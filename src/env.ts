/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    env: any;
  }
}

type EnvType = {
  REACT_APP_WS_API: string;
  REACT_APP_DATA_API_URL: string;
  REACT_APP_SUBARRAY_REFRESH_SECONDS: number;
  REACT_APP_SUBARRAY_REFRESH_SECONDS_FAST: number;
  REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS: number;
  REACT_APP_USE_LOCAL_DATA: boolean;
  REACT_APP_USE_MISSING_DATA_MASK: boolean;
};
export const env: EnvType = {
  ...process.env,
  ...window.env,
  ...(typeof Cypress !== 'undefined' ? Cypress.env() : {})
};
