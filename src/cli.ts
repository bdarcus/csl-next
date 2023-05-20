import { InputBibliography } from "./bibliography.ts";
import { Processor } from "./processor.ts";
import { loadBibliography, loadStyle } from "./utils.ts";

const biby = loadBibliography(
  "examples/bibliography.yaml",
) as InputBibliography;

const csly = loadStyle("examples/style.csl.yaml");

const CiteProc = new Processor(csly, biby);
const refs = CiteProc.getProcReferences();

console.log(refs);
console.log(CiteProc.renderReferences());
console.log(CiteProc.groupReferences(refs, csly.options.group));
