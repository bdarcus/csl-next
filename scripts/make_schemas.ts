import { exec } from "https://deno.land/x/exec/mod.ts";

const files = {
  "./src/style.ts": "Style",
  "./src/reference.ts": "InputReference",
  "./src/bibliography.ts": "InputBibliography",
  "./src/citation.ts": "Citation"
};


Object.keys(files).forEach((key:string)=>{
  console.log(files[key]);
  // use Deno exec to run ts-json-schema-generator on each files key
  const schemaFileName = "csl-${key}-schema.json";
  exec(`ts-json-schema-generator --type ${files[key]} --path "./src/schemas/${key}.json"`);
  
});
