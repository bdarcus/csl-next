// Experimental CSL NEXT typescript model

// Doesn't actually do anything ATM, other than generate a JSON Schema.
// I don't ATM understand distinction between `interface` and `type`

interface HasFormatting {
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

type ModeType =
/**
 * @default "default"
 */
  | "default"
  | "narrative"
  ;

type GroupSortType =
  | "cs-author"
  | "cs-year"
  | "cs-author-year"
  ;

type CategoryType =
  | "science"
  | "social science"
  | "biology"
  ;

// extract, so can reuse elsewhere
type RefType =
  | "book"
  | "article"
  | "chapter"
  ;

type ContributorType =
  | "author"
  | "editor"
  | "publisher"
  ;

type DateType =
  | "issued"
  ;

type TitleType =
  | "title"
  | "container-title"
  ;

type LocatorType =
  | "page"
  | "chapter"
  ;

type SimpleType =
  | "volume"
  | "issue"
  | "pages"
  ;

// extract, so can reuse elsewhere
type VariableType = RefType | ContributorType | DateType | TitleType | SimpleType;

type MatchType =
  /**
   * @default "all"
   */
  | "all"
  | "any"
  | "none"
  ;

// this is the structured template model
type TemplateModel = 
  | RefList  
  | RefItemTemplate
  | RefItemSimple 
  | RefItemContributorList
  | RefItemLocatorList
  | RefItemDate
  | RefItemTitle
  | Cond
  ;

// eg liquid or mustache option for dev?
type StringTemplate = string;

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

interface Condition {
  match: MatchType;
  /**
   * A list of reference item types; if one is true, then return true.
   */
  isReftype?: RefType[];
  /**
   * A list of reference item variables; if one is true, then return true.
   */
  hasVariable?: VariableType[];
  /**
   * Is the item variable a number?
   * TODO this doesn't align with the above.
   */
  isNumber?: LocatorType;
  /**
   * Is the item variable a date?
   * TODO again, align.
   */
  isDate?: DateType;
  /**
   * The local citation mode or style.
   */
  mode?: ModeType;
  /**
   * When condition is met, run the template(s).
   * REVIEW not sure about the details here.
   */
  templates: TemplateModel[];
}

interface Style {
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
  /**
   * Template definitions, for use elsewhere in the style.
   */
  templates?: NamedTemplate[];
  /**
   * The bibliography specification.
   */
  bibliography?: RefItemBibliographyList;
  /**
   * The citation specification.
   */
  citation?: RefItemCitationList;
}

interface NamedTemplate {
  /**
   * The name token for the template, for reference from other templates.
   */
  name: string;
  template:
    /**
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
   * How to sort the reference items in citation or bibliography.
   */
  sort?: GroupSortType;
  /**
   * Render the list inlne; otherwise block.
   */
  inline?: boolean;
  delimiter?: string;
  templates: TemplateModel[]; // REVIEW
}

interface RefListBlock extends RefList {
  listStyle: string // TODO
}

// FUNCTIONS
// Not really sure here.

// extract, to be used elsewhere
type RoleType =
  | "author"
  | "editor"
  | "publisher"

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

function formatContributor(contributor: PersonalContributor, role?: string): string {
  return `${contributor.familyName} ${contributor.givenName}`;
}

function formatContributorWithRole(contributor: Contributor, role: string): string {
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

interface RefItemTitle extends HasFormatting {
  variable: TitleType;
  main(title: string): string;
  sub(title: string): string;
}

interface RefItemContributorList extends RefList {
  variable: ContributorType;
}

interface RefItemLocatorList extends RefList {
  variable: LocatorType;
}

interface RefItemCitationList extends RefList {
  /**
   * @default true
   */
  inline?: true; // REVIEW idea is to set this as default, but this only allow one value
}

interface RefItemBibliographyList extends RefListBlock {
  heading: string; // TODO
}
