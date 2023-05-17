import { ReferenceTypes, Style } from "./style.ts";
import { HasFormatting, ReferenceTypes, Style } from "./style.ts";
import { InlineTemplate } from "./style/template.ts";
import { ID, InputReference, Title } from "./reference.ts";
import { InputBibliography } from "./bibliography.ts";
import { Contributor } from "./style/contributor.ts";
import { _reflect } from "../deps.ts";
import { plainToClass } from "../deps.ts";

// TODO this isn't right, but I need to separately set pre-rendered values fgor each context.
export interface ProcContext extends HasFormatting {
  renderedCitationReference: ProcTemplate;
  renderedBibliographyReference: ProcTemplate;
}

/**
 * A simplified AST for reference component rendering.
 */
export interface ProcTemplate extends HasFormatting {
  /**
   * The name of the variable or named template to render.
   */
  renderVariable: string;
  /**
   * The value to render.
   *
   * It can either be a plain string, or a string with Djot markup.
   */
  renderValue: string;
}

/**
 * Takes citatons, bibliography, and style, and produces a formatted bibliography.
 */
export class Processor {
  style: Style;
  //citeRefs: CiteRef[];
  bibliography: InputBibliography;

  constructor(style: Style, bibliography: InputBibliography) {
    this.style = style;
    //	this.citeRefs = CiteRef;
    this.bibliography = bibliography;
  }

  /**
   * Render a list of intermediate ProcReference objects.
   */
  renderReferences(): ProcTemplate[] {
    const procRefs = this.getProcReferences();
    const result = procRefs.map((procRef) => {
      this.renderReference(procRef);
    });
    // FIX this type error
    return result;
  }

  /**
   * Render a single intermediate ProcReference object.
   *
   * @param reference The reference to render.
   * @returns A ProcReference, rendered according to the context.
   */
  // TODO: this should probably create rendering for both contexts at once.
  private renderReference(
    reference: ProcReference,
  ): ProcTemplate[] {
    const template = this.style.bibliography!.template as InlineTemplate;
    const result = template.map((component) => {
      const cres = {
        ...component,
        renderedCitation: "TODO",
        renderedBibliography: `${reference.title}-test`,
      };
      return cres;
    });
    return result;
  }

  // write a recursive mapping function to iterate through an InlineTemplate and render it to a ProcTemplate
  private renderTemplate(
    template: InlineTemplate,
    reference: ProcReference,
  ): ProcTemplate[] {
    const result = template.map((component) => {
      const cres = {
        ...component,
        renderCitation: "TODO",
        renderedBibliography: `${reference.title}-test`,
      };
      return cres;
    });
    return result;
  }

  /**
   * Render a bibliography.
   */
  renderBibliography(): ProcTemplate[] {
    if (this.style.bibliography) {
      return this.renderReferences(
        this.style.bibliography!.template as InlineTemplate,
      );
    }
    return [];
  }

  getProcReferences(): ProcReference[] {
    const citekeys = Object.keys(this.bibliography);
    const references = citekeys.map((citekey) => {
      const pref = plainToClass(ProcReference, this.bibliography[citekey]);
      pref.citekey = citekey;
      return pref;
    });
    return references;
  }
}

/**
 * Data provided during processing to facilitate sorting and disambiguation.
 */
interface ProcHints {
  citekey: ID;
  disambCondition?: boolean;
  sortKeys?: string[];
  disambYearSuffix?: number;
  disambEtAlNames?: boolean;
}

/**
 * A reference sorted and processed before final rendering, with methods that provide such rendering.
 */
export class ProcReference implements ProcHints, InputReference {
  type: ReferenceTypes;
  title: Title;
  author: Contributor[];
  editor: Contributor[];
  // REVIEW maybe put the below in a common object instead?
  citekey: ID;
  disambCondition?: boolean;
  sortKeys?: string[];
  disambYearSuffix?: number;
  disambEtAlNames?: boolean;

  constructor(
    type: ReferenceTypes,
    title: Title,
    author: Contributor[],
    editor: Contributor[],
    citekey: ID,
    disambCondition?: boolean,
    sortKeys?: string[],
    disambYearSuffix?: number,
    disambEtAlNames?: boolean,
  ) {
    this.type = type;
    this.title = title;
    this.author = author;
    this.editor = editor;
    this.citekey = citekey;
    this.disambCondition = disambCondition;
    this.sortKeys = sortKeys;
    this.disambYearSuffix = disambYearSuffix;
    this.disambEtAlNames = disambEtAlNames;
  }

  formatContributors(contributors: Contributor[]): string {
    // TODO: substitution, shortening, etc.
    const contribArray = contributors.map((contributor) => contributor.name);
    return contribArray.join(", ");
  }

  formatAuthors(): string {
    return this.formatContributors(this.author);
  }

  // write a method to render to string from the AST

  // toDjotAST(
  //   /**
  //    * Global style options.
  //    */
  //   globalOptions: {},
  //   /**
  //    * The citation or bibliography style object
  //    */
  //   renderSpecs: {}): [] {
  //   // use Array.reduce to build up the AST
  //   return [];  // TODO
  // }
}
