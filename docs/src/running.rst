Running the Display
===================

The display can be run in 3 different methods.

Development Version
-------------------

Refer to :doc:`local_development` for more information on running a local or development version.

Docker
------

There is a ``Dockerfile`` available to use. And to make this easier there are some helper
``Makefile`` commands.

#. To build run ``make build``
#. To run use ``make run``
#. And to bring it down again run ``make down``

Refer to the ``Makefile`` as to what the above commands do.

Kubernetes
----------

The Signal Display is part of the `QA Metrics Helm chart`_, so refer there to check usage.

.. _QA Metrics Helm chart: https://developer.skao.int/projects/ska-sdp-qa-data-api/en/latest/helm/overview.html
