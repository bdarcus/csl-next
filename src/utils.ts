import fs from "fs";
import { parse } from "yaml";

export function loadJSON(path: string): object {
	const rawdata = fs.readFileSync(path);
	return JSON.parse(rawdata);
}

export function loadYAML(path: string): object {
	const rawdata = fs.readFileSync(path);
	return parse(rawdata);
}
