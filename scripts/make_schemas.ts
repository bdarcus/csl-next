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

for (const config of configs) {
  // need to run on npm code, so make sure to run the make_npm.ts script first
  const schemaFileName = `./schemas/csl-${
    config["type"].toLowerCase()
  }-schema.json`;
  const command =
    `ts-json-schema-generator --no-type-check --path ${config.path} --type ${config.type} --out ${schemaFileName}`;

  console.log(`Generating ${schemaFileName}...`);
  console.log(command);

  exec(command);
}
