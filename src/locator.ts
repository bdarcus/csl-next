// CSL locators model
// A locator is a simple key-value object, where the value is some potentially discontinuos list of numbers and/or strings.
// Examples:
//   - page 1
//   - page 23, 25-36
//   - chapter IV

/** A key-value object, or a string. */
export type Locator = Record<LocatorTerms, string> | string;

type LocatorTerms =
  | "book"
  | "chapter"
  | "column"
  | "figure"
  | "folio"
  | "number"
  | "line"
  | "note"
  | "opus"
  | "page"
  | "paragraph"
  | "part"
  | "section"
  | "sub-verbo"
  | "verse"
  | "volume";
