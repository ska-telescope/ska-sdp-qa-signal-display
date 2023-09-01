## The following should be standard includes
# include core makefile targets for release management
include .make/base.mk
include .make/oci.mk

.PHONY: build run shell prod-build dev-run down logs

docs-pre-build:
	pip install -r docs/requirements.txt

dev-run:
	yarn start

build:
	docker build -t signal-display .

run:
	docker run \
		--name signal-display --rm \
		-e REACT_APP_SUBARRAY_REFRESH_SECONDS=5 \
		-e REACT_APP_USE_LOCAL_DATA=false \
		-p 80:80 -it \
		signal-display

down:
	-docker kill signal-display

logs:
	docker logs --follow signal-display
