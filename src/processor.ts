
import { Style, GroupSortType } from "./style";
import { Reference } from "./reference";
import { CiteRef } from "./citeref";
import { Bibliography } from "./bibliography";

const fs = require('fs');

// import test data
// import style from "examples/style.json"
// import bibliography from "examples/bibliography.json"


function loadJSON(path: string): any {
  let rawdata = fs.readFileSync(path);
  return(JSON.parse(rawdata));
}

// write a function that returns a Reference object
//   for a given ID
//   from a Bibliography object
//   (use the Reference class)
//   (use the Bibliography class)
function getReference(
  id: string, 
  bibliography: Bibliography): 
  Reference {
    // Fix this; unassigned type error
  return bibliography.references.find((ref) => ref.id === id);
}





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

// write a function that sorts a Reference object by a single key
//   (use the normalizeString function to normalize strings)
function sortReferencesByKey(
  sorter: GroupSortType,
  references: Reference[]
): Reference[] {
  // sort the references by key
  //   1. sort by key
  //   2. return the sorted references
  //   3. if no key, return the references as-is
  if (sorter.key === undefined) {
    return references;
  }
  else {
    const sortedReferences = references.sort((a, b) => {
      const aKey = getSortKey(sorter, a);
      const bKey = getSortKey(sorter, b);
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


// write a function that sortsa list of Reference objects by a single key
//   (use the normalizeString function to normalize strings)


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

const referenceb31: Reference = { 
  id: "ref2",
  type: "book",
  author: [
    { "name": "Jane Doe", "role": "author" }
    ],
  title: "The Book of Books",
  issued: "2002"
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

const referenceb4: Reference = {
  id: "ref3",
  type: "book",
  author: [
    { "name": "John Smith", "role": "author" }
    ],
  title: "The Other Book of Books",
  issued: "2021"
}

const rl5 = [referenceb31, referenceb1, referenceb4, referenceb2, referenceb3];

// TODO write a function that groups references by keys
function groupReferences(
  keys: GroupSortType[],
  references: Reference[]
): Reference[] {
  // write the grouping logic by keys
  //   1. group by first key  
  //   2. group by second key
  //   3. etc.
  //   4. return the grouped references
  //   5. if no keys, return the references as-is
  if (keys.length === 0) {
    return references;
  }
}

function getSortKey(sort: GroupSortType, reference: Reference): string {
  switch (sort.key) {
    case "author":
      return reference.author.map(a => a.name).join('-');
    case "issued":
      return reference.issued;
    case "title":
      return reference.title;
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

