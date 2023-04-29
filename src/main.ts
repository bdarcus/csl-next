import { Bibliography } from "./bibliography";
import { loadJSON, loadYAML } from "./utils";

const bibj = loadJSON("examples/bibliography.json");
const biby = loadYAML("examples/bibliography.yaml"); // why error?

console.log("The JSON bibliography is:\n", bibj);

console.log("The YAML bibliography converted to JS is:\n", biby);

console.log("The rest is ... TODO!");
