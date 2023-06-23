import { HasFormatting } from "../style/mod.ts";
import { ContributorRoles } from "../variables.ts";

/**
 * @description Option model for style configuration.
 */

// Not clear this is needed, but provide as an option to show possibilities.
export type OptionsFile = Record<string, OptionGroup>;

// REVIEW remove?
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
   * Processing configuration.
   */
  processing?: Processing | ProcessingPresets; // allow a string key for this also
  /**
   * Substitution configuration.
   */
  substitute?: Substitution;
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
 * Preconfigured processing options.
 */
export type ProcessingPresets =
  /// For author-date (Doe, 2019) citations; typically in-text, though can also be footnote-based.
  | "author-date"
  /// For numeric (1) citations, where the number is the order of first appearance in the document.
  | "numeric-as-cited"
  /// For numeric (1) citations, where the number based on author-date sorted of the reference list.
  // Review: Is this actually a thing?
  | "numeric-sorted"
  /// TODO
  | "note";

/**
 * Processing configures the often-related sorting, grouping and disambiguation operations.
 */
export interface Processing {
  /**
   * Sorting configuration.
   */
  sort?: SortConfig[];
  /**
   * Grouping configuration.
   */
  group?: GroupSortKeys[];
  /**
   * Disambiguation configuration of rendererd group display names.
   */
  disambiguate?: Disambiguation;
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
export interface SortConfig extends SortGroup {
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

/**
 * Which of the contributor names in a list to apply the transformation.
 */
export type ContributorScope = "first" | "all" | "none";

import { ContributorRoleForms } from "../variables.ts";

/**
 * Contributor role configuration.
 */
export interface RoleOption extends HasFormatting {
  /**
   * @default short
   */
  form?: ContributorRoleForms;
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
  /** When shortening, use the first number of contributors. */
  useFirst?: number;
  /** When shortening, replace omitted names with this term form. */
  atAl?: etALFormOptions;
  /**
   * Determines when the delimiter is used to separate the second to last and the last
   * item in contributor lists (if `and` is not set, the name delimiter is always used,
   * regardless of the value of `delimiterPrecedesLast`).
   *
   * @default contextual
   */
  delimiterPrecedesLast?: delimiterPrecedesLastOptions;
  /**
   * Determines when the delimiter or a space is used between a truncated contributor list
   * and the “et-al” (or “and others”) term in case of et-al abbreviation.
   *
   * @default contextual
   */
  delimiterPrecedesEtAl?: delimiterPrecedesLastOptions;
}

export type etALFormOptions =
  /** Doe, Johnson, et al. */
  | "short"
  /** Doe, Johnson, and others */
  | "long";

/** When to apply the delimiter to the end of a list. */
export type delimiterPrecedesLastOptions =
  /* Delimiter is only used if the preceding name is inverted as a result of the
   * `asSort` parameter. E.g. with `asSort` set to “first”:
   *
   *   - “Doe, J., and T. Williams”
   *   - “Doe, J., S. Smith and T. Williams”
   */
  | "after-inverted-name"
  /* Delimiter is always used:
   *
   *   - 1 name: “J. Doe, et al.”
   *   - 2 names: “J. Doe, S. Smith, et al.”
   */
  | "always"
  /* Delimiter is never used:
   *   - 1 name: “J. Doe et al.”
   *   - 2 names: “J. Doe, S. Smith et al.”
   */
  | "never"
  /* Delimiter is only used for contributor lists truncated to two or more items:
   *   - 1 name: “J. Doe et al.”
   *   - 2 names: “J. Doe, S. Smith, et al.”
   */
  | "contextual";

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

export type AndAsString =
  /** Doe, Johnson and Smith */
  | "text"
  /** Doe, Johnson & Smith  */
  | "symbol";
