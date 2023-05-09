import { ID } from "./reference.ts";

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
   * The string that follows a list of citation references.
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
   * A string that follows the citation reference.
   *
   * CSL styles recognize "locator" in citation references' suffix. For example, in the citation
   *
   *    [cite:see @Tarski-1965 chapter 1, for an example]
   *
   * "chapter 1" is the locator.  The whole citation is rendered as
   *
   *    (see Tarski 1965, chap. 1 for an example)
   *
   * in the default CSL style.
   *
   * The locator starts with a locator term listed in the LocatorTerms type.
   * The locator term is followed by a space and then the locator value.
   * The locator value is a string of numbers and/or letters.
   * The locator value may be discontinuous, in which case it is separated by commas. For example, "23, 25-36"
   * is a discontinuous locator value.
   *
   * The part of the suffix before the locator is appended to reference's prefix.
   * If no locator term is used, but a number is present, then "page" is assumed.
   *
   * Adapted from org-mode.
   *
   * See also https://pandoc.org/MANUAL.html#extension-citations
   */
  // REVIEW: the above will fail in some cases, with pandoc syntax offering a fail safe of sorts.
  // An alernative, more robust, approach is to use a structured array, as in the v1.1 branch.
  suffix?: string;
};
