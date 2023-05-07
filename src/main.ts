import { InputBibliography } from "./bibliography.ts";
import { Style } from "./style.ts";
import { Processor } from "./processor.ts";
//import { Reference } from "./reference";
import { loadJSON, loadYAML } from "./utils.ts";

const biby = loadYAML("examples/bibliography.yaml") as InputBibliography;

const csly = loadYAML("examples/style.csl.yaml");

const CiteProc = new Processor(csly, biby);
const refs = CiteProc.getProcReferences();

console.log(CiteProc);
console.log(CiteProc.getProcReferences());
console.log(refs[2].formatAuthors());
