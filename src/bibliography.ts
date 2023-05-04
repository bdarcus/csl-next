import { InputReference, ID } from "./reference";
import "reflect-metadata";
import { plainToClass } from "class-transformer";

type BibliographyFile = string; // is there a path type I can use?

export type IInputBibliography = Record<ID, InputReference>;

// export class InputBibliography implements IInputBibliography {
// 	[key: string]: Reference;
// }
