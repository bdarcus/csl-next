import * as fs from "node:fs";
import { yaml } from "../deps.ts";
import { InputBibliography } from "./bibliography.ts";

export function loadJSON(path: string): InputBibliography {
  const jdata = fs.readFileSync(path, "utf8");
  return JSON.parse(jdata);
}

export function loadYAML(path: string): Record<string, unknown> {
  const ydata = fs.readFileSync(path, "utf8");
  return yaml.parse(ydata);
}
