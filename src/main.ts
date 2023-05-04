import { IInputBibliography } from "./bibliography";
import { Style } from "./style";
import { Processor } from "./processor";
//import { Reference } from "./reference";
import { loadJSON, loadYAML } from "./utils";

const biby = loadYAML("examples/bibliography.yaml") as IInputBibliography;

const csly = loadYAML("examples/style.csl.yaml");

const CiteProc = new Processor(csly, biby);
const refs = CiteProc.getProcReferences();

console.log(CiteProc);
console.log(CiteProc.getProcReferences());
console.log(refs[2].formatAuthors());
