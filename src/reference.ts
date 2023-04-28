// Typescript model for a CSL Reference
import "reflect-metadata";
import { Type } from "class-transformer";
import { Organization, Person, Agent } from "./contributor";

//export type Contributor = Person | Org;
// Types

/**
 * A CSL date is an EDTF date; if not, it is a literal string.
 */
export type CSLDate = EDTFDATE | string;

/**
 * An EDTF level 0 or 1 date, with optional seasonal range.
 *
 * See https://github.com/retorquere/json-schema-edtf
 *
 * @format edtf/level-1+season-intervals
 */
export type EDTFDATE = string;

export type ID = string; // string needs to be a token

export type ReferenceType = "book" | "article" | "chapter";

export type RoleType = "author" | "editor" | "publisher";

export type Title = TitleStructured | TitleString;

export type TitleString = string; // plain or Djot?

// Interfaces

export interface TitleStructured {
	full?: TitleString;
	main: TitleString;
	sub?: TitleString[];
}

export class Reference {
	id: ID;
	type: ReferenceType;

	@Type(() => Agent, {
    discriminator: {
      property: 'kind',
      subTypes: [
        { value: Organization, name: 'organization' },
        { value: Person, name: 'person' },
      ],
    },
  })
	author: (Organization | Person)[];
	title?: Title;
	issued: string;

	constructor(
		id: ID,
		type: ReferenceType,
		issued: string,
		author: (Organization | Person)[],
		title?: Title,
	) {
		this.id = id;
		this.type = type;
		this.author = author;
		this.title = title;
		this.issued = issued;
	}
}
