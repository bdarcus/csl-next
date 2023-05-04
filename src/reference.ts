// Typescript model for a CSL Reference

import { Contributor } from "./contributor";

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

/**
 * Input reference data.
 */
export interface InputReference {
	type?: ReferenceType;
	title?: Title;
	author?: Contributor[];
	editor?: Contributor[];
	issued?: CSLDate;
	accessed?: CSLDate;
	publisher?: string;
}
