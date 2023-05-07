VERSION=$(shell grep '\"version\":' package.json | sed -e 's/.*: \"\([^"]*\)".*/\1/')

.PHONY: schemas build watch clean docs json
default: schemas

schemas:
	pnpm ts-json-schema-generator --path 'src/style.ts' --type 'Style' -o schemas/csl-style-schema.json
	pnpm ts-json-schema-generator --path 'src/reference.ts' --type 'InputReference' -o schemas/csl-reference-schema.json
	pnpm ts-json-schema-generator --path 'src/bibliography.ts' --type 'InputBibliography' -o schemas/csl-bibliography-schema.json
	pnpm ts-json-schema-generator --path 'src/citation.ts' --type 'Citation' -o schemas/csl-citation-schema.json

build:
	pnpm tsc

watch:
	pnpm tsc --watch

node_modules:
	pnpm install

clean:
	rm -rf dist docs 
	
docs:
	pnpm typedoc --plugin typedoc-umlclass 

json:
	# should be smarter and more flexible, integrate into package.json
	pnpm yaml-convert --input examples/style.csl.yaml --output examples/style.csl.json
	pnpm yaml-convert --input examples/bibliography.yaml --output examples/bibliography.json

src/version.ts: package.json
	grep '^ *"version":' $< | \
	  sed 's/^ *"version": "*\([^"]*\)",/export const version = "\1";/' > $@
