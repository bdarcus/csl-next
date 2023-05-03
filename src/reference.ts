// Typescript model for a CSL Reference

import { Expose, Type } from "class-transformer";
import "reflect-metadata";
import { Contributor, Organization, Person } from "./contributor";

// Types

/**
 * A CSL date is an EDTF date; if not, it is a literal string.
 */
export type CSLDate = EDTFDATE;

/**
 * An EDTF level 0 or 1 date, with optional seasonal range.
 *
 * See https://github.com/retorquere/json-schema-edtf
 *
 * @format edtf/level-1+season-intervals
 */
export type EDTFDATE = string | null | undefined;

export type ID = string; // string needs to be a token

export type IDReference = Record<ID, Reference>;

export type ReferenceType = "book" | "article" | "chapter";

export type RoleType = "author" | "editor" | "publisher";

export type Title = TitleStructured | TitleString;

export type TitleString = string; // plain or Djot?

// Interfaces

export interface TitleStructured {
	full?: TitleString;
	main: TitleString;
	sub: TitleString[];
}

export class Reference {
	id: ID;
	type: ReferenceType;
	title: Title;

	@Type(() => Contributor, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: Person, name: 'person' },
        { value: Organization, name: 'organization' },  ],
    },
  })
	author?: (Person | Organization)[];
	editor?: Contributor[];
	publisher?: Contributor[];
	issued?: CSLDate;
	abstract?: string;
	accessed?: CSLDate;

	constructor(
		id: ID,
		type: ReferenceType,
		title: Title,
		author?: (Person | Organization)[],
		editor?: Contributor[],
		publisher?: Contributor[],
		issued?: CSLDate,
		abstract?: string,
		accessed?: CSLDate,
	) {
		this.id = id;
		this.type = type;
		this.title = title;
		this.author = author;
		this.editor = editor;
		this.publisher = publisher;
		this.issued = issued;
		this.abstract = abstract;
		this.accessed = accessed;
	}
}
