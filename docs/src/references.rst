References
==========

- Using React [MUI](https://mui.com)

Project Structure
-----------------

```
├── __test__
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   ├── locales                         /* Language resources for supported languages ( en is the default ) */
│       └── en
│           └── translations.json
│   └── static
│       └── ****                        /* Static Images */
├── src
│   ├── App
│   │   ├── App.test.tsx
│   │   └── App.tsx
│   ├── components                      /* Contains all components, below is just one as a sample */
│   │   ├── spectrumPlot
│   │   │   ├── spectrumPlot.test.tsx
│   │   │   └── spectrumPlot.tsx
│   ├── index.scss                      /* Styling for the D3 charting ONLY */
│   ├── index.tsx
│   ├── mockData                        /* Mock Data for testing */
│   ├── models                          /* different data models */
│   ├── services
│   │   └── i18n                        /* Internationalization */
│   │   └── redux-telescope             /* Local Storage and types for telescope, Not to be accessed directly */
│   │   └── redux-theme                 /* Local Storage and types for theme, Not to be accessed directly */
│   │   └── redux-user                  /* Local Storage and types for user, Not to be accessed directly */
│   │   └── stateStorage                /* Provides access for the application to all redux-xxxx services */
│   │   └── theme                       /* Material-UI Theme */
│   ├── types
│   └── utils
└── ****
```

[1] The package.json files lists all the packages and libraries used in this project.

[2] To our knowledge, none of the packages or libraries used in this project require any license. Please let us know if any package or component require license or acknowledgement.

# Using mocked data so that links to API & Generator is not required locally.

This is achieved by changing the setting of REACT_USE_LOCAL_DATA within the webpack.config to 'true'
It is important to ensure that this is set to false for production

# Link to Running Instance

[Click here](https://sdhp.stfc.skao.int/dp-naledi/qa/display/) to access a running instance of the Signal Display
