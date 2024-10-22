# Changelog

## Current Development

- [Changed] Updated the @ska-telescope/ska-gui-components to ^2.0.16 and @ska-telescope/ska-gui-local-storage to ^2.0.0.
- [Changed] Updated the typescript and webpack configuration to include paths to commonly used internal components.
- [Added] added a run_get_local_env function in the end_config.sh to load .env variables in development environments.
- [Changed] Moved the shell out of the App into its own component.
- [Changed] Updated the footer to include the Copyright Modal.
- [Added] Integrated the authentication with MS Entra into the application.

## 0.18.1

- [Change] Move Weight Distribution graphs to above waterfall plots
- [Fix] Change size of waterfall plots to show entire image
- [Fix] Correct a crash when receiving a null for processing block deployments
- [FIx] Correct the execution block status

## 0.18.0

- [fix] Repeated needless recreation of websockets has been fixed
- [NAL-1100] Addition of display changes based on configured metrics
- Addition of real and imaginary components to display
- Ability to switch between real time graphs, and waterfall plots
- Auto connect to sockets based on subarray configuration, and selected subarray
- Cleanup Subarray Configuration section, and resolve display bugs
- Add new graphs: UV Coverage, Band Averaged Cross Correlation Power
- Show indication of corrupted data
- New mask component
