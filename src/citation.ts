import { ID } from "./reference.ts";
import { LocatorTerms } from "./locator.ts";

type CitationModeType = "integral" | "nonIntegral";

export type Citation = {
  /**
   * Local citation rendering option; aka command or style.
   *
   * - `integral` places the author inline in the text; also known as "narrative" or "in text" citations.
   * - `nonIntegral` places the author in the citation.
   *
   * Both are more general than author-date styles, and can apply to any citation style.
   *
   * @default nonIntegral // REVIEW this is current CSL behavior, but should it be? Remove the default altogether?
   */
  mode?: CitationModeType;
  /**
   * The string that prefaces a list of citation references.
   */
  // richer than CSL 1.0, but matches biblatex/org-cite
  prefix?: string;
  /**
   * A string that follows a list of citation references.
   */
  suffix?: string;
  references: CiteRef[];
};

export type CiteRef = {
  /**
   * A string that prefaces the citation reference.
   */
  prefix?: string;
  /**
   * The unique identifier token for the citation reference.
   */
  refID: ID;
  /**
   * An array of locator key-values and/or strings.
   */
  suffix?: Locator[];
};


// CSL locators model
// A locator is a simple key-value object, where the value is some potentially discontinuos list of numbers and/or strings.
// Examples:
//   - page 1
//   - page 23, 25-36
//   - chapter IV

/** A key-value object, or a string. */
export type Locator = Record<LocatorTerms, string>;
