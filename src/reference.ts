// Typescript model for a CSL Reference

// Types

import { CSLDate } from "./date";

type ID = string; // needs to be a token

type ReferenceType =
  | "book"
  | "article"
  | "chapter"
  ;

type RoleType =
  | "author"
  | "editor"
  | "publisher"
  ;

type Title = TitleStructured | TitleString

type TitleString = string; // plain or Djot?

// Interfaces

interface TitleStructured {
    full: TitleString;
    main: TitleString;
    sub: TitleString[];
}

interface Reference {
    id: ID;
    type: ReferenceType;
    author?: Contributor[]; // fix
    title?: (Title|Title[]); // REVIEW is this too much flexibility?
    issued: CSLDate; // CSLDate
}

interface Contributor {
  name: string;
  affiliation?: string;
  location?: string;
  role: RoleType;
}

interface PersonalContributor extends Contributor {
  familyName: string;
  givenName: string;
}

