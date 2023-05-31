## The following should be standard includes
# include core makefile targets for release management
include .make/base.mk
include .make/oci.mk

prod-build:
	yarn webpack build \
		--optimization-concatenate-modules \
		--mode production \
		--optimization-minimize \
		--output-clean \
		--output-path /dist/

dev-run:
	yarn start
