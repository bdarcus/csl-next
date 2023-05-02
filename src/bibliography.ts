import { ID, IDReference, Reference } from "./reference";
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
 */
export class Bibliography {
	/**
	 * The references object..
	 *
	 * @items.minimum 1
	 */
	// TODO get this working with class-transformer
	// @Type(() => IDReference) // TODO causes and error
	references: IDReference;
	/**
	 * The title of the bibliography.
	 */
	title?: string;
	/**
	 * The description of the bibliography.
	 */
	description?: string;

	constructor(
		references: Record<string, Reference>,
		title?: string,
		description?: string,
	) {
		this.references = references;
		this.title = title;
		this.description = description;
	}
}
