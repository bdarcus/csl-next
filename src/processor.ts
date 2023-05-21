import { HasFormatting, Style } from "./style.ts";
import { SortConfig } from "./style/options.ts";
import { InlineTemplate, TemplateComponent } from "./style/template.ts";
import { InputReference } from "./reference.ts";
import { InputBibliography } from "./bibliography.ts";
import { Contributor } from "./style/contributor.ts";
import { _reflect } from "../deps.ts";
import { edtf } from "../deps.ts";

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
            const title =
              reference.data[component.title as keyof InputReference];
            if (title !== undefined) {
              return {
                ...component,
                procValue: title,
              };
            }
            break;
          }
          case "date" in component: {
            const date = reference.data[component.date as keyof InputReference];
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
              reference.data[component.contributors as keyof InputReference];
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
    const groupConfig = this.style.bibliography?.options?.group ||
      this.style.options?.group || undefined;
    const references = citekeys.map((citekey) => {
      const pref = new ProcReference(this.bibliography[citekey], {});
      pref.data.citekey = citekey;
      return pref;
    });
    if (sortConfig !== undefined) {
      const sorted = this.sortReferences(sortConfig, references);
      return this.groupReferences(groupConfig, sorted);
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
        const aValue = a.makeKey(key);
        const bValue = b.makeKey(key);
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

  groupReferences(
    groupKeys: string[],
    references: ProcReference[],
  ): ProcReference[] {
    const groups: Record<string, ProcReference[]> = {};
    // REVIEW maybe change to map?
    references.forEach((reference) => {
      const groupValues = groupKeys.map((key) => reference.makeKey(key));
      const groupKey = groupValues.join(":");
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      const index = Object.keys(groups[groupKey]).length + 1;
      reference.procHints.groupIndex = index;
      reference.procHints.groupKey = groupKey;
      groups[groupKey].push(reference);
      const groupLength = groups[groupKey].length;
      groups[groupKey].map((ref) => {
        ref.procHints.groupLength = groupLength;
      });
    });
    // Since adding hints based on the grouping, we no longer need the actual groups.
    return Object.values(groups).flat();
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
interface ProcHint {
  procHints: ProcHintOptions;
}

interface ProcHintOptions {
  disambCondition?: boolean;
  groupIndex?: number;
  groupLength?: number;
  groupKey?: string;
}

interface ReferenceData {
  data: InputReference;
}

/**
 * A reference sorted and processed before final rendering, with methods that provide such rendering.
 */
export class ProcReference implements ReferenceData {
  data: InputReference;
  procHints: ProcHintOptions = {};
  constructor(
    data: InputReference,
    procHints: ProcHintOptions,
  ) {
    this.data = data;
    this.procHints = procHints;
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
    return this.formatContributors(this.data.author);
  }

  formatDate(date: string, options: Intl.DateTimeFormatOptions): string {
    const parsedDate = edtf.default(date);
    const dateString = new Intl.DateTimeFormat("en-US", options).format(
      parsedDate,
    );
    return dateString;
  }

  makeKey(key: string): string | undefined {
    switch (key) {
      case "author": {
        const authors = this.data.author;
        if (authors !== undefined) {
          // TODO author formatting
          const formattedAuthors = this.formatAuthors();
          return formattedAuthors;
        }
        break;
      }
      case "year": {
        const year = this.formatDate(this.data.issued, { year: "numeric" });
        return year;
      }
      // TODO complete for all key options
      case "title":
        // REVIEW make sure this actually works
        return this.data.title.toString();
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
