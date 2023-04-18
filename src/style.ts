// Experimental CSL NEXT typescript model

import { CSLDate } from "./date";

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
   * Which of the match conditions must be satisfied for it be true?
   * 
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
}

type IsNumber = { 
  /**
   * Is the item variable a number?   
   */
  isNumber: LocatorType; 
}

type IsEDTFDate = { 
  /**
   * Does the date conform to EDTF?
   */
  isEDTFDate: DateType; 
}

type IsRefType = { 
  /**
   * Is the item reference type among the listed reference types?
   */
  isRefType: RefType[]; 
}

type HasVariable = { 
  /**
   * Does the item reference include one of the listed variables?
   */
  hasVariable: VariableType[]; 
}

type Locale = { 
  /**
   * The item reference locale; to allow multilingual output.
   */
  locale: string; // REVIEW; best place for this? Define the locale type
}

type Mode = { 
  /**
   * The citation mode.
   */
  mode: ModeType; 
}

type MatchTemplates = {
  /**
   * When a match, process these templates.
   */
  templates?: TemplateModel[];
}

// REVIEW hould the below be an interface?
type DataTypeMatch = IsNumber | IsEDTFDate | IsRefType | HasVariable | Locale | Mode;
type Condition = Match & DataTypeMatch;

// Style definition

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
  format: TemplateModel[]; // REVIEW
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
