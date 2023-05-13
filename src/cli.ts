import { InputBibliography } from "./bibliography.ts";
import { Processor } from "./processor.ts";
import { loadBibliography, loadStyle } from "./utils.ts";

const biby = loadBibliography(
  "examples/bibliography.yaml",
) as InputBibliography;

const csly = loadStyle("examples/style.csl.yaml");

const CiteProc = new Processor(csly, biby);
const refs = CiteProc.getProcReferences();

console.log(CiteProc);
console.log(CiteProc.getProcReferences());
console.log(refs[2].formatAuthors());

console.log("\nBibliography style spec:\n");
console.log(CiteProc.style.bibliography);
