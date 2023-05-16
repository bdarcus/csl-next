//import { createGenerator } from "npm:ts-json-schema-generator";
import { exec } from "https://deno.land/x/exec/mod.ts";

const configs = [
  {
    path: "./npm/src/style.ts",
    type: "Style",
    tsconfig: "tsconfig.json",
  },

  {
    path: "./npm/src/reference.ts",
    type: "InputReference",
    tsconfig: "tsconfig.json",
  },
  {
    path: "./npm/src/bibliography.ts",
    type: "InputBibliography",
    tsconfig: "tsconfig.json",
  },
  {
    path: "./npm/src/citation.ts",
    type: "Citation",
    tsconfig: "tsconfig.json",
  },
];

console.log("");

for (const config of configs) {
  // need to run on npm code, so make sure to run the make_npm.ts script first
  const schemaFileName = `./schemas/csl-${
    config["type"].toLowerCase()
  }-schema.json`;
  const command =
    `typescript-json-schema --no-type-check ${config.path} ${config.type} --out ${schemaFileName}`;

  console.log(`[schemas] Generating ${schemaFileName}...`);
  //  console.log(command);

  exec(command);
}

console.log("[schemas] Complete!");
