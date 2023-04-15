VERSION=$(shell grep '\"version\":' package.json | sed -e 's/.*: \"\([^"]*\)".*/\1/')

# test: build
# 	npm test --noStackTrace
# .PHONY: test

#node_modules:
#	npm install

schemas/csl-style-schema.json: src/style.ts
	# npm install -g typescript-json-schema
	npx typescript-json-schema --required --noExtraProps $< Style -o $@

src/version.ts: package.json
	grep '^ *"version":' $< | \
	  sed 's/^ *"version": "*\([^"]*\)",/export const version = "\1";/' > $@

# build: ts/version.ts node_modules
#	npx tsc
#.PHONY: build

clean:
	rm -rf dist
.PHONY: clean
