// Typescript model for a CSL Reference

import { Contributor } from "./contributor";

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
export type EDTFDATE =
  | string;

export type ID = string; // string needs to be a token

export type ReferenceType =
  | "book"
  | "article"
  | "chapter";

export type RoleType =
  | "author"
  | "editor"
  | "publisher";

export type Title = TitleStructured | TitleString;

export type TitleString = string; // plain or Djot?

// Interfaces

export interface TitleStructured {
  full?: TitleString;
  main: TitleString;
  sub: TitleString[];
}

export interface Reference {
  id: ID;
  type: ReferenceType;
  author?: Contributor[]; // fix
  title?: Title | Title[]; // REVIEW is this too much flexibility?
  issued: CSLDate;
}

