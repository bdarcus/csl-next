import "reflect-metadata";
import { Bibliography } from "./bibliography";
import { Style } from "./style";
import { Processor } from "./processor";
//import { Reference } from "./reference";
import { loadJSON, loadYAML } from "./utils";
import { plainToClass } from "class-transformer";

const bibj = loadJSON("examples/bibliography.json");
const biby = loadYAML("examples/bibliography.yaml");

const csly = loadYAML("examples/style.csl.yaml");

const bibjts = plainToClass(Bibliography, bibj);
const bibyts = plainToClass(Bibliography, biby);

const CiteProc = new Processor(csly, bibyts);

console.log(CiteProc.getReferences());
console.log(CiteProc.getReferences()[4].author);
