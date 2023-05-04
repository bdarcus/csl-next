import { InputReference, ID } from "./reference";
import "reflect-metadata";
import { plainToClass } from "class-transformer";

type BibliographyFile = string; // is there a path type I can use?

/**
 * A bibliography is a map of references.
 */
export type InputBibliography = Record<ID, InputReference>;
