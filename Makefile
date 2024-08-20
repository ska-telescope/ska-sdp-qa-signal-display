## The following should be standard includes
# include core makefile targets for release management
include .make/base.mk
include .make/oci.mk

.PHONY: run docker-build docker-run docker-down docker-logs dev-setup dev-start dev-cypress

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
	docker run \
		--rm \
		--name signal-display-dev \
		-it \
		-p 3333:3333 \
		-v $(shell pwd):/data \
		--user 1000:1000 \
		-w /data \
		node:20.12.2 \
		yarn install --forzen-lockfile

dev-start:
	docker run \
		--rm \
		--name signal-display-dev \
		-it \
		-p 3333:3333 \
		-v $(shell pwd):/data \
		--user 1000:1000 \
		-w /data \
		node:20.12.2 \
		yarn start

dev-shell:
	docker run \
		--rm \
		-it \
		-v $(shell pwd):/data \
		--user 1000:1000 \
		-w /data \
		node:20.12.2 \
		bash

dev-cypress:
	docker run \
		--rm \
		--name signal-display-dev-cypress \
		-e REACT_APP_USE_LOCAL_DATA=true \
		-p 3333:3333 \
		-it \
		-v $(shell pwd):/data \
		-w /data \
		cypress/browsers:node-20.12.0-chrome-123.0.6312.86-1-ff-124.0.2-edge-123.0.2420.65-1 \
		bash

dev-local-env:
	-rm public/env.js src/env.ts
	ENV_TYPE_FILE=env_scripts/env_config \
	ENV_JS_OUTPUT_LOCATION=public/env.js \
		bash env_scripts/env_config.sh js
	ENV_TYPE_FILE=env_scripts/env_config \
	ENV_JS_OUTPUT_LOCATION=src/env.ts \
		bash env_scripts/env_config.sh ts