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
		-p 80:80 -d \
		signal-display

down:
	-docker kill signal-display

logs:
	docker logs --follow signal-display
