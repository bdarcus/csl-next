export type LocalizationTerms = {
  title?: string;
  description?: string;
  locale: Lang;
  punctuationInQuote?: boolean;
  terms: Record<LocalizedTermName, LocalizedTerm>;
};
// REVIEW replace with https://esm.sh/locale-enum@1.1.1
type Lang =
  | "af-ZA"
  | "ar"
  | "bg-BG"
  | "ca-AD"
  | "cs-CZ"
  | "da-DK"
  | "de-AT"
  | "de-CH"
  | "de-DE"
  | "el-GR"
  | "en-GB"
  | "en-US"
  | "es-ES"
  | "et-EE"
  | "eu"
  | "fa-IR"
  | "fi-FI"
  | "fr-CA"
  | "fr-FR"
  | "he-IL"
  | "hr-HR"
  | "hu-HU"
  | "is-IS"
  | "it-IT"
  | "ja-JP"
  | "km-KH"
  | "ko-KR"
  | "lt-LT"
  | "lv-LV"
  | "mn-MN"
  | "nb-NO"
  | "nl-NL"
  | "pl-PL"
  | "pt-BR"
  | "pt-PT"
  | "ro-RO"
  | "ru-RU"
  | "sk-SK"
  | "sl-SI"
  | "sr-RS"
  | "sv-SE"
  | "th-TH"
  | "tr-TR"
  | "uk-UA"
  | "vi-VN"
  | "zh-CN"
  | "zh-TW";

/**
 * The unique human-readable identifier for a term.
 */
export type LocalizedTermName =
  | LocalizedTermNameLocator
  | LocalizedTermNameLocatorNumber
  | LocalizedTermNameMisc;

export type LocalizedTermNameMisc =
  | "accessed"
  | "ad"
  | "advance-online-publication"
  | "album"
  | "and"
  | "and-others"
  | "anonymous"
  | "at"
  | "audio-recording"
  | "available-at"
  | "bc"
  | "bce"
  | "by"
  | "ce"
  | "circa"
  | "cited"
  | "et-al"
  | "film"
  | "forthcoming"
  | "from"
  | "henceforth"
  | "ibid"
  | "in"
  | "in-press"
  | "internet"
  | "interview"
  | "letter"
  | "loc-cit"
  | "no date"
  | "no-place"
  | "no-publisher"
  | "on"
  | "online"
  | "op-cit"
  | "original-work-published"
  | "personal-communication"
  | "podcast"
  | "podcast-episode"
  | "preprint"
  | "presented-at"
  | "radio-broadcast"
  | "radio-series"
  | "radio-series-episode"
  | "reference"
  | "retrieved"
  | "review-of"
  | "scale"
  | "special-issue"
  | "special-section"
  | "television-broadcast"
  | "television-series"
  | "television-series-episode"
  | "video"
  | "working-paper";

export type LocalizedTermNameLocator =
  | "act"
  | "appendix"
  | "article-locator"
  | "book"
  | "canon"
  | "chapter"
  | "column"
  | "elocation"
  | "equation"
  | "figure"
  | "folio"
  | "line"
  | "note"
  | "opus"
  | "paragraph"
  | "rule"
  | "scene"
  | "sub-verbo"
  | "table"
  | "timestamp"
  | "title-locator"
  | "verse";

export type LocalizedTermNameLocatorNumber =
  | "issue"
  | "page"
  | "part"
  | "section"
  | "supplement"
  | "version"
  | "volume";

export type LocalizedTermFormat = "short" | "symbol";

export interface StandaloneLocalize extends Localization {
  translators?: string[];
  description?: string;
  rights?: string; // use enum here, and in style
}

export interface LocalizedTerm {
  format?: LocalizedTermFormat;
  single?: string;
  multiple?: string; // TODO this and above need to be coupled
}
