// Experimental CSL NEXT typescript model

import { CSLDate } from "./date";

// Doesn't actually do anything ATM, other than generate a JSON Schema.
// I don't ATM understand distinction between `interface` and `type`

// JSON.parse(fs.readFileSync("examples/style.csl.json"));
// How to deserialize these into these ts structures?

export interface HasFormatting {
  /**
   * The string to insert before the content.
   */
  prefix?: string;
  /**
   * The string to insert after the content.
   */
  suffix?: string;
  bold?: boolean;
  emph?: boolean;
  quote?: boolean;
}

type GroupSortType = "cs-author" | "cs-year" | "cs-author-year" | "cs-as-cited";

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
type TemplateModel =
  | RefList
  | RefItemTemplate
  | RefItemSimple
  | Contributors
  | Locators
  | RefItemDate
  | Title
  | Cond;

type GroupAffixType = "parentheses" | "brackets";

type GroupAffixLevel = "primary" | "secondary";

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
  else?: TemplateModel[];
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
  format: TemplateModel[];
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
type DataTypeMatch =
  | IsNumber
  | IsEDTFDate
  | IsRefType
  | HasVariable
  | Locale
  ;
  
type Condition = Match & DataTypeMatch;

type Disambiguation = {
  addYearSuffix: boolean;
  addNames?:
    | "all"
    | "all-with-initials"
    | "primary"
    | "primary-with-initials"
    | "by-cite";
};

// Style definition

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
  /**
   * The categories the style belongs to; for purposes of indexing.
   */
  categories?: CategoryType[];
  disambiguation?: Disambiguation;
  /**
   * The scope to use for localized terms.
   *
   * @default global
   */
  localization?: "per-item" | "global";
  /**
   * Template definitions, for use elsewhere in the style.
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

interface NamedTemplate {
  /**
   * The name token for the template, for reference from other templates.
   */
  name: string;
  template: /**
   * The rendering instructions.
   *
   * @items.minimum 1
   */
  TemplateModel[]; // not converted to schema correctly
}

interface RefItemTemplate extends HasFormatting {
  /**
   * The template name to use for partial formatting.
   */
  template: string;
}

interface RefList extends HasFormatting {
  /**
   * How to group the list of reference items in a citation or bibliography.
   */
  groupBy?: GroupSortType;
  /**
   * The affix to use to enclose a group within a list; for example, a citation.
   */
  groupAffix?: GroupAffixType;
  /**
   * The group-level to apply groupAffix to.
   * A standard citation, for example, would be the default "primary", since it applies to the citation as a whole.
   * A narrative citation, by contrast, would be "secondary", because it applies to the "year" group.
   *
   * @default primary
   */
  groupAffixLevel?: GroupAffixLevel;
  /**
   * How to sort the reference items in citation or bibliography.
   */
  sort?: GroupSortType;
  /**
   * Render the list inlne; otherwise block.
   */
  inline?: boolean;
  delimiter?: string;
  /**
   * The integer length of a list that turns on shortening.
   */
  shortenMin?: number; // integer
  /**
   * The integer length of items to take from the list when shortening.
   */
  shortenUse?: number; // integer; TODO this and the above need to be coupled
  /**
   * The string to join the last two items of a list; '&' vs 'and'.
   */
  andAs?: "symbol" | "term";
  format?: TemplateModel[]; // REVIEW
}

interface RefListBlock extends RefList {
  listStyle: string; // TODO
}

// FUNCTIONS
// Not really sure here.

// extract, to be used elsewhere
type RoleType = "author" | "editor" | "publisher";

// contributor modeling needs more thought in general
// really need to be extracted
interface Contributor {
  name: string;
  affiliation?: string;
  location?: string;
  role: RoleType;
}

interface PersonalContributor extends Contributor {
  familyName: string;
  givenName: string;
}

function formatContributor(
  contributor: PersonalContributor,
  role?: string
): string {
  return `${contributor.familyName} ${contributor.givenName}`;
}

function formatContributorWithRole(
  contributor: Contributor,
  role: string
): string {
  return `${contributor.name} ${contributor.role}`;
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
   * Allows overriding citation parameters and formatting instructions.
   */
  contexts?: CitationContext[];
}

type CitationContext = IntegralCitation | NonIntegralCitation;

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
  heading: string; // TODO
}
