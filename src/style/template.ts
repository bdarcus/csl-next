/**
 * @description Template model for style configuration.
 */

import { LocalizedTermFormat, LocalizedTermName } from "./locale.ts";
import {
  ContributorRoles,
  Dates,
  HasFormatting,
  Locators,
  ReferenceTypes,
  SimpleTypes,
  Titles,
  Variables,
} from "../style.ts";
import { DateFormat, Options } from "./options.ts";

export type WrapPunctuation = "parentheses" | "brackets" | "quotes";
export type DelimiterPunctuation =
  | "period"
  | "colon"
  | "comma"
  | "semicolon"
  | "space";

export type MatchWhich = {
  /**
   * The conditions that must be true for the templates to render.
   *
   * @default "all"
   */
  match: "all" | "any" | "none";
};

/** A component of a CSL style template. */
export type TemplateComponent =
  | RenderList
  | CalledTemplate
  | RenderSimple
  | RenderContributors
  | RenderLocators
  | RenderDate
  | RenderTitle
  | RenderText
  | RenderTerm
  | Cond;

/** The rendering of style templates can be specified by reference to a template name or by inline definition. */
export type Template = CalledTemplate | InlineTemplate;

export type TemplateKey = string;

/** A global template that can be referenced by unique key. */
export type NamedTemplate = Record<TemplateKey, InlineTemplate>;

/** Template property definition in the Style. */
export interface TopLevelTemplate {
  templates: NamedTemplate;
}

/** A standlone template file. */
export interface TemplateFile extends TopLevelTemplate {
  title?: string;
  description?: string;
}

/** A template is called by name. */
export interface CalledTemplate {
  templateKey: TemplateKey;
}

/** A template defined inline. */
export interface InlineTemplate {
  template: TemplateComponent[];
}

// eg liquid or mustache option for dev?
//type StringTemplate = string;

// Conditional definitions

export interface Cond {
  /** For the first condition that is non-nil, format the children. */
  when?: Condition[];
  /** When all of the when conditions are nil, format the children. */
  else?: Template; // REVIEW
}

export type Match = MatchWhich & Template;

export interface IsNumber {
  /** Is the item variable a number? */
  isNumber: Locators;
}

export interface IsEDTFDate {
  /** Does the date conform to EDTF? */
  isEDTFDate: Dates;
}

export interface IsRefType {
  /** Is the item reference type among the listed reference types? */
  isRefType: ReferenceTypes[];
}

export interface HasVariable {
  /** Does the item reference include one of the listed variables? */
  hasVariable: Variables[];
}

// REVIEW should the below be an interface?
export type DataMatch =
  | IsNumber
  | IsEDTFDate
  | IsRefType
  | HasVariable
  | Locale;

export type Condition = Match & DataMatch;

export interface Locale {
  /** The item reference locale; to allow multilingual output. */
  locale: string; // REVIEW; best place for this? Define the locale type
}

// REVIEW is this needed, and is this right?
export interface RenderList extends Options, InlineTemplate {}

// FIXME
export interface RenderListBlock extends RenderList {
  listStyle?: string; // TODO
}

export interface RenderSimple extends HasFormatting {
  variable: SimpleTypes;
}

/** Non-localized plain text. */
export interface RenderText extends HasFormatting {
  text: string;
}

/** Localized strings. */
export interface RenderTerm extends HasFormatting {
  term: LocalizedTermName;
  format: LocalizedTermFormat;
}

/** A template component for rendering dates. */
export interface RenderDate extends HasFormatting {
  date: Dates;
  // TODO align this with DateOptions
  format: DateFormat;
}

/** A template component for rendering title. */
export interface RenderTitle extends HasFormatting {
  title: Titles;
  format?: "main" | "sub" | "full" | "short";
}

/** A template component for rendering contributors. */
export interface RenderContributors extends RenderList {
  contributor: ContributorRoles;
}

/** A template component for rendering locators. */
export interface RenderLocators extends RenderList {
  locator: Locators;
}
