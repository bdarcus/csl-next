import { Reference } from "./reference";
import "reflect-metadata";
import { plainToClass } from "class-transformer";

type BibliographyFile = string; // is there a path type I can use?

interface IInputBibliography {
	[key: string]: Reference;
}

export class InputBibliography implements IInputBibliography {
	[key: string]: Reference;
}
