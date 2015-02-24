NODE_BINARIES=./node_modules/.bin
DIST_FOLDER=./dist
SRC_FOLDER=./src
TESTS_FOLDER=./tests
META_LICENSE=`node -e "console.log(require('bower.json').license)"`
META_VERSION=`node -e "console.log(require('bower.json').version)"`
SRC_FILE=./src/index.js
DIST_FILE=./dist/couch-potato.js
COMPRESSED_FILE=./dist/couch-potato.min.js

lint:
	@$(NODE_BINARIES)/jshint $(SRC_FOLDER) --reporter ./node_modules/jshint-stylish/stylish.js

test:
	@$(NODE_BINARIES)/mocha $(TESTS_FOLDER)

meta:
	@sed -e "s/{license}/$(META_LICENSE)/g" -e "s/{version}/$(META_VERSION)/g" < $(SRC_FILE) > $(DIST_FILE)

concat:
	@find $(SRC_FOLDER) -type f -name "*.js" | xargs cat > $(DIST_FILE)

minify:
	@$(NODE_BINARIES)/uglifyjs $(DIST_FILE) -o $(COMPRESSED_FILE)

cleanup:
	@rm -rf $(DIST_FOLDER)/*

build: concat meta minify

.PHONY: build
