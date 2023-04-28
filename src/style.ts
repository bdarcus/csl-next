/**
 * The CSL NEXT style model.
 */

export interface TemplateFile {
	title?: string;
	description?: string;
	templates: NamedTemplate[];
}

export interface HasFormatting {
	/**
	 * The string to insert before the content.
	 */
	prefix?: string;
	/**
	 * The string to insert after the content.
	 */
	suffix?: string;
	/**
	 * What to surround the content with.
	 */
	affixes?: AffixType; // REVIEW
	bold?: boolean;
	emph?: boolean;
}

export type SortType = {
	/**
	 * The order to sort the list.
	 *
	 * @default ascending
	 */
	order: "ascending" | "descending";
	key: GroupSortType;
};

export type GroupSortType = "author" | "year" | "title" | "as-cited";

type CategoryType = "science" | "social science" | "biology";

// extract, so can reuse elsewhere
type RefType = "book" | "article" | "chapter";

type ContributorType = "author" | "editor" | "publisher";

type DateType = "issued";

type TitleType = "title" | "container-title";

type LocatorType = "page" | "chapter";

type SimpleType = "volume" | "issue" | "pages";

// extract, so can reuse elsewhere
type VariableType =
	| RefType
	| ContributorType
	| DateType
	| TitleType
	| SimpleType;

type MatchType =
	/**
	 * Which of the match conditions must be satisfied for it be true?
	 *
	 * @default "all"
	 */
	"all" | "any" | "none";

// this is the structured template model
export type TemplateModel =
	| RefList
	| RefItemTemplate
	| RefItemSimple
	| Contributors
	| Locators
	| RefItemDate
	| Title
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

type AffixType = "parentheses" | "brackets" | "quotes";

// eg liquid or mustache option for dev?
type StringTemplate = string;

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
	match?: "all" | "none" | "any";
	/**
	 * When a match, process these templates.
	 */
	format: InlineTemplate; // REVIEW
};

type IsNumber = {
	/**
	 * Is the item variable a number?
	 */
	isNumber: LocatorType;
};

type IsEDTFDate = {
	/**
	 * Does the date conform to EDTF?
	 */
	isEDTFDate: DateType;
};

type IsRefType = {
	/**
	 * Is the item reference type among the listed reference types?
	 */
	isRefType: RefType[];
};

type HasVariable = {
	/**
	 * Does the item reference include one of the listed variables?
	 */
	hasVariable: VariableType[];
};

type Locale = {
	/**
	 * The item reference locale; to allow multilingual output.
	 */
	locale: string; // REVIEW; best place for this? Define the locale type
};

// REVIEW hould the below be an interface?
type DataTypeMatch = IsNumber | IsEDTFDate | IsRefType | HasVariable | Locale;

type Condition = Match & DataTypeMatch;

type SubstitutionType = "editor" | "translator" | "title";

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
	group?: Group[];
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
	dateFormatting?: DateFormatting;
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
	key: GroupSortType;
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
	affixes?: AffixType;
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
	 *
	 */
	author: SubstitutionType[];
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
	/**r
	 * The categories the style belongs to; for purposes of indexing.
	 */
	categories?: CategoryType[];
	/**
	 * Global parameter options.
	 */
	options?: OptionGroup;
	/**
	 * The templates for rendering the bibliography and citations.
	 *
	 */
	templates?: NamedTemplate[];
	/**
	 * The bibliography specification.
	 */
	bibliography?: Bibliography;
	/**
	 * The citation specification.
	 */
	citation?: Citation;
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

interface RefItemTemplate extends HasFormatting {
	/**
	 * The template name to use for partial formatting.
	 */
	template: string;
}

export interface RefList extends HasFormatting {
	options?: OptionGroup;
	/**
	 * The rendering instructions; either called template name, or inline instructions.
	 */
	format: CalledTemplate | InlineTemplate;
}

interface RefListBlock extends RefList {
	listStyle?: string; // TODO
}

interface RefItemSimple extends HasFormatting {
	variable: SimpleType;
}

interface RefItemDate extends HasFormatting {
	variable: DateType;
	year?(date: string): string; // CSLDate
	month?(date: string): string;
	format?(date: string): string;
}

interface Title extends HasFormatting {
	variable: TitleType;
	main(title: string): string;
	sub(title: string): string;
}

interface Contributors extends RefList {
	variable: ContributorType;
}

interface Locators extends RefList {
	variable: LocatorType;
}

interface Citation extends RefList {
	/**
	 * @default inline
	 */
	placement?: "inline" | "note";
	/**
	 * Integral citations are those where the author is printed inline in the text; aka "in text" or "narrative" citations.
	 */
	integral?: RefList;
	/**
	 * Non-integral citations are those where the author is incorporated in the citation, and not printed inline in the text.
	 */
	nonIntegral?: RefList;
}

type IntegralCitation = {
	/**
	 * Integral citations are those where the author is printed inline in the text; aka "in text" or "narrative" citations.
	 */
	integral: RefList;
};

type NonIntegralCitation = {
	/**
	 * Non-integral citations are those where the author is incorporated in the citation, and not printed inline in the text.
	 */
	nonIntegral: RefList;
};

interface Bibliography extends RefListBlock {
	heading?: string; // TODO
}
