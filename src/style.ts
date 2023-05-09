/**
 * The CSL NEXT style model.
 */

export interface TemplateFile {
  title?: string;
  description?: string;
  templates: NamedTemplate[];
}

export type WrapPunctuation = "parentheses" | "brackets" | "quotes";
export interface HasFormatting {
  /**
   * The symbol pair to wrap around one or more rendering components.
   * Interaction with surrounding punctuation is localized.
   */
  wrap?: WrapPunctuation;
  bold?: boolean;
  emph?: boolean;
}

export type SortRules = {
  /**
   * The order to sort the list.
   *
   * @default ascending
   */
  order: "ascending" | "descending";
  key: GroupSortKeys;
};

export type GroupSortKeys = "author" | "year" | "title" | "as-cited";

type StyleCategory = "science" | "social science" | "biology";

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

type MatchWhich =
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
  | Cond;

/**
 * The rendering of style templates can be specified by reference to a template name or by inline definition.
 */
export type Template = CalledTemplate | InlineTemplate;

/**
 * A template is called by name.
 */
export type CalledTemplate = string; // REVIEW can we make this more useful?

/**
 * A template that is defined inline.
 */
export type InlineTemplate = TemplateModel[];

// eg liquid or mustache option for dev?
//type StringTemplate = string;

// Conditional definitions

interface Cond {
  /**
   * For the first condition that is non-nil, format the children.
   */
  when?: Condition[];
  /**
   * When all of the when conditions are nil, format the children.
   */
  else?: InlineTemplate; // REVIEW
}

type Match = {
  /**
   * A list of reference item types; if one is true, then return true.
   *
   * @default all
   */
  match?: MatchWhich;
  /**
   * When a match, process these templates.
   */
  format: InlineTemplate; // REVIEW
};

type IsNumber = {
  /**
   * Is the item variable a number?
   */
  isNumber: Locators;
};

type IsEDTFDate = {
  /**
   * Does the date conform to EDTF?
   */
  isEDTFDate: Dates;
};

type IsRefType = {
  /**
   * Is the item reference type among the listed reference types?
   */
  isRefType: ReferenceTypes[];
};

type HasVariable = {
  /**
   * Does the item reference include one of the listed variables?
   */
  hasVariable: Variables[];
};

type Locale = {
  /**
   * The item reference locale; to allow multilingual output.
   */
  locale: string; // REVIEW; best place for this? Define the locale type
};

// REVIEW hould the below be an interface?
type DataMatch = IsNumber | IsEDTFDate | IsRefType | HasVariable | Locale;

type Condition = Match & DataMatch;

type Substitute = "editor" | "translator" | "title";

/**
 * Parameter groups.
 */
export interface OptionGroup {
  /**
   * Sorting configuration.
   */
  sort?: Sort[];
  /**
   * Grouping configuration.
   */
  group?: GroupSortKeys[];
  /**
   * Substitution configuration.
   */
  substitute?: Substitution;
  /**
   * Disambiguation configuration of rendererd group display names.
   */
  disambiguate?: Disambiguation;
  /**
   * Localization configuration.
   */
  localization?: Localization;
  /**
   * Date formatting configuration.
   */
  dates?: DateFormatting;
  /**
   * Contributor list formatting configuration.
   */
  contributors?: ContributorListFormatting;
}

/**
 * Terms and data localization configuration.
 */
export interface Localization {
  /**
   * The scope to use for localization.
   *
   * "per-item" uses the locale of the reference item, and "global" uses the target language across all references.
   *
   * @default global
   */
  scope?: "per-item" | "global";
}

// Grouping and Sorting

export interface SortGroup {
  key: GroupSortKeys;
}

/**
 * Reference sorting configuration.
 */
export interface Sort extends SortGroup {
  order: "ascending" | "descending";
}

/**
 * Reference grouping of configuration.
 */
export interface Group extends SortGroup {
  /**
   * The string with which to join two or more rendering comnponents.
   */
  delimiter?: string;
}

/**
 * Disambiguation of rendered group display name configuration.
 */
