import { Locale } from './locale';
import { ID } from './reference';

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
   * The locator starts with a locator term, among "bk.", "bks.", "book", "chap.",
   * "chaps.", "chapter", "col.", "cols.", "column", "figure", "fig.", "figs.",
   * "folio", "fol.", "fols.", "number", "no.", "nos.", "line", "l.", "ll.",
   * "note", "n.", "nn.", "opus", "op.", "opp.", "page", "p.", "pp.", "paragraph",
   * "para.", "paras.", "¶", "¶¶", "§", "§§", "part", "pt.", "pts.", "section",
   * "sec.", "secs.", "sub verbo", "s.v.", "s.vv.", "verse", "v.", "vv.",
   * "volume", "vol.", and "vols.".  It ends with the last comma or digit in the
   * suffix, whichever comes last, or runs till the end of the suffix.
   * 
   * The part of the suffix before the locator is appended to reference's prefix.
   * If no locator term is used, but a number is present, then "page" is assumed.
   * 
   * Adapted from org-mode.
   * 
   * See also https://pandoc.org/MANUAL.html#extension-citations   
   */
  suffix?: string;
}
