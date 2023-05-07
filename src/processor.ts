import { Style, ReferenceTypes, SortRules, GroupSortKeys } from "./style";
import { InputReference, Title, ID } from "./reference";
import { CiteRef } from "./citation";
import { InputBibliography } from "./bibliography";
import { Contributor } from "./contributor";
import "reflect-metadata";
import { plainToClass } from "class-transformer";

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

	getProcReferences(): ProcReference[] {
		const citekeys = Object.keys(this.bibliography);
		const refsObjs = citekeys.map((citekey) => {
			const pref = plainToClass(ProcReference, this.bibliography[citekey]);
			pref.citekey = citekey;
			return pref;
		});
		return refsObjs;
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
		const contribArray = contributors.map((contributor) => contributor.name);
		return contribArray.join(", ");
	}

	formatAuthors(): string {
		return this.formatContributors(this.author);
	}
}
