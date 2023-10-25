Developing the Display
======================

For developing this display locally you need to have a working `NodeJS`_ environment. You will also
need to install `yarn`_ on your machine.

To get a development instance running, do the following on your system:

#. Install the dependencies the dependencies with ``yarn install --frozen-lockfile``
#. (Optional) set the system to use local data by updating the ``.env`` file, and setting
   ``REACT_APP_USE_LOCAL_DATA='true'``, remember not to commit this change.
#. Run the app in development mode: ``yarn dev``
#. You can now open the app in your browser from `localhost`_.

To use actual data refer to the `Signal API documentation`_.

.. _NodeJS: https://nodejs.org/en
.. _localhost: http://localhost:3333
.. _yarn: https://yarnpkg.com/
.. _Signal API documentation: https://developer.skao.int/projects/ska-sdp-qa-data-api/en/latest/
