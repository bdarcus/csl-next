VERSION=$(shell grep '\"version\":' package.json | sed -e 's/.*: \"\([^"]*\)".*/\1/')

.PHONY: schemas build watch clean
default: schemas

schemas:
	npx typescript-json-schema --required --noExtraProps src/style.ts Style -o schemas/csl-style-schema.json
	npx typescript-json-schema --required --noExtraProps src/reference.ts Reference -o schemas/csl-reference-schema.json

build:
	npx tsc

watch:
	npx tsc --watch

node_modules:
	npm install

clean:
	rm -rf dist

src/version.ts: package.json
	grep '^ *"version":' $< | \
	  sed 's/^ *"version": "*\([^"]*\)",/export const version = "\1";/' > $@
