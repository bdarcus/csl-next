import { Style, SortType, GroupSortType } from "./style";
import { Reference, ID } from "./reference";
import { CiteRef } from "./citation";
import { Bibliography } from "./bibliography";

export class Processor {
	style: Style;
	references: Reference[];
	citeRefs: CiteRef[];
	bibliography: Bibliography;

	constructor(style: Style, references: Reference[]) {
		this.style = style;
		this.references = references;
		this.citeRefs = [];
		this.bibliography = new Bibliography();
	}

	addCiteRef(citeRef: CiteRef): void {
		this.citeRefs.push(citeRef);
	}

	processCiteRefs(): void {
		// 1. sort the references
		// 2. add the references to the bibliography
		// 3. add the citeRefs to the bibliography
		// 4. process the bibliography
		// 5. return the bibliography
		// const sortedReferences = sortReferences(
		//  this.style.sort,
		//  this.references
		// );
		// this.bibliography.addReferences(sortedReferences);
		// this.bibliography.addCiteRefs(this.citeRefs);
		//  this.bibliography.process();
	}

	getBibliography(): Bibliography {
		return this.bibliography;
	}
}

const fs = require("fs");

// import test data
// import style from "examples/style.json"
// import bibliography from "examples/bibliography.json"

function loadJSON(path: string): object {
	const rawdata = fs.readFileSync(path);
	return JSON.parse(rawdata);
}

function getReference(id: ID, references: Reference[]): Reference[] {
	// FIX why doesn't this work?
	// return references.find((ref as Reference) => ref.id as ID === id);
	return references;
}

function normalizeString(str: string): string {
	return str.replace(/ /g, "-").replace(/,/g, "").toLowerCase();
}

function sortReferences(
	keys: SortType[],
	references: Reference[],
): Reference[] {
	// sort the references by keys
	//   1. sort by first key
	//   2. sort by second key
	//   3. etc.
	//   4. return the sorted references
	//   5. if no keys, return the references as-is
	if (keys.length === 0) {
		return references;
	} else {
		const key = keys[0];
		const sortedReferences = references.sort((a, b) => {
			const aKey = getSortKey(key, a);
			const bKey = getSortKey(key, b);
			if (aKey < bKey) {
				return -1;
			} else if (aKey > bKey) {
				return 1;
			} else {
				return 0;
			}
		});
		return sortedReferences;
	}
}

// write a function that sorts a Reference object by a single key
//   (use the normalizeString function to normalize strings)
function sortReferencesByKey(
	sorter: SortType,
	references: Reference[],
): Reference[] {
	// sort the references by key
	//   1. sort by key
	//   2. return the sorted references
	//   3. if no key, return the references as-is
	if (sorter.key === undefined) {
		return references;
	} else {
		const sortedReferences = references.sort((a, b) => {
			const aKey = getSortKey(sorter, a);
			const bKey = getSortKey(sorter, b);
			if (aKey < bKey) {
				return -1;
			} else if (aKey > bKey) {
				return 1;
			} else {
				return 0;
			}
		});
		return sortedReferences;
	}
}

// write a function that sortsa list of Reference objects by a single key
//   (use the normalizeString function to normalize strings)

// TODO write a function that groups references by keys
function groupReferences(
	keys: GroupSortType[],
	references: Reference[],
): Reference[] {
	// write the grouping logic by keys
	//   1. group by first key
	//   2. group by second key
	//   3. etc.
	//   4. return the grouped references
	//   5. if no keys, return the references as-is
	if (keys.length === 0) {
		return references;
	} else {
		return references;
	}
}

function getSortKey(sort: SortType, reference: Reference): string {
	switch (sort.key) {
		case "author":
			if (reference.author !== undefined) {
				return reference.author[0].getSortName();
			}
		case "year":
			return reference.issued;
		case "as-cited":
			return reference.id; // FIX
		default:
			return "";
	}
}

// TODO write a function that returns the position of a reference in a list of cited references
function citedReferencePosition(citedRef: CiteRef): number {
	return 1; // placeholder
}

// TODO write a function that takes references and sorts and groups on keys
function sortAndGroup(
	groupBy: GroupSortType[],
	sort: SortType[],
	references: Reference[],
): Reference[] {
	const sortedReferences = sortReferences(sort, references);
	const groupedReferences = groupReferences(groupBy, sortedReferences);
	return groupedReferences;
}

// TODO write a function that takes references and sorts and groups on keys
function sortAndGroupCited(
	groupBy: GroupSortType[],
	sort: SortType[],
	references: Reference[],
	citedRefs: CiteRef[],
): Reference[] {
	const sortedReferences = sortReferences(sort, references);
	const groupedReferences = groupReferences(groupBy, sortedReferences);
	return groupedReferences;
}

export { sortAndGroup, sortAndGroupCited, citedReferencePosition };
function a(a: Reference, b: Reference): number {
	throw new Error("Function not implemented.");
}
