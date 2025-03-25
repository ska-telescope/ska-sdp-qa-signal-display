Project Structure
=================

The Main configuration is available in the root of the project.


Directory Structure
-------------------

::

    ├── cypress            < Cypress Tests
    ├── docs               < Repo Documentation
    ├── public             < Files required to be in public dir
    │   ├── locales        < Locale Translations
    │   ├── static         < Static files
    ├── resources          < Git Hooks
    ├── src                < Main source code
    │   ├── components     < Components in the Display
    │   ├── mockData       < Data used for local testing
    │   ├── services       < Shared service files
    │   ├── utils          < Utility helpers


Configuration
-------------

Configuration is done in a few different files depending on what needs to be configured.


::

  ├── docs
  │   └── src
  │       └── conf.py                 < Documentation configuration
  ├── env_scripts                     < Script to generate config from env variables
  ├── public                          
  │   ├── locales
  │   │   └── en
  │   │       └── signalDisplay.json  < Translation configuration
  │   ├── index.html                  < Main HTML page
  │   ├── manifest.json               < React Manifest
  │   └── robots.txt                  < Robot configuration
  ├── resources                       < Git hooks
  │   └── git-hooks
  │       └── pre-commit              < Auto styling
  ├── src
  │   ├── mockData                    < Mock data for the various endpoints
  │   │   ├── Statistics
  │   │   │   ├── processingBlock.ts
  │   │   │   └── receiverEvents.ts
  │   │   └── WebSocket
  │   │       ├── phase.json
  │   │       └── spectrum.json
  │   │   └── tel-model
  │   └── env.ts                      < Environment Variable Config
  ├── babel.config.js
  ├── .babelrc
  ├── bumpver.toml
  ├── CODEOWNERS                      < Who can write to the code
  ├── cypress.config.js
  ├── cypress.d.ts
  ├── Dockerfile                      < The build script for the Docker image
  ├── .env                            < The environment variables to use
  ├── .eslintignore
  ├── .eslintrc.js
  ├── .gitattributes
  ├── .gitlab-ci.yml                  < GitLab CI config
  ├── jest.config.ts
  ├── LICENSE
  ├── Makefile
  ├── .npmrc
  ├── .nycrc
  ├── package.json
  ├── poetry.lock                     < Poetry config for documentation
  ├── prettier.config.js
  ├── .prettierignore
  ├── .prettierrc
  ├── pyproject.toml                  < Poetry config for documentation
  ├── README.md
  ├── .readthedocs.yaml               < RTD CI config
  ├── .release                        < The version details
  ├── tsconfig.json
  ├── webpack.config.js
  └── yarn.lock

