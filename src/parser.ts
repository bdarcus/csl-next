import { Style } from "./lib/style.ts";
import { InputBibliography } from "./lib/bibliography.ts";
import * as fs from "node:fs";
import { parse } from "npm:yaml";

/**
 * Parse a YAML style file.
 *
 * @param parseStyle a file path for a YAML file
 */
export function parseStyle(stylePath: string): Style {
  const style = fs.readFileSync(stylePath, "utf8");
  return parse(style);
}

/**
 * Parse a YAML bibliography.
 *
 * @param bibliographyPath a file path for a YAML file
 */
export function parseBibliography(
  bibliographyPath: string,
): InputBibliography {
  const style = fs.readFileSync(bibliographyPath, "utf8");
  return parse(style);
}
