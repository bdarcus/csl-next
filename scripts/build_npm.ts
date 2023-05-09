// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  packageManager: "pnpm",
  typeCheck: false,
  test: false,
  entryPoints: [
    "./src/style.ts",
    "./src/reference.ts",
    "./src/bibliography.ts",
    "./src/citation.ts",
  ],
  outDir: "./npm",
  // ensures that the emitted package is compatible with node v14 later
  compilerOptions: {
    lib: ["es2022.error"], // fix ErrorOptions not exported in ES2020
    target: "ES2020",
  },
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "csl-next",
    version: Deno.args[0],
    description: "A reimagining of CSL.",
    devDependencies: {
      "ts-json-schema-generator": "^1.2.0",
      "typedoc": "^0.24.6",
      "yaml-convert": "^1.0.1"
    },
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/bdarcus/csl-next.js.git",
    },
    bugs: {
      url: "https://github.com/bdarcus/csl-next.js/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
    Deno.copyFileSync("typedoc.json", "npm/typedoc.json");
    Deno.copyFileSync("tsconfig.json", "npm/tsconfig.json");
  },
});
