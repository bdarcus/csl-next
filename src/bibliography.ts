import { Reference } from "./reference";

export class Bibliography {
	title?: string;
	description?: string;
	references: Reference[];

	constructor(title?: string, description?: string) {
		this.title = title;
		this.description = description;
		this.references = [];
	}

	addReference(reference: Reference): void {
		this.references.push(reference);
	}

	addReferences(references: Reference[]): void {
		this.references = this.references.concat(references);
	}
}