export interface Disambiguation {
  addYearSuffix?: boolean;
  addNames?:
    | "all"
    | "all-with-initials"
    | "primary"
    | "primary-with-initials"
    | "by-cite";
}

/**
 * Substitution of variable configuration.
 */
export interface Substitution {
  /**
   * When author is nil, substitute the first non-nil listed variable.
   * Once a substitution is made, the substituted variable shall be set to nil for purposes of later rendering.
   *
   * @default ["editor", "translator", "title"]
   */
  author: Substitute[];
}

/**
 * Date formatting configuration.
 */
export interface DateFormatting {
  // REVIEW not sure on details ATM
  // the model is a subset of JS Intl.DateTimeFormatOptions
  /**
   * @default long
   */
  date?: DateStyle;
  /**
   * @default long
   */
  time?: TimeStyle;
  /**
   * @default numeric
   */
  year?: YearStyle;
  /**
   * @default long
   */
  month?: MonthStyle;
}

type DateStyle =
  | "full" // 'Thursday, April 27, 2023'
  | "long" // 'April 27, 2023'
  | "medium" // 'Apr 27, 2023'
  | "short"; // '4/27/23'

type YearStyle =
  // The representation of the year. Possible values are:
  | "numeric" // (e.g., 2012)
  | "2-digit"; // (e.g., 12)

type TimeStyle =
  | "full" // '8:04:49 AM Eastern Daylight Time'
  | "long" // '8:04:49 AM EDT'
  | "medium" // '8:04:49 AM'
  | "short"; // '8:04 AM'

type MonthStyle =
  // The representation of the month. Possible values are:
  | "numeric" // (e.g., 3)
  | "2-digit" // (e.g., 03)
  | "long" // (e.g., March)
  | "short" // (e.g., Mar)
  | "narrow"; // (e.g., M).

export type AndAsString = "text" | "symbol";

/**
 * Which of the contributor names in a list to apply the transformation.
 */
export type ContributorScope = "first" | "all" | "none";

/**
 * Contributor role configuration.
 */
export interface RoleOption extends HasFormatting {
  /**
   * The display form of the role.
   *
   * ### `long`
   *
   * The full name of the role.
   *
   * > Jane Smith (editor)
   *
   * ### `short`
   *
   * > Jane Smith (ed.)
   *
   * ### `verb`
   *
   * > edited by Jane Smith
   *
   * ### `verb-short`
   *
   * > ed. Jane Smith
   *
   * @default short
   */
  form?: "long" | "short" | "verb" | "verb-short";
  /**
   * Contributor roles for which to omit the role description.
   *
   * The default value is `["author"]`, which omits the role for authors, including for any author substitutions.
   *
   * @default author
   */
  omit?: ContributorRoles[];
}

