
import { GroupSortType } from "./style";
import { Reference } from "./reference";
import { CiteRef } from "./citeref";


function normalizeString(str: string): string {
  return str.replace(/ /g, "-").replace(/,/g, "").toLowerCase();
}

function sortReferences(
  keys: GroupSortType[],
  references: Reference[]
): Reference[] {
  // sort the references by keys
  //   1. sort by first key
  //   2. sort by second key
  //   3. etc.
  //   4. return the sorted references
  //   5. if no keys, return the references as-is
  if (keys.length === 0) {
    return references;
  }
  else {
    const key = keys[0];
    const sortedReferences = references.sort((a, b) => {
      const aKey = getSortKey(key, a);
      const bKey = getSortKey(key, b);
      if (aKey < bKey) {
        return -1;
      }
      else if (aKey > bKey) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return sortedReferences;
  }
}

// create some example Reference data
const referenceb1: Reference = { 
  id: "ref1",
  type: "book",
  author: [
    { "name": "John Doe", "role": "author" }
    ],
  title: "The Book of Books",
  issued: "2019"
}

const referenceb2: Reference = { 
  id: "ref2",
  type: "book",
  author: [
    { "name": "Jane Doe", "role": "author" }
    ],
  title: "The Book of Books",
  issued: "2020"
}

const referenceb3: Reference = {
  id: "ref3",
  type: "book",
  author: [
    { "name": "John Smith", "role": "author" }
    ],
  title: "The Book of Books",
  issued: "2021"
}

const rl2 = [referenceb1, referenceb2, referenceb3];

// TODO write a function that groups references by keys
function groupReferences(
  keys: GroupSortType[],
  references: Reference[]
): Reference[] {
  // placeholder; not sure how best to do this
  return references;
}

export function getSortKey(
  key: GroupSortType,
  reference: Reference
): string {
  // placeholder; not sure how best to do this
  let result;
  if (key === "author") {
    result = reference.author; // TODO join multiple authors into one downcased string
  }
  else if (key === "year") {
    result = reference.issued; // TODO need date function to extract year
  }
  else if (key === "as-cited") {
    result = 1; // TODO need function to derive this
  }
  return result;
}

function citedReferencePosition(citedRef: CiteRef): number {
  return 1; // placeholder
}

// TODO write a function that takes references and sorts and groups on keys
function sortAndGroup(
  keys: GroupSortType[],
  references: Reference[]
): Reference[] {
  const sortedReferences = sortReferences(keys, references);
  const groupedReferences = groupReferences(keys, sortedReferences);
  return groupedReferences;
}

// TODO write a function that takes references and sorts and groups on keys
function sortAndGroupCited(
  keys: GroupSortType[],
  references: Reference[],
  citedRefs: CiteRef[]
): Reference[] {
  const sortedReferences = sortReferences(keys, references);
  const groupedReferences = groupReferences(keys, sortedReferences);
  return groupedReferences;
}

export {
  sortAndGroup,
  sortAndGroupCited,
  citedReferencePosition
};
  function a(a: Reference, b: Reference): number {
    throw new Error("Function not implemented.");
  }

