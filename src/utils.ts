import * as fs from "node:fs";
import { parse } from "yaml";

export function loadJSON(path: string): object {
	const jdata = fs.readFileSync(path, "utf8");
	return JSON.parse(jdata);
}

export function loadYAML(path: string): object {
	const ydata = fs.readFileSync(path, "utf8");
	return parse(ydata);
}
