
import { CiteRef } from './citeref';

export type Citation = {
  mode?: "integral" | "nonintegral";
  // richer than CSL 1.0, but matches biblatex/org-cite
  prefix?: string;
  suffix?: string;
  references: CiteRef[];
}
