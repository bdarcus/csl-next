import * as fs from "node:fs";
import { parse } from "npm:yaml";
import { InputBibliography } from "./bibliography.ts";

export function loadJSON(path: string): InputBibliography {
  const jdata = fs.readFileSync(path, "utf8");
  return JSON.parse(jdata);
}

export function loadYAML(path: string): Record<string, unknown> {
  const ydata = fs.readFileSync(path, "utf8");
  return parse(ydata);
}
