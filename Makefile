## The following should be standard includes
# include core makefile targets for release management
include .make/base.mk
include .make/oci.mk

.PHONY: build run shell prod-build dev-run down logs

run:
	yarn start

docker-build:
	docker build -t signal-display .

docker-run:
	docker run \
		--name signal-display --rm \
		-p 80:80 -d \
		signal-display

docker-down:
	-docker kill signal-display

docker-logs:
	docker logs --follow signal-display

dev-setup:
	docker run -it -p 3333:3333 -v $(shell pwd):/data -w /data node:20.12.2 yarn install --forzen-lockfile

dev-start:
	docker run -it -p 3333:3333 -v $(shell pwd):/data -w /data node:20.12.2 yarn start
