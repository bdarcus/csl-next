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
import { DateFormat, OptionGroup } from "./options.ts";

export interface TemplateFile {
  title?: string;
  description?: string;
  templates: NamedTemplate;
}

export type WrapPunctuation = "parentheses" | "brackets" | "quotes";
export type DelimiterPunctuation =
  | "period"
  | "colon"
  | "comma"
  | "semicolon"
  | "space";

export type MatchWhich =
  /**
   * The conditions that must be true for the templates to render.
   *
   * @default "all"
   */
  "all" | "any" | "none";

// this is the structured template model
export type TemplateModel =
  | RenderList
  | RenderItemTemplate
  | RenderItemSimple
  | RenderContributors
  | RenderLocators
  | RenderItemDate
  | RenderTitle
  | RenderText
  | RenderTerm
  | Cond;

/**
 * The rendering of style templates can be specified by reference to a template name or by inline definition.
 */
export type RenderingTemplate = CalledTemplate | InlineTemplate;

export type TemplateKey = string;

/**
 * A global template that can be referenced by unique key.
 */
export type NamedTemplate = Record<TemplateKey, InlineTemplate>;

/**
 * A template is called by name.
 */
export type CalledTemplate = {
  templateKey: TemplateKey; // REVIEW can we make this more useful?
};

/**
 * A template that is defined inline.
 */
export type InlineTemplate = {
  templates: TemplateModel[];
};

// eg liquid or mustache option for dev?
//type StringTemplate = string;

// Conditional definitions

export interface Cond {
  /**
   * For the first condition that is non-nil, format the children.
   */
  when?: Condition[];
  /**
   * When all of the when conditions are nil, format the children.
   */
  else?: RenderingTemplate; // REVIEW
}

export type Match = {
  /**
   * A list of reference item types; if one is true, then return true.
   *
   * @default all
   */
  match?: MatchWhich;
  /**
   * When a match, process these templates.
   */
  templates: InlineTemplate; // REVIEW
};

export type IsNumber = {
  /**
   * Is the item variable a number?
   */
  isNumber: Locators;
};

export type IsEDTFDate = {
  /**
   * Does the date conform to EDTF?
   */
  isEDTFDate: Dates;
};

export type IsRefType = {
  /**
   * Is the item reference type among the listed reference types?
   */
  isRefType: ReferenceTypes[];
};

export type HasVariable = {
  /**
   * Does the item reference include one of the listed variables?
   */
  hasVariable: Variables[];
};

// REVIEW should the below be an interface?
export type DataMatch =
  | IsNumber
  | IsEDTFDate
  | IsRefType
  | HasVariable
  | Locale;

export type Condition = Match & DataMatch;

export type Locale = {
  /**
   * The item reference locale; to allow multilingual output.
   */
  locale: string; // REVIEW; best place for this? Define the locale type
};

export interface RenderList extends HasFormatting {
  options?: OptionGroup;
  /**
   * The string with which to join two or more rendering comnponents.
   */
  delimiter?: DelimiterPunctuation;
  /**
   * The rendering instructions; either called template name, or inline instructions.
   */
  templates?: RenderingTemplate[];
}

export interface RenderListBlock extends RenderList {
  listStyle?: string; // TODO
}

export interface RenderItemSimple extends HasFormatting {
  variable: SimpleTypes;
}

/**
 * Non-localized plain text.
 */
export interface RenderText extends HasFormatting {
  text: string;
}

/**
 * Localized strings.
 */
export interface RenderTerm extends HasFormatting {
  term: LocalizedTermName;
  format: LocalizedTermFormat;
}

export interface RenderItemDate extends HasFormatting {
  date: Dates;
  // TODO align this with DateOptions
  format: DateFormat;
}

export interface RenderItemTemplate extends HasFormatting {
  /**
   * The template name to use for partial formatting.
   */
  template: string;
}

export interface RenderTitle extends HasFormatting {
  title: Titles;
  format?: "main" | "sub" | "full" | "short";
}

export interface RenderContributors extends RenderList {
  contributor: ContributorRoles;
  // REVIEW add format?
}

export interface RenderLocators extends RenderList {
  locator: Locators;
}
