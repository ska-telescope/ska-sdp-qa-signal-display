/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    env: any;
  }
}

type EnvType = {
  REACT_APP_WS_API: string;
  REACT_APP_DATA_API_URL: string;
  REACT_APP_SUBARRAY_REFRESH_SECONDS: int;
  REACT_APP_SUBARRAY_REFRESH_SECONDS_FAST: int;
  REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS: int;
  REACT_APP_USE_LOCAL_DATA: bool;
  REACT_APP_USE_MISSING_DATA_MASK: bool;
};
export const env: EnvType = {
  ...process.env,
  ...window.env,
  ...(typeof Cypress !== 'undefined' ? Cypress.env() : {})
};
