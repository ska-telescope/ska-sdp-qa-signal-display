## The following should be standard includes
# include core makefile targets for release management
include .make/base.mk
include .make/oci.mk

.PHONY: build run shell prod-build dev-run down logs

docs-pre-build:
	pip install -r docs/requirements.txt

prod-build:
	yarn webpack build \
		--optimization-concatenate-modules \
		--mode production \
		--optimization-minimize \
		--output-clean \
		--output-path /dist/

dev-run:
	yarn start

build:
	docker build -t signal-display .

run:
	docker run \
		--name signal-display --rm \
		-p 80:80 -it \
		signal-display bash

down:
	-docker kill signal-display

logs:
	docker logs --follow signal-display
