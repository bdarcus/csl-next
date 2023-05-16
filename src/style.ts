import { LocalizationTerms } from "./style/locale.ts";
import {
  NamedTemplate,
  RenderList,
  RenderListBlock,
  TemplateFile,
  WrapPunctuation,
} from "./style/templates.ts";
import { OptionGroup } from "./style/options.ts";
/**
 * The CSL NEXT style model.
 */

export type CSL = Style | LocalizationTerms | TemplateFile;

export type ReferenceTypes = "book" | "article" | "chapter";

export type ContributorRoles = "author" | "editor" | "publisher";

export type Dates = "issued" | "accessed";

export type Titles = "title" | "container-title";

export type Locators = "page" | "chapter";

// REVIEW
export type SimpleTypes = "volume" | "issue" | "pages";

export type Variables =
  | ReferenceTypes
  | ContributorRoles
  | Dates
  | Titles
  | SimpleTypes;

type StyleCategory = "science" | "social science" | "biology";

/**
 * A CSL Style.
 */
export interface Style {
  /**
   * The human-readable name of the style.
   */
  title?: string;
  /**
   * The machine-readable token that uniquely identifies the style.
   */
  id?: string;
  /**
   * The description of the style.
   */
  description?: string;
  /** r
   * The categories the style belongs to; for purposes of indexing.
   */
  categories?: StyleCategory[];
  /**
   * Global parameter options.
   */
  options?: OptionGroup;
  /**
   * The templates for rendering the bibliography and citations.
   */
  templates?: NamedTemplate;
  /**
   * The bibliography specification.
   */
  bibliography?: BibliographyStyle;
  /**
   * The citation specification.
   */
  citation?: CitationStyle;
}

export interface HasFormatting {
  /**
   * The symbol pair to wrap around one or more rendering components.
   * Interaction with surrounding punctuation is localized.
   */
  wrap?: WrapPunctuation;
  bold?: boolean;
  emph?: boolean;
}

export interface CitationStyle extends RenderList {
  /**
   * @default inline
   */
  placement?: "inline" | "note";
  /**
   * Integral citations are those where the author is printed inline in the text; aka "in text" or "narrative" citations.
   */
  integral?: RenderList;
  /**
   * Non-integral citations are those where the author is incorporated in the citation, and not printed inline in the text.
   */
  nonIntegral?: RenderList;
}

export interface BibliographyStyle extends RenderListBlock {
  heading?: string; // TODO
}
