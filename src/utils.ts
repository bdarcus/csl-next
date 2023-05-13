import { yaml } from "../deps.ts";
import { InputBibliography } from "./bibliography.ts";
import { Style } from "./style.ts";

export function loadBibliography(
  // REVIEW these functions should probably be async, but
  // I can't get it working correctly
  path: string,
): InputBibliography {
  const bibliography = yaml.parse(
    Deno.readTextFileSync(path),
  ) as InputBibliography;
  return bibliography;
}

export function loadStyle(
  path: string,
): Style {
  const style = yaml.parse(
    Deno.readTextFileSync(path),
  ) as Style;
  return style;
}
