import { Reference, ID } from "./reference";
import { Type, plainToClass } from "class-transformer";
import "reflect-metadata";

/**
 * A bibliography is a collection of references.
 *
 * It is the input of a citation processor.
 *
 * @examples
 * {
 * "title": "My Bibliography",
 * "description": "A collection of references.",
 * "references": [
 *   {
 *     "id": "doe1",
 *     "type": "book",
 *    "title": "The Title",
 *     "author": [
 *       {
 *         "family": "Doe",
 *         "given": "Jane"
 *       }
 *     ],
 *     "issued": "2023"
 *   }
 * ]
 *}
 */
export class Bibliography {
	/**
	 * The title of the bibliography.
	 */
	title?: string;
	/**
	 * The description of the bibliography.
	 */
	description?: string;

	/**
	 * The references array.
	 *
	 * @items.minimum 1
	 */
	// TODO get this working with class-transformer
	//@Type(() => Reference) // FIX getting an error; seems a bug elsewhere
	// https://stackoverflow.com/a/65206867/13860420
	references: Record<string, Reference>;

	constructor(
		references: Record<string, Reference>,
		title?: string,
		description?: string,
	) {
		this.title = title;
		this.description = description;
		this.references = references;
	}

	// addReference(reference: Reference): void {
	// 	this.references.push(reference);
	// }

	getReference(id: ID, references: Reference[]): Reference[] {
		// FIX why doesn't this work?
		// return references.find((ref as Reference) => ref.id as ID === id);
		return references;
	}
}
