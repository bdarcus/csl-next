// Typescript model for a CSL Reference

// Types

// How to do this, so it translates to the schema correctly?
//   1. define as literal string, OR EDTF date
//   2. for the latter, use https://github.com/retorquere/json-schema-edtf
export type CSLDate = string;

export type ID = string | number; // string needs to be a token

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

export interface Contributor {
  name: string;
  affiliation?: string;
  location?: string;
  role: RoleType;
}

export interface PersonalContributor extends Contributor {
  familyName: string;
  givenName: string;
}
