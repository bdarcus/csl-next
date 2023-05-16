import { LocalizationTerms } from "./style/locale.ts";
import {
  RenderList,
  RenderListBlock,
  TemplateFile,
  TopLevelTemplate,
  WrapPunctuation,
} from "./style/template.ts";
import { Options } from "./style/options.ts";
/**
 * The CSL NEXT style model.
 *
 * @summary Modular components can be independently created, maintained and shared, and in turn composed to create a style.
 */

export type CSL = Style | LocalizationTerms | TemplateFile | Options;

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
export interface Style extends Options, StyleMetadata, TopLevelTemplate {
  /**
   * The bibliography specification.
   */
  bibliography?: BibliographyStyle;
  /**
   * The citation specification.
   */
  citation?: CitationStyle;
}

export interface StyleMetadata {
  /** The human-readable name of the style. */
  title?: string;
  /** The machine-readable token that uniquely identifies the style. */
  id?: string;
  /** The description of the style. */
  description?: string;
  /** The categories the style belongs to; for purposes of indexing. */
  categories?: StyleCategory[];
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
