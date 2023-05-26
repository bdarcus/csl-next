import console from "https://deno.land/std@0.177.0/node/console.ts";
import { exec } from "https://deno.land/x/exec/mod.ts";

function generateSchemas() {
  console.log("");

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
      `typescript-json-schema --no-type-check ${config.path} ${config.type} --out ${schemaFileName}`;

    console.log(`[schemas] Generating ${schemaFileName} ...`);

    exec(command);
  }
}

function fixSchemas() {
  console.log("[schemas] Fixing style schema ...");
  const schemaFileName = `./schemas/csl-style-schema.json`;
  const schema = JSON.parse(Deno.readTextFileSync(schemaFileName));

  // why doesn't this work???
  schema.properties.templates = {
    type: "object",
    patternProperties: {
      "": { type: "#/definitions/InputReference" },
    },
  };

  const schemaString = JSON.stringify(schema, null, 2);
  Deno.writeTextFileSync(schemaFileName, schemaString);
}

generateSchemas();
fixSchemas();

console.log("[schemas] Complete!");
