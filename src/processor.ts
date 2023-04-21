
import { GroupSortType } from "./style";
import { Reference } from "./reference";
import { CiteRef } from "./citeref";

// TODO write a function that sorts references on keys
function sortReferences(
  keys: GroupSortType[],
  references: Reference[]
): Reference[] {
  // return references.sort((a, b)=> (a.author.localeCompare(b.author) || a.issued - b.issued));  
  return references.sort((a, b) => (getSortKey(keys[0], a) > getSortKey(keys[0], b)) ? 1 : -1);
}

// TODO write a function that groups references by keys
function groupReferences(
  keys: GroupSortType[],
  references: Reference[]
): Reference[] {
  // placeholder; not sure how best to do this
  return references;
}

function getSortKey(
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
