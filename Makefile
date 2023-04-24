VERSION=$(shell grep '\"version\":' package.json | sed -e 's/.*: \"\([^"]*\)".*/\1/')

.PHONY: schemas build watch clean docs json
default: schemas

schemas:
	npx typescript-json-schema --refs --aliasRefs --required --noExtraProps src/style.ts Style -o schemas/csl-style-schema.json
	npx typescript-json-schema --refs --aliasRefs --required --noExtraProps src/reference.ts Reference -o schemas/csl-reference-schema.json
	npx typescript-json-schema --refs --aliasRefs --required --noExtraProps src/bibliography.ts Bibliography -o schemas/csl-bibliography-schema.json
	npx typescript-json-schema --refs --aliasRefs --required --noExtraProps src/citation.ts Citation -o schemas/csl-citation-schema.json

build:
	npx tsc

watch:
	npx tsc --watch

node_modules:
	npm install

clean:
	rm -rf dist
	
docs:
	npx typedoc src/style.ts src/citation.ts src/bibliography.ts src/reference.ts src/citeref.ts

json:
	yq -P -o json '.' examples/style.csl.yaml > examples/style.csl.json

src/version.ts: package.json
	grep '^ *"version":' $< | \
	  sed 's/^ *"version": "*\([^"]*\)",/export const version = "\1";/' > $@
