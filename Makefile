## The following should be standard includes
# include core makefile targets for release management
-include .make/base.mk

build:  ## Build local system
	docker-compose build

up:  ## Bring up local system
	docker-compose up -d

down:  ## Take down local system
	docker-compose down
