import { HasFormatting, ReferenceTypes, Style } from "./style.ts";
import { SortConfig } from "./style/options.ts";
import { InlineTemplate, TemplateComponent } from "./style/template.ts";
import { ID, InputReference, Title } from "./reference.ts";
import { InputBibliography } from "./bibliography.ts";
import { Contributor } from "./style/contributor.ts";
import { _reflect } from "../deps.ts";
import { edtf, plainToClass } from "../deps.ts";

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
   * Construct configuration options for Intl.DateTimeFormat.
   * @param format The CSL date format string.
   * @default "year"
   * @returns configuration object for DateTime formatting
   */
  dateFormatConfig(format: string): Intl.DateTimeFormatOptions {
    const monthConfig = this.style.options?.dates?.month || "long";
    const dateFormats = {
      year: { year: "numeric" },
      "year-month": { year: "numeric", month: `${monthConfig}` },
      "month-day": { month: `${monthConfig}`, day: "numeric" },
      full: { month: `${monthConfig}`, day: "numeric" },
    };

    return dateFormats[format];
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
              // TODO times, and missing times?
              const dateStr = reference.formatDate(
                date,
                this.dateFormatConfig([
                  component.format,
                ]) as Intl.DateTimeFormatOptions,
              );
              return {
                ...component,
                procValue: dateStr,
              };
            }
            break;
          }
          case "contributors" in component: {
            const contributors =
              // REVIEW make sure this works for non-author contributors.
              reference[component.contributors as keyof ProcReference];
            if (contributors !== undefined) {
              const resultStr = reference.formatContributors(contributors);
              return {
                ...component,
                procValue: resultStr,
              };
            }
            break;
          }
          case "templates" in component: {
            const result = this.renderReference(reference, component.templates);
            // I don't like having to do all these checks.
            if (result[0] !== undefined) {
              return result;
            }
            break;
          }
          case "templateKey" in component: {
            const result = this.renderReference(
              reference,
              this.getTemplate(component.templateKey),
            );
            if (result[0] !== undefined) {
              return result;
            }
            break;
          }
          default:
            return component;
        }
      });
      if (result !== undefined) {
        return result;
      }
    } catch (e) {
      console.log("error: ", e);
    }
  }

  getProcReferences(): ProcReference[] {
    const citekeys = Object.keys(this.bibliography);
    // first check bib sort config, then fallback to global
    const sortConfig = this.style.bibliography?.options?.sort ||
      this.style.options?.sort || undefined;
    const references = citekeys.map((citekey) => {
      const pref = plainToClass(ProcReference, this.bibliography[citekey]);
      pref.citekey = citekey;
      return pref;
    });
    if (sortConfig !== undefined) {
      return this.sortReferences(sortConfig, references);
    } else {
      return references;
    }
  }

  sortReferences(
    sortConfig: SortConfig[],
    references: ProcReference[],
  ): ProcReference[] {
    // TODO adjust to the move of makeSortKey to ProcReference.
    return references.sort((a, b) => {
      for (const { key, order } of sortConfig) {
        const aValue = a.makeSortKey(key);
        const bValue = b.makeSortKey(key);
        if (aValue === undefined || bValue === undefined) {
          continue;
        }
        const comparison = aValue.localeCompare(bValue);
        if (comparison !== 0) {
          return order === "ascending" ? comparison : -comparison;
        }
      }
      return 0;
    });
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
  // TODO change this to just have a data object?
  type: ReferenceTypes;
  title: Title;
  issued: Date;
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
    issued: Date,
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
    this.issued = issued;
    this.author = author;
    this.editor = editor;
    this.citekey = citekey;
    this.disambCondition = disambCondition;
    this.sortKeys = sortKeys;
    this.disambYearSuffix = disambYearSuffix;
    this.disambEtAlNames = disambEtAlNames;
  }

  formatContributors(contributors: Contributor[]): string | undefined {
    // TODO: substitution, shortening, etc.
    const contribArray = contributors.map((contributor) => contributor.name);
    if (contribArray.length > 1) {
      return contribArray.join(", ");
    } else if (contribArray.length === 1 && contribArray[0] !== undefined) {
      return contribArray[0];
    } else {
      return undefined;
    }
  }

  formatAuthors(): string | undefined {
    return this.formatContributors(this.author);
  }

  formatDate(date: string, options: Intl.DateTimeFormatOptions): string {
    const parsedDate = edtf.default(date);
    const dateString = new Intl.DateTimeFormat("en-US", options).format(
      parsedDate,
    );
    return dateString;
  }

  makeSortKey(key: string): string | undefined {
    switch (key) {
      case "author": {
        const authors = this.author;
        if (authors !== undefined) {
          // TODO author formatting
          const formattedAuthors = this.formatAuthors();
          return formattedAuthors;
        }
        break;
      }
      case "year": {
        const year = this.formatDate(this.issued, { year: "numeric" });
        return year;
      }
      // TODO complete for all key options
      case "title":
        // REVIEW make sure this actually works
        return this.title.toString();
    }
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
