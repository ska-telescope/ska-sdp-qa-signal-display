Developing the Display
======================

To develop this display locally you need to set up a `NodeJS`_ environment and install `yarn`_ on your machine.

To get a development instance running, do the following:

#. Install the dependencies with ``yarn install --frozen-lockfile``
#. (Optional) set the system to use local data by updating the ``env_scripts/env_config`` file, and setting
   ``REACT_APP_USE_LOCAL_DATA:boolean:true``, remember not to commit this change.
#. Run the app in development mode using ``yarn dev``. This will automatically open the app in your browser at `localhost`_.
#. To kill the environment, ``ctrl-c``.

To use actual data refer to the `Signal API documentation`_.

.. _NodeJS: https://nodejs.org/en
.. _localhost: http://localhost:3333
.. _yarn: https://yarnpkg.com/
.. _Signal API documentation: https://developer.skao.int/projects/ska-sdp-qa-data-api/en/latest/
