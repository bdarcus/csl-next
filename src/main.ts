import "reflect-metadata";
import { Bibliography } from "./bibliography";
//import { Reference } from "./reference";
import { loadJSON, loadYAML } from "./utils";
import { plainToClass } from "class-transformer";

const bibj = loadJSON("examples/bibliography.json");
const biby = loadYAML("examples/bibliography.yaml");

const bibjts = plainToClass(Bibliography, bibj);
const bibyts = plainToClass(Bibliography, biby);

console.log("The JSON bibliography is:\n", bibjts);

console.log("The YAML bibliography converted to JS is:\n", bibyts);
console.log("A nested contributor:\n", bibyts.references[4].author);
console.log("The rest is ... TODO!");
