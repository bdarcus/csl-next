import { Type } from "class-transformer";
import { Reference } from "./reference";

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
	@Type(() => Reference)
	references: Reference[];

	constructor(title?: string, description?: string) {
		this.title = title;
		this.description = description;
		this.references = [];
	}

	addReference(reference: Reference): void {
		this.references.push(reference);
	}
}
