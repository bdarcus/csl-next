import { IDReference, Reference } from "./reference";
import { Type, plainToClass } from "class-transformer";
import "reflect-metadata";

type BibliographyFile = string; // is there a path type I can use?

/**
 * A bibliography is a collection of references.
 *
 * It is the input of a citation processor.
 *
 * @examples
 * {
 * "title": "My Bibliography",
 * "description": "A collection of references.",
 */
export class Bibliography {
	/**
	 * The references object..
	 *
	 * @items.minimum 1
	 */
	// TODO get this working with class-transformer
	//@Type(() => IDReference) // TODO this confusing error
	references: IDReference;
	/**
	 * The title of the bibliography.
	 */
	title?: string;
	/**
	 * The description of the bibliography.
	 */
	description?: string;

	constructor(references: IDReference, title?: string, description?: string) {
		this.references = references;
		this.title = title;
		this.description = description;
	}
}
