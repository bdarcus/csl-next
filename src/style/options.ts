/**
 * @description Option model for style configuration.
 */

import { ContributorRoles, HasFormatting } from "../style.ts";

export type DateFormat = "year" | "year-month" | "year-month-day" | "month-day";

export interface SortRules {
  /**
   * The order to sort the list.
   *
   * @default ascending
   */
  order: "ascending" | "descending";
  key: GroupSortKeys;
}

export type GroupSortKeys = "author" | "year" | "title" | "as-cited";

export type Substitute = "editor" | "translator" | "title";

export interface Options {
  options?: OptionGroup;
}

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

export type DateStyle =
  | "full" // 'Thursday, April 27, 2023'
  | "long" // 'April 27, 2023'
  | "medium" // 'Apr 27, 2023'
  | "short"; // '4/27/23'

export type YearStyle =
  // The representation of the year. Possible values are:
  | "numeric" // (e.g., 2012)
  | "2-digit"; // (e.g., 12)

export type TimeStyle =
  | "full" // '8:04:49 AM Eastern Daylight Time'
  | "long" // '8:04:49 AM EDT'
  | "medium" // '8:04:49 AM'
  | "short"; // '8:04 AM'

export type MonthStyle =
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
