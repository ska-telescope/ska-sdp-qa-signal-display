## The following should be standard includes
# include core makefile targets for release management
include .make/base.mk
include .make/oci.mk

.PHONY: build run shell prod-build dev-run down logs

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

dev-setup:
	docker run -it -p 3333:3333 -v $(shell pwd):/data -w /data node:18.12.0 yarn install --forzen-lockfile

dev-run:
	docker run -it -p 3333:3333 -v $(shell pwd):/data -w /data node:18.12.0 yarn start
