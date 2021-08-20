.PHONY: help release-patch release-minor release-major

help: ## Show this help
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' ./Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build Docker images
	make -C producer-api build
	make -C display-api build
	make -C display-ui build

push: ## Push Docker images
	make -C producer-api push
	make -C display-api push
	make -C display-ui push

release-patch: ## Make patch release
	bumpver update --patch -n

release-minor: ## Make minor release
	bumpver update --minor -n

release-major: ## Make major release
	bumpver update --major -n
