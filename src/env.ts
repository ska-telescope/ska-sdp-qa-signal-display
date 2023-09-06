declare global {
    interface Window {
      env: any
    }
  }
  
  type EnvType = {
    REACT_APP_WS_API: string,
    REACT_APP_DATA_API_URL: string,
    REACT_APP_SUBARRAY_REFRESH_SECONDS: string,
    REACT_APP_SUBARRAY_REFRESH_SECONDS_FAST: string,
    REACT_APP_WORKFLOW_INTERVAL_SECONDS: string,
    REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS: string,
    REACT_APP_DASHBOARD_URL_SUBDIRECTORY: string,
    REACT_APP_VERSION: string,
    REACT_APP_USE_LOCAL_DATA: string,
  }
  export const env: EnvType = { ...process.env, ...window.env }