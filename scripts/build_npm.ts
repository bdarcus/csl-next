// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./processor.ts", "./parser.ts", "./cli.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "csl-next",
    version: Deno.args[0],
    description: "A reimagining of CSL.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/bdarcus/csln-deno-test.git",
    },
    bugs: {
      url: "https://github.com/bdarcus/csln-deno-test/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
