import { assertStrictEquals } from "https://deno.land/std@0.186.0/testing/asserts.ts";
//import { assert } from "https://deno.land/std@0.186.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.186.0/testing/bdd.ts";
import { loadBibliography, loadStyle } from "../src/utils.ts";
import { Processor } from "../src/processor.ts";

/**
 * Load test data
 */
const style = loadStyle("./examples/style.csl.yaml");
//const templates = loadYAML("./examples/csl-templates.yaml");
const data = loadBibliography("./examples/bibliography.yaml");
const processor = new Processor(style, data);
const procReferences = processor.getProcReferences();

describe("parsing input", () => {
  it("parses style files", () => {
    assertStrictEquals(style.title, "APA");
  });

  it("parses bibliography files", () => {
    assertStrictEquals(data.doe1.title, "The Title");
  });
});

describe("sorting", () => {
  it("makes correct author sort keys", () => {
    // FIX

    const sortKey = procReferences[3].makeKey("author") as string;
    assertStrictEquals(sortKey, "Doe");
  });

  it("sorts references by author", () => {});

  it("sorts references by author, year", () => {});

  it("sorts references as cited", () => {});
});

describe("grouping", () => {
  it("groups references by author", () => {});

  it("groups references by author, year", () => {});

  it("sorts references as cited", () => {});
});

describe("contributor formatting", () => {
  it("formats authors", () => {});
});

describe("dates formatting", () => {
  it("formats issued dates", () => {});
});
