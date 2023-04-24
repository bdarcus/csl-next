
import { CiteRef } from './citeref';

type CitationModeType = "integral" | "nonIntegral";

export type Citation = {
  /**
   * Local citation rendering option; aka command or style.
   * 
   * - `integral` places the author inline in the text; also knows as "narrative" or "in text" citations.
   * - `nonIntegral` places the author in the citation.
   * 
   * Both are more general than author-date styles, and can apply to any citation style.
   * 
   * @default nonIntegral // REVIEW this is current CSL behavior, but should it be? Remove the default altogether?
   * 
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
}
