import { HasFormatting, ReferenceTypes, Style } from "./style.ts";
import { InlineTemplate, TemplateComponent } from "./style/template.ts";
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
export interface ProcTemplate extends HasFormatting, InlineTemplate {
  /**
   * The value to render.
   *
   * It can either be a plain string, or a string with Djot markup.
   */
  procValue?: string;
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
    const template = this.style!.bibliography!.template;
    const renderedRefs = procRefs.map((procRef) => {
      return this.renderReference(procRef, template);
    });
    return renderedRefs.flat(1);
  }

  /**
   * Render a single intermediate ProcReference object.
   *
   * @param reference The reference to render.
   * @returns A ProcReference, rendered according to the context.
   */
  // TODO: this should probably create rendering for both contexts at once.
  renderReference(
    reference: ProcReference,
    template: TemplateComponent[],
  ): ProcTemplate[] {
    try {
      const result = template.map((component: TemplateComponent) => {
        switch (true) {
          case "title" in component: {
            const title = reference[component.title as keyof ProcReference];
            if (title !== undefined) {
              return {
                ...component,
                procValue: title,
              };
            }
            break;
          }
          case "date" in component: {
            const date = reference[component.date as keyof ProcReference];
            if (date !== undefined) {
              return {
                ...component,
                procValue: date,
              };
            }
            break;
          }
          case "contributors" in component: {
            const contributors =
              reference[component.contributors as keyof ProcReference];
            if (contributors !== undefined) {
              return {
                ...component,
                procValue: contributors,
              };
            }
            break;
          }
          case "templates" in component:
            return this.renderReference(reference, component.templates);
          case "templateKey" in component: {
            return this.renderReference(
              reference,
              this.getTemplate(component.templateKey),
            );
          } //return component.templateKey;
          default:
            return component;
        }
      });
      return result;
    } catch (e) {
      console.log("error: ", e);
    }
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

  getTemplate(templateKey: string): InlineTemplate | undefined {
    try {
      const template = this.style.templates[templateKey];
      return template;
    } catch (e) {
      console.log("error: ", e);
    }
  }

  //getTemplate(templateKey: string): InlineTemplate {}
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