export interface ContributorListShortening {
  /**
   * The minimum length of the before acitvating shortening
   *
   * @default 3
   */
  min?: number;
  /**
   * When shortening, use the first number of contributors.
   */
  useFirst?: number;
  /**
   * When shortening, replace omitted names with this term form.
   *
   * ### `short`
   *
   * > Doe, Johnson, et al.
   *
   * ### `long`
   *
   * > Doe, Johnson, and others
   */
  atAl?: "short" | "long";
  /**
   * Determines when the delimiter is used to separate the second to last and the last
   * item in contributor lists (if `and` is not set, the name delimiter is always used,
   * regardless of the value of `delimiterPrecedesLast`). Allowed values:
   *
   * ### `contextual`
   *
   * The contributor delimiter is only used for lists of three or more:
   *
   *   - 2 names: “J. Doe and T. Williams”
   *   - 3 names: “J. Doe, S. Smith, and T. Williams”
   *
   * ### `after-inverted-name`
   *
   * Delimiter is only used if the preceding name is inverted as a result of the
   * `asSort` parameter. E.g. with `asSort` set to “first”:
   *
   *   - “Doe, J., and T. Williams”
   *   -  “Doe, J., S. Smith and T. Williams”
   *
   * ### `always`
   *
   * Delimiter is always used:
   *
   *  - 2 names: “J. Doe, and T. Williams”
   *  - 3 names: “J. Doe, S. Smith, and T. Williams”
   *
   * ### `never`
   *
   * Delimiter is never used:
   *
   *   - 2 names: “J. Doe and T. Williams”
   *   - 3 names: “J. Doe, S. Smith and T. Williams”
   *
   * @default contextual
   */
  delimiterPrecedesLast?: "always" | "never" | "contextual";
  /**
	 * Determines when the delimiter or a space is used between a truncated contributor list
	 * and the “et-al” (or “and others”) term in case of et-al abbreviation.
	 *
	 * Allowed values:
	 *
	 * ### `contextual`
	 *
	 * Delimiter is only used for contributor lists truncated to two or more items:

	 *   - 1 name: “J. Doe et al.”
	 *   - 2 names: “J. Doe, S. Smith, et al.”
	 *
	 * ### `after-inverted-name`
	 *
	 * Delimiter is only used if the preceding name is inverted as a result of the `asSort` parameter.
	 * E.g. with `asSort` set to “first”:
	 *
	 *   - “Doe, J., et al.”
	 *   - “Doe, J., S. Smith et al.”
	 *
	 * ### `always`
	 *
	 * Delimiter is always used:
	 *
	 *   - 1 name: “J. Doe, et al.”
	 *   - 2 names: “J. Doe, S. Smith, et al.”
	 *
	 * ### `never`
	 *
	 * Delimiter is never used:
	 *   - 1 name: “J. Doe et al.”
	 *   - 2 names: “J. Doe, S. Smith et al.”
	 *
	 * @default contextual
	 */
  delimiterPrecedesEtAl?: "always" | "never" | "contextual";
}
export interface ContributorListFormatting extends HasFormatting {
  /**
   * Format a contributor name as sorted.
   *
   * @default none
   */
  displayAsSort?: ContributorScope;
  /**
   * The delimiter between last and second-to-last item.
   *
   * The default "text" value produces:
   *
   * >  Doe, Johnson and Smith
   *
   * The "symbol" value produces:
   *
   * >  Doe, Johnson & Smith
   *
   * @default text
   */
  andAs?: AndAsString;
  /**
   * Configuring of the display of contributor rolee annotations.
   *
   * @default short
   */
  role?: RoleOption;
  /**
   * Configuration for contributor list shortening.
   */
  shorten?: ContributorListShortening;
}

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
  templates?: NamedTemplate[];
  /**
   * The bibliography specification.
   */
  bibliography?: BibliographyStyle;
  /**
   * The citation specification.
   */
  citation?: CitationStyle;
}

export interface NamedTemplate {
  /**
   * The name token for the template, for reference from other templates.
   */
  name: string;
  options?: OptionGroup;
  template: /**
     * The rendering instructions.
     *
     * @items.minimum 1
     */
    InlineTemplate; // REVIEW
}

interface RenderItemTemplate extends HasFormatting {
  /**
   * The template name to use for partial formatting.
   */
  template: string;
}

export interface RenderList extends HasFormatting {
  options?: OptionGroup;
  /**
   * The string with which to join two or more rendering comnponents.
   */
  delimiter?: string;
  /**
   * The rendering instructions; either called template name, or inline instructions.
   */
  format?: CalledTemplate | InlineTemplate;
}

interface RenderListBlock extends RenderList {
  listStyle?: string; // TODO
}

interface RenderItemSimple extends HasFormatting {
  variable: SimpleTypes;
}

interface RenderItemDate extends HasFormatting {
  variable: Dates;
  year?(date: string): string; // CSLDate
  month?(date: string): string;
  format?(date: string): string;
}

interface RenderTitle extends HasFormatting {
  variable: Titles; // REVIEW title instead?
  main(title: string): string; // REVIEW
  sub(title: string): string;
}

interface RenderContributors extends RenderList {
  variable: ContributorRoles;
}

interface RenderLocators extends RenderList {
  variable: Locators;
}

interface CitationStyle extends RenderList {
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

interface BibliographyStyle extends RenderListBlock {
  heading?: string; // TODO
}
